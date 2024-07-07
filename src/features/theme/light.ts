import type { Colors, ColorTokens } from './colors';
import type { Theme } from './theme';

const tokens = {
  gray: {
    50: '#F9FAFB',
    100: '#F7FAFC',
    200: '#EDF2F7',
    300: '#E2E8F0',
    400: '#CBD5E0',
    500: '#A0AEC0',
    600: '#718096',
    700: '#4A5568',
    800: '#2D3748',
    900: '#1A202C',
    950: '#070707',
  },
} satisfies ColorTokens;

export const LightColors = {
  tokens: tokens,

  black: tokens.gray[950],
  white: tokens.gray[50],

  primary: '#3182CE',
} satisfies Colors;

export const LightTheme = {
  colors: LightColors,
} satisfies Theme;
