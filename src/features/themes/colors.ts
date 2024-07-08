export interface ColorLevel {
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
export interface ColorPalette {
  gray: ColorLevel;
}
export interface ColorToken {
  text: string;
  main: string;
  surface: string;
}
export interface Colors {
  palette: ColorPalette;

  black: ColorToken;
  white: ColorToken;
  primary: ColorToken;
}
