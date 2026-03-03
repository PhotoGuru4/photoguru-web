import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

import { useChatRoomsQuery } from '@features/chat/hooks/queries/useChatRoomsQuery';
import { useChatRoomByIdQuery } from '@features/chat/hooks/queries/useChatRoomByIdQuery';

import type { Message } from '@features/chat/types/messages';
import { sendTextMessage } from '@features/chat/services/chatTextFirebaseService';

export const useChatMessages = (roomId?: number) => {
  const {
    data: rooms = [],
    isLoading: isRoomsLoading,
    refetch,
  } = useChatRoomsQuery();

  const {
    data: currentRoom,
    isLoading: isRoomLoading,
  } = useChatRoomByIdQuery(roomId);

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

    refetch();
  };

  return {
    rooms,
    currentRoom,
    messages,
    sendTextMessage: handleSendTextMessage,
    isLoading:
      isRoomsLoading ||
      isRoomLoading ||
      isMessagesLoading,
  };
};
