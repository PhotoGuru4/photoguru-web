import { useMutation, useQueryClient } from '@tanstack/react-query';
import { respondBooking } from '@features/chat/services/bookingService';
import {
  sendBookingMessage,
  updateBookingMessageStatus,
} from '@features/chat/services/chatBookingFirebaseService';
import { BOOKING_STATUS } from '@shared/constants/booking';

interface Variables {
  bookingId: number;
  status: typeof BOOKING_STATUS.CONFIRMED | typeof BOOKING_STATUS.REJECTED;
  roomId: string;
  messageId: string;
  senderId: number;
}

export const useRespondBookingMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      status,
      roomId,
      messageId,
      senderId,
    }: Variables) => {

      const booking = await respondBooking(bookingId, status);

      await updateBookingMessageStatus(roomId, messageId, status);

      await sendBookingMessage(roomId, senderId, bookingId, status);

      return booking;
    },

    onSuccess: (booking) => {
      queryClient.invalidateQueries({
        queryKey: ['booking', booking.id],
      });

      queryClient.invalidateQueries({
        queryKey: ['dashboardCalendar'],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ['dashboardCalendar'],
      });
    },
  });
};
