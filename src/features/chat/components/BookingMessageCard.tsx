import {
  Calendar,
  Clock,
  DollarSign,
  User,
  MapPin,
  Check,
  X,
} from 'lucide-react';
import { AxiosError } from 'axios';

import { Text, Button } from '@shared/components/common';
import { useBookingDetailQuery } from '@features/chat/hooks/queries/useBookingDetailQuery';
import { useRespondBookingMutation } from '@features/chat/hooks/mutations/useRespondBookingMutation';

import { formatVND } from '@shared/utils/formatVND';
import { formatTime } from '@shared/utils/formatTime';
import { formatDate } from '@shared/utils/formatDate';
import { getSafeImage } from '@shared/utils/safeImage';

import { DEFAULT_IMAGES } from '@shared/constants';
import { BOOKING_STATUS } from '@shared/constants/booking';

import { useAuthStore } from '@store/authStore';
import { showError, showSuccess } from '@shared/utils/toast';

interface Props {
  bookingId: number;
  initialStatus: string;
  roomId: string;
  messageId: string;
}

interface ApiError {
  message?: string;
}

const BookingMessageCard = ({
  bookingId,
  initialStatus,
  roomId,
  messageId,
}: Props) => {
  const { data: booking } = useBookingDetailQuery(bookingId);
  const { user } = useAuthStore();

  const { mutate: respondBooking, isPending } =
    useRespondBookingMutation();

  const status = booking?.status || initialStatus;

  if (!booking) return null;

  const imageUri = getSafeImage(
    booking.concept?.thumbnailUrl,
    DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
  );

  const formatStatus = (s: string) =>
    s.charAt(0) + s.slice(1).toLowerCase();

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

  const statusStyle = getStatusStyle();

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

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden w-105">

      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <Text className="font-semibold">
          Booking Request
        </Text>

        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle.badge}`}
        >
          {formatStatus(status)}
        </div>
      </div>

      <div className="p-4">

        <div className="flex gap-3 mb-4">
          <img
            src={imageUri}
            className="w-16 h-16 rounded-lg object-cover"
          />

          <div className="flex flex-col justify-center">
            <Text className="font-semibold text-pink-500">
              {booking.concept?.name}
            </Text>

            <Text variant="caption" color="muted">
              {booking.package?.tier
                ? booking.package.tier.charAt(0).toUpperCase() +
                  booking.package.tier.slice(1).toLowerCase() +
                  ' Package'
                : 'Package'}
            </Text>
          </div>
        </div>

        <div className="space-y-3 mb-4">

          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-500" />
            <Text variant="caption">
              <b>Date:</b> {formatDate(booking.bookingDate)}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} className="text-gray-500" />
            <Text variant="caption">
              <b>Time:</b>{' '}
              {formatTime(booking.bookingDate)} -{' '}
              {booking.package?.estimatedDuration
                ? formatTime(
                  new Date(
                    new Date(booking.bookingDate).getTime() +
                        booking.package.estimatedDuration * 60000,
                  ).toISOString(),
                )
                : ''}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign size={16} className="text-gray-500" />
            <Text variant="caption">
              <b>Price:</b>{' '}
              <Text as="span" color="pink" className="font-semibold">
                {formatVND(booking.totalPrice)}
              </Text>
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <Text variant="caption">
              <b>Customer:</b> {booking.client?.fullName}
            </Text>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <Text variant="caption">
              <b>Address:</b> {booking.address}
            </Text>
          </div>

        </div>

        <div className="bg-gray-50 p-4 rounded-xl">

          <Text
            variant="caption"
            className="mb-3 font-medium text-pink-500"
          >
            Package Includes:
          </Text>

          <div className="space-y-2">
            {booking.package?.benefit?.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check size={14} className="text-pink-500" />
                <Text variant="small">{benefit}</Text>
              </div>
            ))}

            {booking.package?.estimatedDuration && (
              <div className="flex items-center gap-2">
                <Check size={14} className="text-pink-500" />
                <Text variant="small">
                  {booking.package.estimatedDuration} minutes photo session
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>

      {status === BOOKING_STATUS.PENDING && (
        <div className="flex gap-3 p-4">

          <Button
            variant="outline"
            className="flex-1"
            icon={<X size={16} />}
            disabled={isPending}
            onClick={() =>
              handleRespond(BOOKING_STATUS.REJECTED)
            }
          >
            Reject
          </Button>

          <Button
            className="flex-1"
            icon={<Check size={16} />}
            disabled={isPending}
            onClick={() =>
              handleRespond(BOOKING_STATUS.CONFIRMED)
            }
          >
            Accept
          </Button>

        </div>
      )}

      {statusStyle.message !== '' && (
        <div
          className={`p-4 border-t text-center font-medium flex items-center justify-center gap-2 ${statusStyle.messageStyle}`}
        >
          {status === BOOKING_STATUS.CONFIRMED && <Check size={16} />}
          {status === BOOKING_STATUS.REJECTED && <X size={16} />}

          {statusStyle.message}
        </div>
      )}

    </div>
  );
};

export default BookingMessageCard;
