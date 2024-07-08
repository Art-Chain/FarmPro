import type { ColorPalette, Colors } from './colors';
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
    text: palette.gray[50],
    main: palette.gray[950],
    surface: palette.gray[100],
  },
  white: {
    text: palette.gray[950],
    main: palette.gray[50],
    surface: palette.gray[900],
  },
  primary: {
    text: '#EBF8FF',
    main: '#2B6CB0',
    surface: '#90CDF4',
  },
} satisfies Colors;

export const LightTheme = {
  colors: LightColors,
} satisfies Theme;
