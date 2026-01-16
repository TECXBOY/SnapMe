/**
 * Phone Input Screen
 * Phone number entry with Sierra Leone format validation
 */

import React, {useState} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import {SIERRA_LEONE_COUNTRY_CODE, formatPhoneNumber} from '@utils';
import {sendOTP} from '@services/auth/authService';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'PhoneInput'>;

const PhoneInputScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePhoneNumber = (phone: string): boolean => {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    // Should be 8 digits (Sierra Leone local format) or 11 digits (with country code)
    return digits.length === 8 || (digits.length === 11 && digits.startsWith('232'));
  };

  const handleContinue = async () => {
    setError(null);

    if (!phoneNumber.trim()) {
      setError('Please enter your phone number');
      return;
    }

    if (!validatePhoneNumber(phoneNumber)) {
      setError('Please enter a valid Sierra Leone phone number');
      return;
    }

    setLoading(true);
    try {
      const formattedPhone = formatPhoneNumber(phoneNumber);
      await sendOTP(formattedPhone);
      navigation.navigate('OTPVerification', {phoneNumber: formattedPhone});
    } catch (err: any) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <Text style={styles.title}>Enter Your Phone Number</Text>
        <Text style={styles.subtitle}>
          We'll send you a verification code
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.countryCode}>{SIERRA_LEONE_COUNTRY_CODE}</Text>
          <TextInput
            label="Phone Number"
            value={phoneNumber}
            onChangeText={text => {
              setPhoneNumber(text);
              setError(null);
            }}
            keyboardType="phone-pad"
            mode="outlined"
            style={styles.input}
            placeholder="XX XXX XXXX"
            error={!!error}
            disabled={loading}
          />
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          mode="contained"
          onPress={handleContinue}
          loading={loading}
          disabled={loading}
          style={styles.button}
          buttonColor={colors.primary}>
          Continue
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  countryCode: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.medium,
    color: colors.text,
    marginRight: spacing.sm,
    paddingTop: 16,
  },
  input: {
    flex: 1,
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

export default PhoneInputScreen;
