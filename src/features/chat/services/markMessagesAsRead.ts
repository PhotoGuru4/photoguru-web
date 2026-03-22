import { writeBatch, doc } from 'firebase/firestore';
import { db } from '@lib/firebase';
import type { Message } from '@features/chat/types/messages';

export const markMessagesAsRead = async (
  roomId: string,
  userId: number,
  msgs: Message[],
) => {
  const unreadMessages = msgs.filter(
    (msg) =>
      msg.senderId !== userId &&
      msg.isRead === false,
  );

  if (!unreadMessages.length) return;

  const batch = writeBatch(db);

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

  await batch.commit();
};
