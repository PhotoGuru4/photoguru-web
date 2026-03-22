import { useRef, useEffect } from 'react';
import ConversationList from '@features/chat/components/ConversationList';
import ChatHeader from '@features/chat/components/ChatHeader';
import MessageBubble from '@features/chat/components/MessageBubble';
import MessageInput from '@features/chat/components/MessageInput';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import UnreadButton from '@features/chat/components/UnreadButton';

import { useMessagesLayout } from '@features/chat/hooks/useMessagesLayout';
import { markMessagesAsRead } from '@features/chat/services/markMessagesAsRead';

const MessagesLayout = () => {
  const {
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
    loadMore,
    hasMore,
    messagesRef,
    totalUnread,
  } = useMessagesLayout();

  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const hasMoreRef = useRef(hasMore);
  const loadingMoreRef = useRef(loadingMore);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    loadingMoreRef.current = loadingMore;
  }, [loadingMore]);

  useEffect(() => {
    if (!scrollContainerRef.current || !currentUser || !activeRoomId) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleIds: string[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) visibleIds.push(id);
          }
        });

        if (visibleIds.length) {
          const visibleMessages = messagesRef.current.filter(
            (m) =>
              visibleIds.includes(m.id) &&
              m.senderId !== currentUser.id &&
              !m.isRead,
          );

          if (visibleMessages.length > 0) {
            markMessagesAsRead(
              String(activeRoomId),
              currentUser.id,
              visibleMessages,
            );
          }
        }
      },
      {
        root: scrollContainerRef.current,
        threshold: 0.6,
      },
    );

    Object.values(messageRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [messages, currentUser, activeRoomId, messagesRef, scrollContainerRef]);

  if (!currentUser) return null;

  const getFirstUnreadLocal = () => {
    return messagesRef.current.find(
      (m) => m.senderId !== currentUser.id && !m.isRead,
    );
  };

  const waitForMessagesUpdate = () => {
    return new Promise<void>((resolve) => {
      const prevLength = messagesRef.current.length;

      const check = () => {
        if (messagesRef.current.length !== prevLength) {
          resolve();
        } else {
          requestAnimationFrame(check);
        }
      };

      check();
    });
  };

  const scrollToFirstUnread = async () => {
    if (!currentUser || !activeRoomId) return;

    let firstUnread = getFirstUnreadLocal();

    if (firstUnread) {
      messageRefs.current[firstUnread.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });

      await markMessagesAsRead(
        String(activeRoomId),
        currentUser.id,
        [firstUnread],
      );

      return;
    }

    let safety = 0;

    while (!firstUnread && hasMoreRef.current && safety < 50) {
      safety++;

      if (!loadingMoreRef.current) {
        await loadMore();
      }

      await waitForMessagesUpdate();

      firstUnread = getFirstUnreadLocal();
    }

    if (firstUnread) {
      requestAnimationFrame(() => {
        messageRefs.current[firstUnread.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      });
    }
  };

  const unreadCount = totalUnread;

  const renderChatArea = () => {
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <LoadMoreDots />
        </div>
      );
    }

    if (!activeRoomId || !currentRoom) {
      return (
        <div className="flex flex-1 items-center justify-center text-gray-400">
          Select a conversation
        </div>
      );
    }

    const isClient = currentUser.id === currentRoom.clientId;

    const participant = isClient
      ? {
        name: currentRoom.photographer.user.fullName,
        avatar: currentRoom.photographer.user.avatarUrl,
      }
      : {
        name: currentRoom.client.fullName,
        avatar: currentRoom.client.avatarUrl,
      };

    return (
      <div className="flex flex-col flex-1 bg-white border-l border-gray-100 rounded-tr-lg rounded-br-lg overflow-hidden relative">
        <ChatHeader
          name={participant.name}
          avatar={participant.avatar}
        />

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 p-6 space-y-4 overflow-y-auto"
        >
          {loadingMore && <LoadMoreDots />}

          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              ref={(el) => {
                messageRefs.current[msg.id] = el;
              }}
              message={msg}
              currentUserId={currentUser.id}
              conceptMap={conceptMap}
              roomId={String(activeRoomId)}
            />
          ))}

          <div ref={messagesEndRef} />
        </div>

        <UnreadButton
          unreadCount={unreadCount}
          onPress={scrollToFirstUnread}
        />

        <MessageInput onSend={sendTextMessage} />
      </div>
    );
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ConversationList
        rooms={sortedRooms}
        activeRoomId={activeRoomId}
        onSelectRoom={setActiveRoomId}
        isLoading={isRoomsLoading}
        currentUserId={currentUser.id}
      />

      <div className="flex flex-1 bg-gray-50 overflow-hidden">
        {renderChatArea()}
      </div>
    </div>
  );
};

export default MessagesLayout;
