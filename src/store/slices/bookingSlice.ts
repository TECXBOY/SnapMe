/**
 * Booking state slice
 * Manages booking-related state
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Booking, SearchFilters} from '@types/booking';

interface BookingState {
  currentBooking: Booking | null;
  bookings: Booking[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  currentBooking: null,
  bookings: [],
  filters: {
    radius: 10,
    sortBy: 'distance',
  },
  isLoading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload;
    },
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    updateBooking: (state, action: PayloadAction<Booking>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload.id);
      if (index !== -1) {
        state.bookings[index] = action.payload;
      }
      if (state.currentBooking?.id === action.payload.id) {
        state.currentBooking = action.payload;
      }
    },
    setFilters: (state, action: PayloadAction<Partial<SearchFilters>>) => {
      state.filters = {...state.filters, ...action.payload};
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentBooking,
  setBookings,
  addBooking,
  updateBooking,
  setFilters,
  setLoading,
  setError,
} = bookingSlice.actions;
export default bookingSlice.reducer;
