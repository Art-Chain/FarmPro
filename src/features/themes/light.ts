import type { ColorPalette, Colors } from './colors';
import type { TypographySheet } from './typography';
import type { Theme } from './theme';

const palette = {
  gray: {
    50: '#FFFFFF',
    100: '#F2F2F2',
    200: '#E5E5E5',
    300: '#C6C6C6',
    400: '#A4A4A4',
    500: '#828282',
    600: '#767676',
    700: '#686868',
    800: '#333333',
    900: '#1F1F1F',
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
    text: palette.gray[500],
    main: palette.gray[50],
    surface: palette.gray[100],
  },
  primary: {
    text: palette.gray[50],
    main: '#3FC685',
    surface: '#3FC685',
  },
} satisfies Colors;

export const LightTypography = {
  head1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 32 * 1.4,
  },
  head2: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 24 * 1.4,
  },
  head3: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20 * 1.4,
  },
  subtitle1: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18 * 1.4,
  },
  subtitle2: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 16 * 1.4,
  },
  body1: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16 * 1.5,
    letterSpacing: 0.5,
  },
  body2: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 14 * 1.4,
  },
  caption: {
    fontFamily: 'Pretendard-Regular',
    fontSize: 12,
    lineHeight: 12 * 1.4,
  },
  button: {
    fontFamily: 'Pretendard-SemiBold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 16 * 1.4,
  },
} satisfies TypographySheet;

export const LightTheme = {
  colors: LightColors,
  typography: LightTypography
} satisfies Theme;
