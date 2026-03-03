import { useEffect, useRef, useState } from 'react';

import ConversationList from '@features/chat/components/ConversationList';
import ChatHeader from '@features/chat/components/ChatHeader';
import MessageBubble from '@features/chat/components/MessageBubble';
import MessageInput from '@features/chat/components/MessageInput';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';

import { useChatMessages } from '@features/chat/hooks/useChatMessages';
import { useChatDetail } from '@features/chat/hooks/useChatDetail';
import { useAuthStore } from '@store/authStore';

const MessagesLayout = () => {
  const currentUser = useAuthStore((state) => state.user);

  const [activeRoomId, setActiveRoomId] = useState<number | undefined>(() => {
    const saved = localStorage.getItem('activeRoomId');
    return saved ? Number(saved) : undefined;
  });

  const {
    rooms,
    currentRoom,
    sendTextMessage,
    isLoading: isRoomLoading,
  } = useChatMessages(activeRoomId);

  const {
    messages,
    conceptData,
    loadMore,
    loadingMore,
    hasMore,
  } = useChatDetail(
    activeRoomId && currentRoom ? String(activeRoomId) : '',
  );

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (rooms.length === 0) return;

    setActiveRoomId((prev) => {
      if (prev) return prev;

      return rooms[0].id;
    });
  }, [rooms]);

  useEffect(() => {
    if (activeRoomId) {
      localStorage.setItem('activeRoomId', String(activeRoomId));
    }
  }, [activeRoomId]);

  useEffect(() => {
    if (!messagesEndRef.current) return;
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = async () => {
      if (container.scrollTop < 50 && hasMore && !loadingMore) {
        const previousHeight = container.scrollHeight;

        await loadMore();

        requestAnimationFrame(() => {
          const newHeight = container.scrollHeight;
          container.scrollTop = newHeight - previousHeight;
        });
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [hasMore, loadingMore, loadMore]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    if (
      hasMore &&
      !loadingMore &&
      container.scrollHeight <= container.clientHeight
    ) {
      loadMore();
    }
  }, [messages, hasMore, loadingMore, loadMore]);

  if (!currentUser) return null;

  const renderChatArea = () => {
    if (isRoomLoading) {
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
      <div className="flex flex-col flex-1 bg-white border-l border-gray-100 rounded-tr-lg rounded-br-lg overflow-hidden">
        <ChatHeader
          name={participant.name}
          avatar={participant.avatar}
        />

        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 p-6 space-y-4 overflow-y-auto"
        >
          {loadingMore && <LoadMoreDots />}

          {messages.length === 0 ? (
            <div className="text-center text-gray-400 text-sm">
              No messages yet
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                currentUserId={currentUser.id}
                conceptData={conceptData}
              />
            ))
          )}

          <div ref={messagesEndRef} />
        </div>

        <MessageInput
          onSend={(content) =>
            sendTextMessage(content, currentUser.id)
          }
        />
      </div>
    );
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ConversationList
        rooms={rooms}
        activeRoomId={activeRoomId}
        onSelectRoom={setActiveRoomId}
        isLoading={isRoomLoading}
      />

      <div className="flex flex-1 bg-gray-50 overflow-hidden">
        {renderChatArea()}
      </div>
    </div>
  );
};

export default MessagesLayout;
