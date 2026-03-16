import {
  Calendar,
  Clock,
  DollarSign,
  User,
  MapPin,
  Check,
  X,
} from 'lucide-react';

import { Text, Button } from '@shared/components/common';

import { formatVND } from '@shared/utils/formatVND';
import { formatTime } from '@shared/utils/formatTime';
import { formatDate } from '@shared/utils/formatDate';
import { getSafeImage } from '@shared/utils/safeImage';

import { DEFAULT_IMAGES } from '@shared/constants';
import { BOOKING_STATUS } from '@shared/constants/booking';

import { useBookingMessageCard } from '@features/chat/hooks/useBookingMessageCard';

interface Props {
  bookingId: number;
  initialStatus: string;
  roomId: string;
  messageId: string;
}

const BookingMessageCard = ({
  bookingId,
  initialStatus,
  roomId,
  messageId,
}: Props) => {
  const { booking, status, isPending, handleRespond, statusStyle } =
    useBookingMessageCard({
      bookingId,
      initialStatus,
      roomId,
      messageId,
    });

  if (!booking) return null;

  const imageUri = getSafeImage(
    booking.concept?.thumbnailUrl,
    DEFAULT_IMAGES.DEFAULT_SLIDER_IMAGE,
  );

  const formatStatus = (s: string) =>
    s.charAt(0) + s.slice(1).toLowerCase();

  return (
    <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden w-105">
      <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
        <Text className="font-semibold">Booking Request</Text>

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
            <Text lineClamp={1} color="pink" className="font-semibold">
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
            <Text variant="caption" className="font-semibold">
              Price:
            </Text>
            <Text
              variant="caption"
              color="pink"
              className="font-semibold"
            >
              {formatVND(booking.totalPrice)}
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
            <Text lineClamp={1} variant="caption">
              <b>Address:</b> {booking.address}
            </Text>
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
          {status === BOOKING_STATUS.INPROGRESS && <Clock size={16} />}

          {statusStyle.message}
        </div>
      )}
    </div>
  );
};

export default BookingMessageCard;
