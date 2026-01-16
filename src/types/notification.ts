/**
 * Notification type definitions
 */

export type NotificationType =
  | 'booking_request'
  | 'booking_accepted'
  | 'booking_rejected'
  | 'booking_cancelled'
  | 'job_reminder'
  | 'payment_received'
  | 'payment_confirmed'
  | 'payout_processed'
  | 'withdrawal_completed'
  | 'rating_reminder';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: {
    bookingId?: string;
    paymentId?: string;
    payoutId?: string;
    screen?: string; // Deep link target
  };
  read: boolean;
  createdAt: Date;
}
