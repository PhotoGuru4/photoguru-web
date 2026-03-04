import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@lib/firebase';

export const sendTextMessage = async (
  roomId: string,
  senderId: number,
  content: string,
) => {
  await addDoc(
    collection(
      db,
      'chatRooms',
      roomId,
      'messages',
    ),
    {
      content,
      senderId,
      createdAt: serverTimestamp(),
      isRead: false,
    },
  );

  await updateDoc(
    doc(db, 'chatRooms', roomId),
    {
      lastMessage: content,
      lastMessageTime: serverTimestamp(),
    },
  );
};
