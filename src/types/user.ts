/**
 * User type definitions
 * Base user interface and role-specific extensions
 */

export interface User {
  id: string;
  phoneNumber: string; // Format: +232XXXXXXXXX
  role: 'customer' | 'cameraman' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer extends User {
  role: 'customer';
  name: string;
  profileImage?: string;
  bookingHistory: string[];
  orangeMoneyNumber?: string; // For refunds
}

export interface Cameraman extends User {
  role: 'cameraman';
  status: 'pending' | 'approved' | 'rejected';
  brandName: string;
  profileImage: string;
  portfolio: string[]; // image URLs
  equipment: string[];
  serviceCategories: string[];
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  availability: 'available' | 'busy';
  rating: number;
  reviewCount: number;
  completedJobs: number;
  pricePerHour?: number;
  orangeMoneyNumber: string; // REQUIRED - For receiving payments
  walletBalance: number; // Pending earnings in SLL
  totalEarnings: number; // Total earnings in SLL
  withdrawalHistory: string[];
}

export interface Admin extends User {
  role: 'admin';
  name: string;
  permissions: string[];
}
