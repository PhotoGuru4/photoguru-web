import { GET } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';

import type { ChatRoomDetail, ChatRoomListItem } from '@features/chat/types/chatRoom';
import type { ConceptChatCard } from '@features/chat/types/conceptCard';

export const getChatRooms = (): Promise<ChatRoomListItem[]> => {
  return GET<ChatRoomListItem[]>(
    API_ENDPOINTS.CHATROOM.CHATROOMS,
  );
};

export const getChatRoomById = (
  id: number,
): Promise<ChatRoomDetail> => {
  return GET<ChatRoomDetail>(
    API_ENDPOINTS.CHATROOM.CHATROOMID(id),
  );
};

export const getChatConceptCard = (
  conceptId: number,
): Promise<ConceptChatCard> => {
  return GET<ConceptChatCard>(
    API_ENDPOINTS.CHATROOM.CHATCONCEPTCARD(conceptId),
  );
};
