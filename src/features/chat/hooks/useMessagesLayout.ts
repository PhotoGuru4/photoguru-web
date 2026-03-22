import { useEffect, useMemo, useRef, useState } from 'react';

import { useChatRoomsQuery } from '@features/chat/hooks/queries/useChatRoomsQuery';
import { useChatRoomByIdQuery } from '@features/chat/hooks/queries/useChatRoomByIdQuery';
import { useChatDetail } from '@features/chat/hooks/useChatDetail';
import { useAuthStore } from '@store/authStore';
import { sendTextMessage } from '@features/chat/services/chatTextFirebaseService';

export const useMessagesLayout = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [activeRoomId, setActiveRoomId] = useState<number | undefined>();

  const { data: rooms = [], isLoading: isRoomsLoading } =
    useChatRoomsQuery();

  const { data: currentRoom, isLoading: isRoomLoading } =
    useChatRoomByIdQuery(activeRoomId);

  const {
    messages,
    conceptMap,
    loadMore,
    loadingMore,
    hasMore,
    messagesRef,
    totalUnread,
  } = useChatDetail(
    activeRoomId && currentRoom ? String(activeRoomId) : '',
    currentUser?.id,
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a, b) => {
      const timeA = a.lastMessageTime ?? a.createdAt;
      const timeB = b.lastMessageTime ?? b.createdAt;

      return (
        new Date(timeB).getTime() -
        new Date(timeA).getTime()
      );
    });
  }, [rooms]);

  useEffect(() => {
    if (!sortedRooms.length) return;

    setActiveRoomId((prev) => {
      if (
        prev &&
        sortedRooms.some((r) => r.id === prev)
      ) {
        return prev;
      }
      return sortedRooms[0].id;
    });
  }, [sortedRooms]);

  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (
      isFirstLoadRef.current &&
      messages.length > 0
    ) {
      messagesEndRef.current?.scrollIntoView();
      isFirstLoadRef.current = false;
    }
  }, [messages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (
        container.scrollTop < 50 &&
        hasMore &&
        !loadingMore
      ) {
        const prevHeight = container.scrollHeight;

        await loadMore();

        requestAnimationFrame(() => {
          const newHeight = container.scrollHeight;
          container.scrollTop =
            newHeight - prevHeight;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () =>
      container.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, loadMore]);

  const handleSendTextMessage = async (
    content: string,
  ) => {
    if (!activeRoomId || !currentUser) return;

    await sendTextMessage(
      String(activeRoomId),
      currentUser.id,
      content,
    );
  };

  const isLoading =
    isRoomsLoading || isRoomLoading;

  return {
    currentUser,
    sortedRooms,
    activeRoomId,
    setActiveRoomId,
    currentRoom,
    messages,
    conceptMap,
    sendTextMessage: handleSendTextMessage,
    messagesEndRef,
    scrollContainerRef,
    loadingMore,
    isRoomsLoading,
    isLoading,
    loadMore,
    hasMore,
    messagesRef,
    totalUnread,
  };
};
