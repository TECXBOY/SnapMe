/**
 * Payment type definitions
 * Orange Money integration types and payment-related interfaces
 */

export interface OrangeMoneyCredentials {
  apiKey: string;
  secretKey: string;
  merchantId: string;
  baseUrl: string; // Different for sandbox vs production
}

export interface OrangeMoneyPaymentRequest {
  amount: number; // in SLL
  currency: 'SLL';
  customerPhoneNumber: string; // +232XXXXXXXXX
  orderId: string; // Our booking ID
  description: string;
  callbackUrl?: string; // Webhook for payment confirmation
  returnUrl?: string; // Deep link back to app
}

export interface OrangeMoneyPaymentResponse {
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  amount: number;
  currency: 'SLL';
  customerPhoneNumber: string;
  timestamp: Date;
  message?: string;
  paymentUrl?: string; // If user needs to authorize on Orange Money
}

export interface OrangeMoneyRefundRequest {
  transactionId: string;
  amount: number;
  reason: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  customerId: string;
  cameramanId: string;
  amount: number; // Total amount in SLL
  platformFee: number; // Platform commission in SLL
  cameramanAmount: number; // Amount to be paid to cameraman in SLL
  currency: 'SLL';
  method: 'orange_money';
  status: 'initiated' | 'pending' | 'completed' | 'failed' | 'refunded';

  // Orange Money specific fields
  orangeMoneyTransactionId?: string;
  customerPhoneNumber: string;
  cameramanPhoneNumber: string;

  // Timestamps
  createdAt: Date;
  completedAt?: Date;
  refundedAt?: Date;

  // Metadata
  metadata?: {
    customerName: string;
    cameramanName: string;
    bookingDescription: string;
  };
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'booking_payment' | 'commission_deduction' | 'payout' | 'refund' | 'withdrawal';
  amount: number; // in SLL
  status: 'pending' | 'completed' | 'failed';
  paymentId?: string;
  bookingId?: string;
  orangeMoneyTransactionId?: string;
  createdAt: Date;
  completedAt?: Date;
  description: string;
}

export interface CameramanPayout {
  id: string;
  cameramanId: string;
  amount: number; // in SLL
  orangeMoneyNumber: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  requestedAt: Date;
  processedAt?: Date;
  completedAt?: Date;
  orangeMoneyTransactionId?: string;
  failureReason?: string;
}
