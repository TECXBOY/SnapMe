/**
 * Customer Onboarding Screen
 * Collects basic customer information after phone verification
 */

import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import {useAppDispatch} from '@store/hooks';
import {createCustomerProfile} from '@services/auth/authService';
import {setUser} from '@store/slices/authSlice';
import {supabase} from '@config/supabase';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'CustomerOnboarding'>;
type RouteProp = RouteProp<AuthStackParamList, 'CustomerOnboarding'>;

const CustomerOnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const dispatch = useAppDispatch();
  const {phoneNumber} = route.params;

  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      const userId = user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const customer = await createCustomerProfile(userId, {
        name: name.trim(),
        bookingHistory: [],
      });

      dispatch(setUser(customer));
      // Navigation will be handled by RootNavigator
    } catch (err: any) {
      setError(err.message || 'Failed to create profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text style={styles.title}>Complete Your Profile</Text>
          <Text style={styles.subtitle}>
            Tell us a bit about yourself
          </Text>

          <TextInput
            label="Full Name"
            value={name}
            onChangeText={text => {
              setName(text);
              setError(null);
            }}
            mode="outlined"
            style={styles.input}
            placeholder="Enter your full name"
            error={!!error}
            disabled={loading}
            autoCapitalize="words"
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Button
            mode="contained"
            onPress={handleComplete}
            loading={loading}
            disabled={loading || !name.trim()}
            style={styles.button}
            buttonColor={colors.primary}>
            Complete Setup
          </Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
    opacity: 0.7,
  },
  input: {
    marginBottom: spacing.md,
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
});

export default CustomerOnboardingScreen;
