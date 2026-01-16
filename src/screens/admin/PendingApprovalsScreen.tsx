/**
 * Pending Approvals Screen
 * Review and approve/reject cameraman applications
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import {colors, typography, spacing} from '@theme';

const PendingApprovalsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pending Approvals</Text>
      {/* TODO: Implement pending approvals list */}
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

export default PendingApprovalsScreen;
