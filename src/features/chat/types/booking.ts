import type { BookingStatus } from '@shared/constants/booking';

export interface Booking {
  id: number;
  clientId: number;
  photographerId: number;
  conceptId: number;
  packageId: number;
  address: string;
  bookingDate: string;
  status: BookingStatus;
  totalPrice: number;
  note?: string;
  isCompletedByCustomer: boolean;
  concept?: {
    name: string;
    thumbnailUrl: string | null;
  };
  package?: {
    tier: string;
    benefit: string[];
    estimatedDuration: number | null;
  };
  client?: {
    fullName: string;
  };
}
