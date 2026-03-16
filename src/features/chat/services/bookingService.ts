import { GET, PATCH } from '@shared/services/apiService';
import { API_ENDPOINTS } from '@shared/constants';
import type { Booking } from '@features/chat/types/booking';
import type { BOOKING_STATUS } from '@shared/constants/booking';

export const getBookingDetail = (bookingId: number): Promise<Booking> => {
  return GET<Booking>(API_ENDPOINTS.BOOKINGS.DETAIL(bookingId));
};

export const respondBooking = (
  bookingId: number,
  status: typeof BOOKING_STATUS.CONFIRMED | typeof BOOKING_STATUS.REJECTED,
): Promise<Booking> => {
  return PATCH<Booking>(API_ENDPOINTS.BOOKINGS.RESPOND(bookingId), { status });
};

