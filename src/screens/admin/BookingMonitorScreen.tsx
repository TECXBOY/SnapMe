/**
 * Booking Monitor Screen
 * Monitor active bookings
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, typography, spacing} from '@theme';

const BookingMonitorScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Monitor</Text>
      {/* TODO: Implement booking monitoring */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
  },
});

export default BookingMonitorScreen;
