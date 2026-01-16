/**
 * Theme export file
 * Centralized theme configuration
 */

import {colors, Colors} from './colors';
import {typography, Typography} from './typography';
import {spacing, Spacing} from './spacing';
import {paperTheme} from './paperTheme';

export interface Theme {
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
}

export const theme: Theme = {
  colors,
  typography,
  spacing,
};

export {colors, typography, spacing, paperTheme};
export type {Colors, Typography, Spacing};
