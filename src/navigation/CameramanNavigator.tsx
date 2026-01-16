/**
 * Cameraman Navigator
 * Bottom tab navigation for cameraman users
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CameramanTabParamList} from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@theme';
import DashboardScreen from '@screens/cameraman/DashboardScreen';
import BookingsScreen from '@screens/cameraman/BookingsScreen';
import WalletScreen from '@screens/cameraman/WalletScreen';
import ProfileScreen from '@screens/cameraman/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<CameramanTabParamList>();

const CameramanNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Dashboard" component={CameramanTabs} />
      {/* Additional stack screens will be added here */}
    </Stack.Navigator>
  );
};

const CameramanTabs: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.disabled,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <Icon name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        options={{
          tabBarLabel: 'Bookings',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size}) => (
            <Icon name="account-balance-wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Icon name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default CameramanNavigator;
