import type { Message } from '@features/chat/types/messages';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';
import ConceptCardMessage from '@features/chat/components/ConceptCardMessage';
import { MESSAGE_TYPES } from '@shared/constants/messageType';
import { Text } from '@shared/components/common/Text';

interface Props {
  message: Message;
  currentUserId: number;
  conceptMap: Record<number, ConceptChatCard | undefined>;
}

const MessageBubble = ({
  message,
  currentUserId,
  conceptMap,
}: Props) => {
  const isMe = message.senderId === currentUserId;

  const concept =
    message.type === MESSAGE_TYPES.CONCEPT
      ? conceptMap[message.conceptId]
      : undefined;

  return (
    <div
      className={`flex w-full mb-3 ${
        isMe ? 'justify-end' : 'justify-start'
      }`}
    >
      <div className="flex flex-col max-w-[65%]">
        {message.type === MESSAGE_TYPES.TEXT && (
          <div
            className={`px-4 py-2 rounded-2xl break-all whitespace-pre-wrap ${
              isMe
                ? 'bg-pink-500 rounded-br-md'
                : 'bg-gray-200 rounded-bl-md'
            }`}
          >
            <Text
              variant="body"
              color={isMe ? 'white' : 'default'}
            >
              {message.content}
            </Text>
          </div>
        )}

        {message.type === MESSAGE_TYPES.CONCEPT && concept && (
          <ConceptCardMessage concept={concept} />
        )}

        <Text
          variant="small"
          color="muted"
          align={isMe ? 'right' : 'left'}
          className="mt-1"
        >
          {message.createdAt
            .toDate()
            .toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </Text>
      </div>
    </div>
  );
};

export default MessageBubble;
