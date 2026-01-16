/**
 * Authentication Navigator
 * Handles authentication flow screens
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './types';
import PhoneInputScreen from '@screens/auth/PhoneInputScreen';
import OTPVerificationScreen from '@screens/auth/OTPVerificationScreen';
import CustomerOnboardingScreen from '@screens/auth/CustomerOnboardingScreen';
import CameramanOnboardingScreen from '@screens/auth/CameramanOnboardingScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
      <Stack.Screen name="PhoneInput" component={PhoneInputScreen} />
      <Stack.Screen
        name="OTPVerification"
        component={OTPVerificationScreen}
      />
      <Stack.Screen
        name="CustomerOnboarding"
        component={CustomerOnboardingScreen}
      />
      <Stack.Screen
        name="CameramanOnboarding"
        component={CameramanOnboardingScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
