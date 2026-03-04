import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
  writeBatch,
  doc,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

import type { Message } from '@features/chat/types/messages';
import { sendTextMessage } from '@features/chat/services/chatTextFirebaseService';

export const useChatMessages = (
  roomId?: number,
  currentUserId?: number,
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

    const unsubscribe = onSnapshot(q, async (snapshot) => {
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

      if (currentUserId) {
        await markMessagesAsRead(
          String(roomId),
          currentUserId,
          msgs,
        );
      }
    });

    return () => unsubscribe();
  }, [roomId, currentUserId]);

  const markMessagesAsRead = async (
    roomId: string,
    userId: number,
    msgs: Message[],
  ) => {
    const batch = writeBatch(db);

    const unreadMessages = msgs.filter(
      (msg) =>
        msg.senderId !== userId &&
        msg.isRead === false,
    );

    unreadMessages.forEach((msg) => {
      const msgRef = doc(
        db,
        'chatRooms',
        roomId,
        'messages',
        msg.id,
      );

      batch.update(msgRef, { isRead: true });
    });

    if (unreadMessages.length > 0) {
      await batch.commit();
    }
  };

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
