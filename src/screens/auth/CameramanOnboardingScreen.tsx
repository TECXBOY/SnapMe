/**
 * Cameraman Onboarding Screen
 * Collects detailed cameraman information including Orange Money number
 */

import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import {useAppDispatch} from '@store/hooks';
import {createCameramanProfile} from '@services/auth/authService';
import {setUser} from '@store/slices/authSlice';
import {supabase} from '@config/supabase';
import {formatPhoneNumber, SIERRA_LEONE_COUNTRY_CODE} from '@utils';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'CameramanOnboarding'>;
type RouteProp = RouteProp<AuthStackParamList, 'CameramanOnboarding'>;

const CameramanOnboardingScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProp>();
  const dispatch = useAppDispatch();
  const {phoneNumber} = route.params;

  const [brandName, setBrandName] = useState('');
  const [orangeMoneyNumber, setOrangeMoneyNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateOrangeMoneyNumber = (phone: string): boolean => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 8 || (digits.length === 11 && digits.startsWith('232'));
  };

  const handleComplete = async () => {
    setError(null);

    if (!brandName.trim()) {
      setError('Please enter your brand name');
      return;
    }

    if (!orangeMoneyNumber.trim()) {
      setError('Orange Money number is required');
      return;
    }

    if (!validateOrangeMoneyNumber(orangeMoneyNumber)) {
      setError('Please enter a valid Orange Money number');
      return;
    }

    setLoading(true);

    try {
      const {
        data: {user},
      } = await supabase.auth.getUser();
      const userId = user?.id;
      if (!userId) {
        throw new Error('User not authenticated');
      }

      const formattedOrangeMoney = formatPhoneNumber(orangeMoneyNumber);

      const cameraman = await createCameramanProfile(userId, {
        brandName: brandName.trim(),
        profileImage: '', // Will be uploaded separately
        portfolio: [],
        equipment: [],
        serviceCategories: [],
        location: {
          latitude: 0,
          longitude: 0,
          address: '', // Will be set up separately
        },
        availability: 'available',
        orangeMoneyNumber: formattedOrangeMoney,
      });

      dispatch(setUser(cameraman));
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
            Set up your photographer profile
          </Text>

          <TextInput
            label="Brand/Business Name"
            value={brandName}
            onChangeText={text => {
              setBrandName(text);
              setError(null);
            }}
            mode="outlined"
            style={styles.input}
            placeholder="Enter your brand or business name"
            error={!!error && !brandName.trim()}
            disabled={loading}
            autoCapitalize="words"
          />

          <View style={styles.orangeMoneyContainer}>
            <Text style={styles.orangeMoneyLabel}>
              Orange Money Number (Required)
            </Text>
            <Text style={styles.orangeMoneyHint}>
              This is where you'll receive payments
            </Text>
            <View style={styles.phoneInputContainer}>
              <Text style={styles.countryCode}>{SIERRA_LEONE_COUNTRY_CODE}</Text>
              <TextInput
                value={orangeMoneyNumber}
                onChangeText={text => {
                  setOrangeMoneyNumber(text);
                  setError(null);
                }}
                keyboardType="phone-pad"
                mode="outlined"
                style={styles.phoneInput}
                placeholder="XX XXX XXXX"
                error={!!error && (!orangeMoneyNumber.trim() || !validateOrangeMoneyNumber(orangeMoneyNumber))}
                disabled={loading}
              />
            </View>
          </View>

          {error && <Text style={styles.errorText}>{error}</Text>}

          <Text style={styles.note}>
            Note: You can add your portfolio, equipment, and location later in your profile settings.
          </Text>

          <Button
            mode="contained"
            onPress={handleComplete}
            loading={loading}
            disabled={loading || !brandName.trim() || !orangeMoneyNumber.trim()}
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
  orangeMoneyContainer: {
    marginBottom: spacing.md,
  },
  orangeMoneyLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  orangeMoneyHint: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.6,
    marginBottom: spacing.sm,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countryCode: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginRight: spacing.sm,
    paddingTop: 16,
  },
  phoneInput: {
    flex: 1,
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.error,
    fontSize: typography.fontSize.sm,
    marginBottom: spacing.md,
  },
  note: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    opacity: 0.6,
    marginBottom: spacing.lg,
    fontStyle: 'italic',
  },
  button: {
    marginTop: spacing.lg,
    paddingVertical: spacing.sm,
  },
});

export default CameramanOnboardingScreen;
