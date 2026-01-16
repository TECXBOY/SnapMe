/**
 * Root Navigator
 * Main navigation container that routes based on authentication state
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAppSelector} from '@store/hooks';
import {RootStackParamList} from './types';
import AuthNavigator from './AuthNavigator';
import CustomerNavigator from './CustomerNavigator';
import CameramanNavigator from './CameramanNavigator';
import AdminNavigator from './AdminNavigator';
import SplashScreen from '@screens/SplashScreen';
import WelcomeScreen from '@screens/WelcomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
  const {isAuthenticated, user, isLoading} = useAppSelector(state => state.auth);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        ) : user?.role === 'customer' ? (
          <Stack.Screen name="Customer" component={CustomerNavigator} />
        ) : user?.role === 'cameraman' ? (
          <Stack.Screen name="Cameraman" component={CameramanNavigator} />
        ) : user?.role === 'admin' ? (
          <Stack.Screen name="Admin" component={AdminNavigator} />
        ) : (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
