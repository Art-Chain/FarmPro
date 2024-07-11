import type { ColorPalette, Colors } from './colors';
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
    text: '#EBF8FF',
    main: '#2B6CB0',
    surface: '#90CDF4',
  },
} satisfies Colors;

export const LightTheme = {
  colors: LightColors,
} satisfies Theme;
