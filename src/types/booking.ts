/**
 * Booking type definitions
 * Service packages, bookings, and related types
 */

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  duration: number; // in hours
  basePrice: number; // in SLL (Sierra Leonean Leones)
  addOns?: AddOn[];
}

export interface AddOn {
  id: string;
  name: string;
  price: number; // in SLL
  description: string;
}

export interface Booking {
  id: string;
  customerId: string;
  cameramanId: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed' | 'cancelled';
  package: ServicePackage;
  selectedAddOns: AddOn[];
  scheduledDate: Date;
  scheduledTime: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  totalPrice: number; // in SLL
  platformCommission: number; // in SLL (e.g., 15% of total)
  cameramanEarnings: number; // in SLL
  paymentStatus: 'pending' | 'paid' | 'held' | 'released' | 'refunded';
  paymentId?: string; // Orange Money transaction ID
  createdAt: Date;
  acceptedAt?: Date;
  completedAt?: Date;
  cancelledAt?: Date;
  requestExpiresAt: Date; // Time limit for cameraman response (e.g., 15 mins)
}

export interface SearchFilters {
  radius: number; // in kilometers
  sortBy: 'distance' | 'rating';
  serviceCategory?: string;
  minRating?: number;
}

export interface CameramanWithDistance extends Cameraman {
  distance: number; // calculated distance in km
}
