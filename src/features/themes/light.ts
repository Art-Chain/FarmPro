import type { ColorPalette, Colors } from './colors';
import type { TypographySheet } from './typography';
import type { Theme } from './theme';

const palette = {
  gray: {
    50: '#FFFFFF',
    100: '#F2F2F2',
    200: '#E5E5E5',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
    950: '#070707',
  },
} satisfies ColorPalette;

export const LightColors = {
  palette,

  black: {
    text: palette.gray[50],
    main: palette.gray[950],
    surface: palette.gray[900],
  },
  white: {
    text: palette.gray[950],
    main: palette.gray[50],
    surface: palette.gray[300],
  },
  primary: {
    text: palette.gray[50],
    main: '#3FC685',
    surface: '#3FC685',
  },
} satisfies Colors;

export const LightTypography = {
  head1: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 32 * 1.167,
    letterSpacing: -1.5,
  },
  head2: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24 * 1.2,
    letterSpacing: -0.5,
  },
  head3: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18 * 1.167,
  },
  subtitle1: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16 * 1.75,
    letterSpacing: 0.15,
  },
  subtitle2: {
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14 * 1.57,
    letterSpacing: 0.1,
  },
  body1: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16 * 1.5,
    letterSpacing: 0.5,
  },
  body2: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.43,
    letterSpacing: 0.25,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 12 * 1.33,
    letterSpacing: 0.4,
  },
  button: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 14 * 1.75,
    letterSpacing: 1.25,
  },
} satisfies TypographySheet;

export const LightTheme = {
  colors: LightColors,
  typography: LightTypography
} satisfies Theme;
