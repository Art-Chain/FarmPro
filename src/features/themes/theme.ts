import { createTheming } from '@callstack/react-theme-provider';

import { Colors } from './colors';
import { LightTheme } from './light';
import { TypographySheet } from './typography';

export interface Theme {
  colors: Colors;
  typography: TypographySheet;
}

export const { ThemeProvider, withTheme, useTheme } = createTheming(LightTheme);
