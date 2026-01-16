/**
 * Review and rating type definitions
 */

export interface Review {
  id: string;
  bookingId: string;
  customerId: string;
  customerName: string;
  cameramanId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
  helpful?: number; // Number of users who found this helpful
}
