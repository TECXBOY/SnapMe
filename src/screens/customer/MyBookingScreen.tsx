/**
 * My Booking Screen
 * Customer's booking management screen
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, typography, spacing} from '@theme';

const MyBookingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Bookings</Text>
      {/* TODO: Implement booking list */}
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

export default MyBookingScreen;
