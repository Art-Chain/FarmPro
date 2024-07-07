import { createTheming } from '@callstack/react-theme-provider';

import { Colors } from './colors';
import { LightTheme } from './light';

export interface Theme {
  colors: Colors;
}

export const { ThemeProvider, withTheme, useTheme } = createTheming(LightTheme);
