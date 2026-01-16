/**
 * Formatting utility functions
 * Currency, phone numbers, dates, etc.
 */

import {SIERRA_LEONE_COUNTRY_CODE} from './constants';

/**
 * Format phone number to Sierra Leone format
 * @param phoneNumber - Phone number to format
 * @returns Formatted phone number (+232 XX XXX XXXX)
 */
export const formatPhoneNumber = (phoneNumber: string): string => {
  // Remove all non-digit characters
  const digits = phoneNumber.replace(/\D/g, '');

  // If starts with 232, add +
  if (digits.startsWith('232')) {
    const rest = digits.substring(3);
    return `+232 ${rest.substring(0, 2)} ${rest.substring(2, 5)} ${rest.substring(5)}`;
  }

  // If doesn't start with +232, assume it's local format
  if (digits.length === 8) {
    return `${SIERRA_LEONE_COUNTRY_CODE} ${digits.substring(0, 2)} ${digits.substring(2, 5)} ${digits.substring(5)}`;
  }

  return phoneNumber;
};

/**
 * Format currency in Sierra Leonean Leones (SLL)
 * @param amount - Amount in SLL
 * @returns Formatted currency string (e.g., "Le 100,000" or "SLL 100,000")
 */
export const formatCurrency = (amount: number): string => {
  return `Le ${amount.toLocaleString('en-US')}`;
};

/**
 * Format currency with SLL prefix
 * @param amount - Amount in SLL
 * @returns Formatted currency string with SLL prefix
 */
export const formatCurrencySLL = (amount: number): string => {
  return `SLL ${amount.toLocaleString('en-US')}`;
};

/**
 * Format date to readable string
 * @param date - Date to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 * @param date - Date to format
 * @returns Formatted date and time string
 */
export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Calculate distance between two coordinates (Haversine formula)
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Format distance for display
 * @param distanceKm - Distance in kilometers
 * @returns Formatted distance string
 */
export const formatDistance = (distanceKm: number): string => {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)}m`;
  }
  return `${distanceKm.toFixed(1)}km`;
};
