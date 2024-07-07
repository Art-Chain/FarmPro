import type { Colors, ColorPalette } from './colors';
import type { Theme } from './theme';

const palette = {
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
} satisfies ColorPalette;

export const LightColors = {
  palette,

  black: {
    content: palette.gray[950],
    background: palette.gray[50],
    surface: palette.gray[100],
  },
  white: {
    content: palette.gray[50],
    background: palette.gray[950],
    surface: palette.gray[900],
  },
  primary: {
    content: '#2B6CB0',
    background: '#EBF8FF',
    surface: '#90CDF4',
  },
} satisfies Colors;

export const LightTheme = {
  colors: LightColors,
} satisfies Theme;
