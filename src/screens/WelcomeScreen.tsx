/**
 * Welcome Screen
 * Role selection screen - Customer or Cameraman
 */

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '@navigation/types';
import {colors, typography, spacing} from '@theme';
import Icon from 'react-native-vector-icons/MaterialIcons';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>;

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleCustomerPress = () => {
    navigation.navigate('Auth', {screen: 'PhoneInput'});
  };

  const handleCameramanPress = () => {
    navigation.navigate('Auth', {screen: 'PhoneInput'});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to SnapMe</Text>
        <Text style={styles.subtitle}>
          Choose how you'd like to use the app
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleCustomerPress}
          activeOpacity={0.7}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Icon name="camera-alt" size={64} color={colors.primary} />
              <Text style={styles.optionTitle}>I'm a Customer</Text>
              <Text style={styles.optionDescription}>
                Book professional photographers for your events
              </Text>
            </View>
          </Card>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionCard}
          onPress={handleCameramanPress}
          activeOpacity={0.7}>
          <Card style={styles.card}>
            <View style={styles.cardContent}>
              <Icon name="photo-camera" size={64} color={colors.secondary} />
              <Text style={styles.optionTitle}>I'm a Photographer</Text>
              <Text style={styles.optionDescription}>
                Offer your photography services and earn money
              </Text>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xxxl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    textAlign: 'center',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  optionCard: {
    marginBottom: spacing.md,
  },
  card: {
    elevation: 4,
    borderRadius: 12,
    backgroundColor: colors.white,
  },
  cardContent: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  optionTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.semiBold,
    color: colors.text,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  optionDescription: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text,
    textAlign: 'center',
    opacity: 0.7,
  },
});

export default WelcomeScreen;
