/**
 * Authentication Service
 * Handles phone authentication, OTP verification, and user management using Supabase
 */

import {supabase} from '@config/supabase';
import {AppDispatch} from '@store/index';
import {setUser, setLoading, setError, clearUser} from '@store/slices/authSlice';
import {User, Customer, Cameraman} from '@types/user';

/**
 * Helper function to convert database snake_case to TypeScript camelCase
 */
const mapUserFromDb = (dbUser: any): User => ({
  id: dbUser.id,
  phoneNumber: dbUser.phone_number || dbUser.phoneNumber,
  role: dbUser.role,
  createdAt: new Date(dbUser.created_at || dbUser.createdAt),
  updatedAt: new Date(dbUser.updated_at || dbUser.updatedAt),
});

/**
 * Helper function to convert TypeScript camelCase to database snake_case
 */
const mapUserToDb = (user: Partial<User>): any => ({
  id: user.id,
  phone_number: user.phoneNumber,
  role: user.role,
  created_at: user.createdAt?.toISOString(),
  updated_at: user.updatedAt?.toISOString(),
});

/**
 * Helper function to map customer from database
 */
const mapCustomerFromDb = (dbCustomer: any): Customer => ({
  ...mapUserFromDb(dbCustomer),
  role: 'customer' as const,
  name: dbCustomer.name,
  profileImage: dbCustomer.profile_image || dbCustomer.profileImage,
  bookingHistory: dbCustomer.booking_history || dbCustomer.bookingHistory || [],
  orangeMoneyNumber: dbCustomer.orange_money_number || dbCustomer.orangeMoneyNumber,
});

/**
 * Helper function to map cameraman from database
 */
const mapCameramanFromDb = (dbCameraman: any): Cameraman => ({
  ...mapUserFromDb(dbCameraman),
  role: 'cameraman' as const,
  status: dbCameraman.status,
  brandName: dbCameraman.brand_name || dbCameraman.brandName,
  profileImage: dbCameraman.profile_image || dbCameraman.profileImage,
  portfolio: dbCameraman.portfolio || [],
  equipment: dbCameraman.equipment || [],
  serviceCategories: dbCameraman.service_categories || dbCameraman.serviceCategories || [],
  location: dbCameraman.location || {latitude: 0, longitude: 0, address: ''},
  availability: dbCameraman.availability,
  rating: Number(dbCameraman.rating || 0),
  reviewCount: Number(dbCameraman.review_count || dbCameraman.reviewCount || 0),
  completedJobs: Number(dbCameraman.completed_jobs || dbCameraman.completedJobs || 0),
  pricePerHour: dbCameraman.price_per_hour || dbCameraman.pricePerHour,
  orangeMoneyNumber: dbCameraman.orange_money_number || dbCameraman.orangeMoneyNumber,
  walletBalance: Number(dbCameraman.wallet_balance || dbCameraman.walletBalance || 0),
  totalEarnings: Number(dbCameraman.total_earnings || dbCameraman.totalEarnings || 0),
  withdrawalHistory: dbCameraman.withdrawal_history || dbCameraman.withdrawalHistory || [],
});

/**
 * Helper function to convert customer to database format
 */
const mapCustomerToDb = (customer: Partial<Customer>): any => ({
  ...mapUserToDb(customer),
  name: customer.name,
  profile_image: customer.profileImage,
  booking_history: customer.bookingHistory,
  orange_money_number: customer.orangeMoneyNumber,
});

/**
 * Helper function to convert cameraman to database format
 */
const mapCameramanToDb = (cameraman: Partial<Cameraman>): any => ({
  ...mapUserToDb(cameraman),
  status: cameraman.status,
  brand_name: cameraman.brandName,
  profile_image: cameraman.profileImage,
  portfolio: cameraman.portfolio,
  equipment: cameraman.equipment,
  service_categories: cameraman.serviceCategories,
  location: cameraman.location,
  availability: cameraman.availability,
  rating: cameraman.rating,
  review_count: cameraman.reviewCount,
  completed_jobs: cameraman.completedJobs,
  price_per_hour: cameraman.pricePerHour,
  orange_money_number: cameraman.orangeMoneyNumber,
  wallet_balance: cameraman.walletBalance,
  total_earnings: cameraman.totalEarnings,
  withdrawal_history: cameraman.withdrawalHistory,
});

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
      // Check if user is customer or cameraman
      let user: User | Customer | Cameraman;
      
      if (userData.role === 'cameraman') {
        // Fetch cameraman data
        const {data: cameramanData} = await supabase
          .from('cameramen')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (cameramanData) {
          user = mapCameramanFromDb(cameramanData);
        } else {
          user = mapUserFromDb(userData);
        }
      } else if (userData.role === 'customer') {
        // Fetch customer data
        const {data: customerData} = await supabase
          .from('customers')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (customerData) {
          user = mapCustomerFromDb(customerData);
        } else {
          user = mapUserFromDb(userData);
        }
      } else {
        user = mapUserFromDb(userData);
      }
      
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
        // Map user data based on role
        let user: User | Customer | Cameraman;
        
        if (userData.role === 'cameraman') {
          const {data: cameramanData} = await supabase
            .from('cameramen')
            .select('*')
            .eq('id', session.user.id)
            .single();
          user = cameramanData ? mapCameramanFromDb(cameramanData) : mapUserFromDb(userData);
        } else if (userData.role === 'customer') {
          const {data: customerData} = await supabase
            .from('customers')
            .select('*')
            .eq('id', session.user.id)
            .single();
          user = customerData ? mapCustomerFromDb(customerData) : mapUserFromDb(userData);
        } else {
          user = mapUserFromDb(userData);
        }
        
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
          let user: User | Customer | Cameraman;
          
          if (userData.role === 'cameraman') {
            const {data: cameramanData} = await supabase
              .from('cameramen')
              .select('*')
              .eq('id', session.user.id)
              .single();
            user = cameramanData ? mapCameramanFromDb(cameramanData) : mapUserFromDb(userData);
          } else if (userData.role === 'customer') {
            const {data: customerData} = await supabase
              .from('customers')
              .select('*')
              .eq('id', session.user.id)
              .single();
            user = customerData ? mapCustomerFromDb(customerData) : mapUserFromDb(userData);
          } else {
            user = mapUserFromDb(userData);
          }
          
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

  // Convert to database format
  const userDbData = mapUserToDb(customer);
  const customerDbData = mapCustomerToDb(customer);

  // Insert into users table
  const {error} = await supabase.from('users').upsert(userDbData);
  if (error) throw error;

  // Insert into customers table
  const {error: customerError} = await supabase.from('customers').upsert(customerDbData);
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

  // Convert to database format
  const userDbData = mapUserToDb(cameraman);
  const cameramanDbData = mapCameramanToDb(cameraman);

  // Insert into users table
  const {error} = await supabase.from('users').upsert(userDbData);
  if (error) throw error;

  // Insert into cameramen table
  const {error: cameramanError} = await supabase.from('cameramen').upsert(cameramanDbData);
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
