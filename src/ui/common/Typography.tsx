import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { createStyle } from '@/features/utils';
import { Colors, TypographySheet } from '@/features/themes';

interface TypographyOptions {
  variant: keyof TypographySheet;
  color?: (color: Colors) => string;
  align?: 'left' | 'center' | 'right';
  weight?: TextStyle['fontWeight'];
}
export const useTypographyStyle = createStyle((theme, { variant, align, color, weight }: TypographyOptions) => ({
  ...theme.typography[variant],
  color: color?.(theme.colors),
  textAlign: align,
  fontWeight: weight,
}));

export type TypographyProps = TextProps & Partial<TypographyOptions>;
export const Typography = ({ variant = 'body1', color, align, weight, ...props }: TypographyProps) => {
  const style = useTypographyStyle({ variant, color, align, weight });

  return (
    <Text
      {...props}
      style={StyleSheet.flatten([style, props.style])}
    />
  );
};
