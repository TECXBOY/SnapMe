/**
 * Admin Navigator
 * Stack navigation for admin users
 */

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AdminStackParamList} from './types';
import AdminDashboardScreen from '@screens/admin/AdminDashboardScreen';
import PendingApprovalsScreen from '@screens/admin/PendingApprovalsScreen';
import BookingMonitorScreen from '@screens/admin/BookingMonitorScreen';
import PayoutManagementScreen from '@screens/admin/PayoutManagementScreen';
import DisputesScreen from '@screens/admin/DisputesScreen';

const Stack = createNativeStackNavigator<AdminStackParamList>();

const AdminNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#0B1F3A',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{title: 'Admin Dashboard'}}
      />
      <Stack.Screen
        name="PendingApprovals"
        component={PendingApprovalsScreen}
        options={{title: 'Pending Approvals'}}
      />
      <Stack.Screen
        name="BookingMonitor"
        component={BookingMonitorScreen}
        options={{title: 'Booking Monitor'}}
      />
      <Stack.Screen
        name="PayoutManagement"
        component={PayoutManagementScreen}
        options={{title: 'Payout Management'}}
      />
      <Stack.Screen
        name="Disputes"
        component={DisputesScreen}
        options={{title: 'Disputes'}}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
