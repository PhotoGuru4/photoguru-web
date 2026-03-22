import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

import type { Message } from '@features/chat/types/messages';
import { sendTextMessage } from '@features/chat/services/chatTextFirebaseService';

export const useChatMessages = (
  roomId?: number,
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isMessagesLoading, setIsMessagesLoading] =
    useState(true);

  useEffect(() => {
    if (!roomId) return;

    setMessages([]);
    setIsMessagesLoading(true);

    const q = query(
      collection(
        db,
        'chatRooms',
        String(roomId),
        'messages',
      ),
      orderBy('createdAt', 'asc'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs: Message[] = snapshot.docs.map(
        (doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            createdAt:
              data.createdAt instanceof Timestamp
                ? data.createdAt
                : Timestamp.fromMillis(
                  data.createdAt ?? Date.now(),
                ),
          } as Message;
        },
      );

      setMessages(msgs);
      setIsMessagesLoading(false);
    });

    return () => unsubscribe();
  }, [roomId]);

  const handleSendTextMessage = async (
    content: string,
    senderId: number,
  ) => {
    if (!roomId) return;

    await sendTextMessage(
      String(roomId),
      senderId,
      content,
    );
  };

  return {
    messages,
    sendTextMessage: handleSendTextMessage,
    isLoading: isMessagesLoading,
  };
};
