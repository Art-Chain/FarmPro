import { TextStyle } from 'react-native';

export type Typography = Pick<TextStyle, 'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'>;

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
