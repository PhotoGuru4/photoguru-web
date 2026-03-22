import { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  onSnapshot,
  Timestamp,
} from 'firebase/firestore';
import type {
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';

import { db } from '@lib/firebase';
import type { Message, ConceptMessage } from '@features/chat/types/messages';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { PAGINATION } from '@shared/constants';
import { useConceptChatCardQueries } from '@features/chat/hooks/queries/useConceptChatCardQuery';

export const useChatDetail = (roomId?: string, currentUserId?: number) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);

  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [totalUnread, setTotalUnread] = useState(0);

  const currentUserIdRef = useRef<number | undefined>(currentUserId);

  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    setMessages([]);
    setLastDoc(null);
    setHasMore(true);
  }, [roomId]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'desc'),
      limit(PAGINATION.CURSOR.PAGE_SIZE),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (snapshot.empty) {
        setMessages([]);
        setLastDoc(null);
        setHasMore(false);
        return;
      }

      const docs = snapshot.docs;

      const newMessages = docs.map((doc) => {
        const raw = doc.data({ serverTimestamps: 'estimate' });

        return {
          id: doc.id,
          ...raw,
          createdAt:
            raw.createdAt instanceof Timestamp
              ? raw.createdAt
              : Timestamp.fromMillis(raw.createdAt ?? Date.now()),
        } as Message;
      });

      setMessages(newMessages.reverse());

      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGINATION.CURSOR.PAGE_SIZE);
    });

    return () => unsubscribe();
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let count = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();

        if (
          data.senderId !== currentUserIdRef.current &&
          data.isRead === false
        ) {
          count++;
        }
      });

      setTotalUnread(count);
    });

    return () => unsubscribe();
  }, [roomId]);

  const loadMore = useCallback(async () => {
    if (!roomId || !hasMore || !lastDoc || loadingMore) return;

    setLoadingMore(true);

    const q = query(
      collection(db, 'chatRooms', roomId, 'messages'),
      orderBy('createdAt', 'desc'),
      startAfter(lastDoc),
      limit(PAGINATION.CURSOR.PAGE_SIZE),
    );

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const docs = snapshot.docs;

      const olderMessages = docs.map((doc) => {
        const raw = doc.data({ serverTimestamps: 'estimate' });

        return {
          id: doc.id,
          ...raw,
          createdAt:
            raw.createdAt instanceof Timestamp
              ? raw.createdAt
              : Timestamp.fromMillis(raw.createdAt ?? Date.now()),
        } as Message;
      });

      setMessages((prev) => [
        ...olderMessages.reverse(),
        ...prev,
      ]);

      setLastDoc(docs[docs.length - 1]);
      setHasMore(docs.length === PAGINATION.CURSOR.PAGE_SIZE);
    } else {
      setHasMore(false);
    }

    setLoadingMore(false);
  }, [roomId, lastDoc, hasMore, loadingMore]);

  const conceptIds = useMemo(() => {
    return Array.from(
      new Set(
        messages
          .filter(
            (m): m is ConceptMessage =>
              m.type === MESSAGE_TYPES.CONCEPT,
          )
          .map((m) => m.conceptId),
      ),
    );
  }, [messages]);

  const conceptQueries = useConceptChatCardQueries(conceptIds);

  const conceptMap = useMemo(() => {
    const map: Record<number, ConceptChatCard | undefined> = {};

    conceptIds.forEach((id, index) => {
      map[id] = conceptQueries[index]?.data;
    });

    return map;
  }, [conceptIds, conceptQueries]);

  return {
    messages,
    conceptMap,
    loadMore,
    loadingMore,
    hasMore,
    messagesRef,
    totalUnread,
  };
};
