import type { JSX } from 'react/jsx-runtime';
import type { StyleProp, ViewStyle } from 'react-native';

export interface AppShellProps {
  showLogo?: boolean;
  showBorder?: boolean | 'auto';
  showBack?: boolean;
  title?: string;
  align?: 'left' | 'center';

  icons?: JSX.Element[];

  contentContainerStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;

  header?: React.ReactNode;
  footer?: React.ReactNode;
}
