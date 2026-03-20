export const API_ENDPOINTS = {
  AUTH:{
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  LOCATION: 'https://provinces.open-api.vn/api/v2',
  DASHBOARD: {
    SUMMARY: 'dashboard/photographer/summary',
    CALENDAR: 'dashboard/photographer/schedules',
  },
  CHATROOM: {
    CHATROOMS: '/chat-rooms',
    CHATROOMID: (id: number) => `/chat-rooms/${id}`,
    CHATCONCEPTCARD: (conceptId: number) => `/concepts/${conceptId}/chat-card`,
  },
  CONCEPT: {
    CONCEPTLIST: '/concepts/photographer/me',
    CREATECONCEPT: '/concepts',
    CATEGORIES: '/concepts/categories',
  },
  BOOKINGS: {
    DETAIL: (id: number) => `/bookings/${id}`,
    RESPOND: (id: number) => `/bookings/${id}/respond`,
    COMPLETE: (id: number) => `/bookings/${id}/complete`,
  },
};
