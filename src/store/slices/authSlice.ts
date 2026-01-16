/**
 * Authentication state slice
 * Manages user authentication state
 */

import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User, Customer, Cameraman} from '@types/user';

interface AuthState {
  user: User | Customer | Cameraman | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action: PayloadAction<User | Customer | Cameraman>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearUser: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: state => {
      state.error = null;
    },
  },
});

export const {setLoading, setUser, clearUser, setError, clearError} =
  authSlice.actions;
export default authSlice.reducer;
