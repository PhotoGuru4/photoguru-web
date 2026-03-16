import { AxiosError } from 'axios';
import { useQueryClient } from '@tanstack/react-query';

import { useBookingDetailQuery } from '@features/chat/hooks/queries/useBookingDetailQuery';
import { useRespondBookingMutation } from '@features/chat/hooks/mutations/useRespondBookingMutation';

import { BOOKING_STATUS } from '@shared/constants/booking';
import { useAuthStore } from '@store/authStore';
import { showError, showSuccess } from '@shared/utils/toast';

interface ApiError {
  message?: string;
}

interface Params {
  bookingId: number;
  initialStatus: string;
  roomId: string;
  messageId: string;
}

export const useBookingMessageCard = ({
  bookingId,
  initialStatus,
  roomId,
  messageId,
}: Params) => {
  const { data: booking } = useBookingDetailQuery(bookingId);

  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const { mutate: respondBooking, isPending } =
    useRespondBookingMutation();

  const status = initialStatus;

  const handleRespond = (
    newStatus:
      | typeof BOOKING_STATUS.CONFIRMED
      | typeof BOOKING_STATUS.REJECTED,
  ) => {
    if (!user) {
      showError('Authentication error');
      return;
    }

    respondBooking(
      {
        bookingId,
        status: newStatus,
        roomId,
        messageId,
        senderId: user.id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['booking', bookingId],
          });

          showSuccess(
            newStatus === BOOKING_STATUS.CONFIRMED
              ? 'Booking accepted'
              : 'Booking rejected',
          );
        },
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiError>;

          const message =
            axiosError.response?.data?.message ||
            axiosError.message ||
            'Something went wrong';

          showError('Booking action failed', message);
        },
      },
    );
  };

  const getStatusStyle = () => {
    switch (status) {
      case BOOKING_STATUS.PENDING:
        return {
          badge: 'bg-amber-100 text-amber-700',
          message: '',
          messageStyle: '',
        };

      case BOOKING_STATUS.CONFIRMED:
        return {
          badge: 'bg-blue-100 text-blue-700',
          message: 'You have confirmed this booking',
          messageStyle: 'bg-blue-50 text-blue-700',
        };

      case BOOKING_STATUS.REJECTED:
        return {
          badge: 'bg-red-100 text-red-700',
          message: 'This booking has been declined',
          messageStyle: 'bg-red-50 text-red-700',
        };

      case BOOKING_STATUS.INPROGRESS:
        return {
          badge: 'bg-pink-100 text-pink-600',
          message: 'This booking is in progress',
          messageStyle: 'bg-pink-50 text-pink-600',
        };

      case BOOKING_STATUS.COMPLETED:
        return {
          badge: 'bg-green-100 text-green-700',
          message: 'This booking has been completed',
          messageStyle: 'bg-green-50 text-green-700',
        };

      default:
        return {
          badge: 'bg-gray-100 text-gray-700',
          message: '',
          messageStyle: '',
        };
    }
  };

  return {
    booking,
    status,
    isPending,
    handleRespond,
    statusStyle: getStatusStyle(),
  };
};
