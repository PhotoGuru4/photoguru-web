import type { ChatRoomListItem } from '@features/chat/types/chatRoom';
import { formatChatTime } from '@shared/utils/time';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import { Text } from '@shared/components/common/Text';
import { Heading } from '@shared/components/common/Heading';
import { DEFAULT_IMAGES } from '@shared/constants';
import { getSafeImage } from '@shared/utils/safeImage';

interface Props {
  rooms: ChatRoomListItem[];
  activeRoomId?: number;
  onSelectRoom: (id: number) => void;
  isLoading?: boolean;
  currentUserId: number;
}

interface ConversationItemProps {
  room: ChatRoomListItem;
  isActive: boolean;
  onSelectRoom: (id: number) => void;
  hasUnread: boolean;
}

const ConversationItem = ({
  room,
  isActive,
  onSelectRoom,
  hasUnread,
}: ConversationItemProps) => {
  return (
    <div
      onClick={() => onSelectRoom(room.id)}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
        isActive
          ? 'bg-gray-100'
          : hasUnread
            ? 'bg-pink-50'
            : 'hover:bg-gray-50'
      }`}
    >
      <img
        src={getSafeImage(
          room.participant.avatar,
          DEFAULT_IMAGES.DEFAULT_AVATAR,
        )}
        onError={(e) => {
          e.currentTarget.src = DEFAULT_IMAGES.DEFAULT_AVATAR;
        }}
        className="w-10 h-10 rounded-full object-cover"
        alt="avatar"
      />

      <div className="flex-1 min-w-0">
        <Heading level={6} truncate>
          {room.participant.name}
        </Heading>

        <Text
          variant="caption"
          lineClamp={1}
        >
          {room.lastMessage ?? 'Start chatting...'}
        </Text>
      </div>

      <div className="flex items-center gap-2">
        <Text variant="small" color="muted">
          {formatChatTime(
            room.lastMessageTime ?? room.createdAt,
          )}
        </Text>

        {hasUnread && (
          <span className="w-2 h-2 rounded-full bg-pink-400" />
        )}
      </div>
    </div>
  );
};

const ConversationList = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  isLoading,
}: Props) => {
  return (
    <div className="w-[320px] bg-white p-4 border-r border-gray-100 flex flex-col rounded-tl-lg rounded-bl-lg">
      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoading ? (
          <LoadMoreDots />
        ) : rooms.length === 0 ? (
          <Text
            variant="body"
            color="muted"
            align="center"
            className="mt-6"
          >
            No conversations
          </Text>
        ) : (
          rooms.map((room) => {
            const hasUnread = room.unreadCount > 0;

            return (
              <ConversationItem
                key={room.id}
                room={room}
                isActive={room.id === activeRoomId}
                onSelectRoom={onSelectRoom}
                hasUnread={hasUnread}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
