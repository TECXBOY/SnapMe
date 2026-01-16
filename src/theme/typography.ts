/**
 * Typography system for SnapMe Mobile App
 * Font families and size definitions
 */

export const typography = {
  fontFamily: {
    regular: 'Inter-Regular', // or Roboto-Regular
    medium: 'Inter-Medium',
    semiBold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  lineHeight: {
    xs: 16,
    sm: 20,
    base: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
  },
};

export type Typography = typeof typography;
