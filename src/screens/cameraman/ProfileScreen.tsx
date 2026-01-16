/**
 * Cameraman Profile Screen
 * Cameraman profile management
 */

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {signOut} from '@services/auth/authService';
import {colors, typography, spacing} from '@theme';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {user} = useAppSelector(state => state.auth);

  const handleSignOut = async () => {
    await signOut(dispatch);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && user.role === 'cameraman' && (
        <Text style={styles.name}>{user.brandName}</Text>
      )}
      <Button mode="contained" onPress={handleSignOut} style={styles.button}>
        Sign Out
      </Button>
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
    marginBottom: spacing.md,
  },
  name: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  button: {
    marginTop: spacing.lg,
  },
});

export default ProfileScreen;
