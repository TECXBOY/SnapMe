/**
 * React Native Paper Theme Configuration
 * Custom theme for Paper components
 */

import {MD3LightTheme} from 'react-native-paper';
import {colors, typography} from './index';

export const paperTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    background: colors.background,
    surface: colors.white,
    error: colors.error,
    text: colors.text,
    onSurface: colors.text,
    disabled: colors.disabled,
    placeholder: colors.disabled,
    backdrop: colors.border,
  },
  fonts: {
    ...MD3LightTheme.fonts,
    bodyLarge: {
      ...MD3LightTheme.fonts.bodyLarge,
      fontFamily: typography.fontFamily.regular,
    },
    bodyMedium: {
      ...MD3LightTheme.fonts.bodyMedium,
      fontFamily: typography.fontFamily.regular,
    },
    bodySmall: {
      ...MD3LightTheme.fonts.bodySmall,
      fontFamily: typography.fontFamily.regular,
    },
    headlineLarge: {
      ...MD3LightTheme.fonts.headlineLarge,
      fontFamily: typography.fontFamily.bold,
    },
    headlineMedium: {
      ...MD3LightTheme.fonts.headlineMedium,
      fontFamily: typography.fontFamily.bold,
    },
    headlineSmall: {
      ...MD3LightTheme.fonts.headlineSmall,
      fontFamily: typography.fontFamily.semiBold,
    },
    titleLarge: {
      ...MD3LightTheme.fonts.titleLarge,
      fontFamily: typography.fontFamily.semiBold,
    },
    titleMedium: {
      ...MD3LightTheme.fonts.titleMedium,
      fontFamily: typography.fontFamily.medium,
    },
    titleSmall: {
      ...MD3LightTheme.fonts.titleSmall,
      fontFamily: typography.fontFamily.medium,
    },
  },
};
