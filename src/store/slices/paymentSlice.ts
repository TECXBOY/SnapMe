/**
 * Payment state slice
 * Manages payment-related state
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Payment, Transaction} from '@types/payment';

interface PaymentState {
  currentPayment: Payment | null;
  payments: Payment[];
  transactions: Transaction[];
  isLoading: boolean;
  error: string | null;
}

const initialState: PaymentState = {
  currentPayment: null,
  payments: [],
  transactions: [],
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setCurrentPayment: (state, action: PayloadAction<Payment | null>) => {
      state.currentPayment = action.payload;
    },
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.unshift(action.payload);
    },
    updatePayment: (state, action: PayloadAction<Payment>) => {
      const index = state.payments.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.payments[index] = action.payload;
      }
      if (state.currentPayment?.id === action.payload.id) {
        state.currentPayment = action.payload;
      }
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
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
  setCurrentPayment,
  setPayments,
  addPayment,
  updatePayment,
  setTransactions,
  addTransaction,
  setLoading,
  setError,
} = paymentSlice.actions;
export default paymentSlice.reducer;
