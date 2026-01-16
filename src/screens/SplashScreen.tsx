/**
 * Splash Screen
 * Initial loading screen shown when app starts
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-paper';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {colors, typography} from '@theme';
import {checkAuthState} from '@services/auth/authService';
import Logo from '@components/Logo';

const SplashScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth);

  useEffect(() => {
    // Check authentication state on app start
    checkAuthState(dispatch);
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <Logo size={120} showBackground />
      <Text style={styles.title}>SnapMe</Text>
      <Text style={styles.subtitle}>Professional Photography On-Demand</Text>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    marginBottom: 32,
  },
  loader: {
    marginTop: 24,
  },
});

export default SplashScreen;
