import type { ChatRoomListItem } from '@features/chat/types/chatRoom';
import { formatChatTime } from '@shared/utils/time';
import { LoadMoreDots } from '@shared/components/common/LoadMoreDots';
import { Text } from '@shared/components/common/Text';
import { Heading } from '@shared/components/common/Heading';
import { DEFAULT_IMAGES } from '@shared/constants';

interface Props {
  rooms: ChatRoomListItem[];
  activeRoomId?: number;
  onSelectRoom: (id: number) => void;
  isLoading?: boolean;
}

const ConversationList = ({
  rooms,
  activeRoomId,
  onSelectRoom,
  isLoading,
}: Props) => {
  return (
    <div className="w-[320px] bg-white p-4 border-r border-gray-100 flex flex-col">
      <div className="flex-1 overflow-y-auto space-y-2">
        {isLoading ? (
          <LoadMoreDots />
        ) : rooms.length === 0 ? (
          <Text variant="body" color="muted" align="center" className="mt-6">
            No conversations
          </Text>
        ) : (
          rooms.map((room) => {
            const isActive = room.id === activeRoomId;

            return (
              <div
                key={room.id}
                onClick={() => onSelectRoom(room.id)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition ${
                  isActive ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={room.participant.avatar ? room.participant.avatar : DEFAULT_IMAGES.DEFAULT_AVATAR}
                  className="w-10 h-10 rounded-full object-cover"
                />

                <div className="flex-1 min-w-0">
                  <Heading
                    level={6}
                    truncate
                  >
                    {room.participant.name}
                  </Heading>

                  <Text
                    variant="caption"
                    color="muted"
                    lineClamp={1}
                  >
                    {room.lastMessage ?? 'Start chatting...'}
                  </Text>
                </div>

                <Text
                  variant="small"
                  color="muted"
                >
                  {formatChatTime(
                    room.lastMessageTime ?? room.createdAt,
                  )}
                </Text>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ConversationList;
