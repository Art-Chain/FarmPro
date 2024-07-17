import React from 'react';
import { Text, TextProps } from 'react-native';

import { createStyle } from '@/features/utils';
import { Colors, TypographySheet } from '@/features/themes';

interface TypographyOptions {
  variant: keyof TypographySheet;
  color?: (color: Colors) => string;
  align?: 'left' | 'center' | 'right';
}
export const useTypographyStyle = createStyle((theme, { variant, align, color }: TypographyOptions) => ({
  ...theme.typography[variant],
  color: color?.(theme.colors),
  textAlign: align,
}));

export type TypographyProps = TextProps & Partial<TypographyOptions>;
export const Typography = ({ variant = 'body1', color, align, ...props }: TypographyProps) => {
  const style = useTypographyStyle({ variant, color, align });

  return (
    <Text
      {...props}
      style={[props.style, style]}
    />
  );
};
