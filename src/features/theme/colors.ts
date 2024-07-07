export interface ColorPalette {
  50?: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950?: string;
}
export interface ColorTokens {
  gray: ColorPalette;
}
export interface Colors {
  tokens: ColorTokens;
  black: string;
  white: string;
  primary: string;
}
