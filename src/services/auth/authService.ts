/**
 * Authentication Service
 * Handles phone authentication, OTP verification, and user management using Supabase
 */

import {supabase} from '@config/supabase';
import {AppDispatch} from '@store/index';
import {setUser, setLoading, setError, clearUser} from '@store/slices/authSlice';
import {User, Customer, Cameraman} from '@types/user';

/**
 * Send OTP to phone number using Supabase Auth
 * @param phoneNumber - Phone number in format +232XXXXXXXXX
 */
export const sendOTP = async (phoneNumber: string): Promise<void> => {
  try {
    const {error} = await supabase.auth.signInWithOtp({
      phone: phoneNumber,
      options: {
        channel: 'sms',
      },
    });

    if (error) {
      throw new Error(error.message || 'Failed to send OTP');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Failed to send OTP');
  }
};

/**
 * Verify OTP code
 * @param phoneNumber - Phone number
 * @param code - 6-digit OTP code
 * @param dispatch - Redux dispatch function
 * @returns User object
 */
export const verifyOTP = async (
  phoneNumber: string,
  code: string,
  dispatch: AppDispatch,
): Promise<User | Customer | Cameraman> => {
  dispatch(setLoading(true));

  try {
    const {data, error} = await supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: code,
      type: 'sms',
    });

    if (error) {
      throw new Error(error.message || 'Invalid OTP code');
    }

    if (!data.user) {
      throw new Error('User not found after verification');
    }

    // Check if user exists in database
    const {data: userData, error: fetchError} = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is OK for new users
      throw new Error(fetchError.message || 'Failed to fetch user data');
    }

    if (userData) {
      const user = userData as User | Customer | Cameraman;
      dispatch(setUser(user));
      return user;
    } else {
      // New user - will be created during onboarding
      const newUser: User = {
        id: data.user.id,
        phoneNumber: phoneNumber,
        role: 'customer', // Default, will be updated during onboarding
        createdAt: new Date(data.user.created_at),
        updatedAt: new Date(),
      };
      dispatch(setUser(newUser));
      return newUser;
    }
  } catch (error: any) {
    dispatch(setError(error.message || 'Invalid OTP code'));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Check authentication state on app start
 * @param dispatch - Redux dispatch function
 */
export const checkAuthState = async (dispatch: AppDispatch): Promise<void> => {
  dispatch(setLoading(true));

  try {
    // Get current session
    const {
      data: {session},
    } = await supabase.auth.getSession();

    if (session?.user) {
      // Fetch user data from database
      const {data: userData, error} = await supabase
        .from('users')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (!error && userData) {
        const user = userData as User | Customer | Cameraman;
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
      }
    } else {
      dispatch(clearUser());
    }

    // Listen to auth state changes
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        const {data: userData} = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (userData) {
          const user = userData as User | Customer | Cameraman;
          dispatch(setUser(user));
        }
      } else if (event === 'SIGNED_OUT') {
        dispatch(clearUser());
      }
    });
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to check auth state'));
  } finally {
    dispatch(setLoading(false));
  }
};

/**
 * Create customer profile
 * @param userId - User ID
 * @param customerData - Customer data
 */
export const createCustomerProfile = async (
  userId: string,
  customerData: Omit<Customer, 'id' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt'>,
): Promise<Customer> => {
  const {
    data: {user},
  } = await supabase.auth.getUser();

  const customer: Customer = {
    id: userId,
    phoneNumber: user?.phone || '',
    role: 'customer',
    ...customerData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const {error} = await supabase.from('users').upsert(customer);
  if (error) throw error;

  const {error: customerError} = await supabase.from('customers').upsert(customer);
  if (customerError) throw customerError;

  return customer;
};

/**
 * Create cameraman profile
 * @param userId - User ID
 * @param cameramanData - Cameraman data
 */
export const createCameramanProfile = async (
  userId: string,
  cameramanData: Omit<Cameraman, 'id' | 'phoneNumber' | 'role' | 'createdAt' | 'updatedAt'>,
): Promise<Cameraman> => {
  const {
    data: {user},
  } = await supabase.auth.getUser();

  const cameraman: Cameraman = {
    id: userId,
    phoneNumber: user?.phone || '',
    role: 'cameraman',
    status: 'pending',
    rating: 0,
    reviewCount: 0,
    completedJobs: 0,
    walletBalance: 0,
    totalEarnings: 0,
    withdrawalHistory: [],
    ...cameramanData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const {error} = await supabase.from('users').upsert(cameraman);
  if (error) throw error;

  const {error: cameramanError} = await supabase.from('cameramen').upsert(cameraman);
  if (cameramanError) throw cameramanError;

  return cameraman;
};

/**
 * Sign out user
 * @param dispatch - Redux dispatch function
 */
export const signOut = async (dispatch: AppDispatch): Promise<void> => {
  try {
    const {error} = await supabase.auth.signOut();
    if (error) throw error;
    dispatch(clearUser());
  } catch (error: any) {
    dispatch(setError(error.message || 'Failed to sign out'));
  }
};
