/**
 * Customer Navigator
 * Bottom tab navigation for customer users
 */

import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CustomerTabParamList} from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@theme';
import HomeScreen from '@screens/customer/HomeScreen';
import MyBookingScreen from '@screens/customer/MyBookingScreen';
import MessageScreen from '@screens/customer/MessageScreen';
import ProfileScreen from '@screens/customer/ProfileScreen';
// Additional screens will be added as stack navigators

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<CustomerTabParamList>();

const CustomerNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={CustomerTabs} />
      {/* Additional stack screens will be added here */}
    </Stack.Navigator>
  );
};

const CustomerTabs: React.FC = () => {
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
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyBooking"
        component={MyBookingScreen}
        options={{
          tabBarLabel: 'My Booking',
          tabBarIcon: ({color, size}) => (
            <Icon name="book" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={MessageScreen}
        options={{
          tabBarLabel: 'Message',
          tabBarIcon: ({color, size}) => (
            <Icon name="message" size={size} color={color} />
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

export default CustomerNavigator;
