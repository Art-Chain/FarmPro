export interface Typography {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  lineHeight?: number;
  letterSpacing?: number;
}

export interface TypographySheet {
  head1: Typography;
  head2: Typography;
  head3: Typography;
  subtitle1: Typography;
  subtitle2: Typography;
  body1: Typography;
  body2: Typography;
  caption: Typography;
  button: Typography;
}
