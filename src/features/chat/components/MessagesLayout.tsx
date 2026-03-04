import ConversationList from '@features/chat/components/ConversationList';
import ChatHeader from '@features/chat/components/ChatHeader';
import MessageBubble from '@features/chat/components/MessageBubble';
import MessageInput from '@features/chat/components/MessageInput';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';

import { useMessagesLayout } from '@features/chat/hooks/useMessagesLayout';

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
  } = useMessagesLayout();

  if (!currentUser) return null;

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
                conceptMap={conceptMap}
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
