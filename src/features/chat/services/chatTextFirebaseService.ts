import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@lib/firebase';
import { MESSAGE_TYPES } from '@shared/constants/messageType';

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
      type: MESSAGE_TYPES.TEXT,
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
