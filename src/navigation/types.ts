/**
 * Navigation type definitions
 * Type-safe navigation parameters
 */

import {NavigatorScreenParams} from '@react-navigation/native';
import {Customer, Cameraman} from '@types/user';
import {Booking} from '@types/booking';
import {Payment} from '@types/payment';

export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Customer: NavigatorScreenParams<CustomerTabParamList>;
  Cameraman: NavigatorScreenParams<CameramanTabParamList>;
  Admin: NavigatorScreenParams<AdminStackParamList>;
};

export type AuthStackParamList = {
  PhoneInput: undefined;
  OTPVerification: {phoneNumber: string};
  CustomerOnboarding: {phoneNumber: string};
  CameramanOnboarding: {phoneNumber: string};
};

export type CustomerTabParamList = {
  Home: undefined;
  MyBooking: undefined;
  Message: undefined;
  Profile: undefined;
  MapView: undefined;
  CameramanList: undefined;
  CameramanDetail: {cameramanId: string};
  ServiceSelection: {cameramanId: string};
  BookingDetails: {cameramanId: string; packageId: string};
  PricingSummary: {bookingId: string};
  PaymentMethod: {bookingId: string; amount: number};
  OrangeMoneyPayment: {paymentId: string; amount: number};
  PaymentProcessing: {paymentId: string};
  PaymentSuccess: {paymentId: string; bookingId: string};
  PaymentFailed: {paymentId: string; error?: string};
  BookingConfirmation: {bookingId: string};
  ActiveBooking: {bookingId: string};
  BookingHistory: undefined;
  PaymentHistory: undefined;
  Rating: {bookingId: string};
  ReviewsList: {cameramanId: string};
  Notifications: undefined;
  NotificationSettings: undefined;
  Search: undefined;
};

export type CameramanTabParamList = {
  Dashboard: undefined;
  Bookings: undefined;
  Wallet: undefined;
  Profile: undefined;
  BookingRequest: {bookingId: string};
  ActiveBooking: {bookingId: string};
  BookingHistory: undefined;
  PortfolioManager: undefined;
  EquipmentManager: undefined;
  ServiceCategories: undefined;
  OrangeMoneySetup: undefined;
  Withdrawal: undefined;
  PaymentHistory: undefined;
  Notifications: undefined;
  NotificationSettings: undefined;
};

export type AdminStackParamList = {
  Dashboard: undefined;
  PendingApprovals: undefined;
  BookingMonitor: undefined;
  PayoutManagement: undefined;
  Disputes: undefined;
};
