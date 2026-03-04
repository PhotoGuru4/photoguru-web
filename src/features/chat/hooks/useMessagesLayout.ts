import { useEffect, useMemo, useRef, useState } from 'react';

import { useChatRoomsQuery } from '@features/chat/hooks/queries/useChatRoomsQuery';
import { useChatRoomByIdQuery } from '@features/chat/hooks/queries/useChatRoomByIdQuery';
import { useChatMessages } from '@features/chat/hooks/useChatMessages';
import { useChatDetail } from '@features/chat/hooks/useChatDetail';
import { useAuthStore } from '@store/authStore';

export const useMessagesLayout = () => {
  const currentUser = useAuthStore((state) => state.user);
  const [activeRoomId, setActiveRoomId] = useState<number | undefined>();

  const { data: rooms = [], isLoading: isRoomsLoading } =
    useChatRoomsQuery();

  const { data: currentRoom, isLoading: isRoomLoading } =
    useChatRoomByIdQuery(activeRoomId);

  const {
    messages,
    sendTextMessage,
  } = useChatMessages(
    activeRoomId,
    currentUser?.id,
  );

  const {
    conceptMap,
    loadMore,
    loadingMore,
    hasMore,
  } = useChatDetail(
    activeRoomId && currentRoom ? String(activeRoomId) : '',
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

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({
      behavior: 'smooth',
    });
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
        const previousHeight =
          container.scrollHeight;

        await loadMore();

        requestAnimationFrame(() => {
          const newHeight =
            container.scrollHeight;
          container.scrollTop =
            newHeight - previousHeight;
        });
      }
    };

    container.addEventListener(
      'scroll',
      handleScroll,
    );
    return () =>
      container.removeEventListener(
        'scroll',
        handleScroll,
      );
  }, [hasMore, loadingMore, loadMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (
      hasMore &&
      !loadingMore &&
      container.scrollHeight <=
        container.clientHeight
    ) {
      loadMore();
    }
  }, [messages, hasMore, loadingMore, loadMore]);

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
    sendTextMessage,
    messagesEndRef,
    scrollContainerRef,
    loadingMore,
    isRoomsLoading,
    isLoading,
  };
};
