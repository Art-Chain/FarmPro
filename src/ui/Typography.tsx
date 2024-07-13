import { Text, TextProps } from 'react-native';
import React from 'react';
import { createStyle } from '@/features/utils';
import { TypographySheet } from '@/features/themes';

export const useTypographyStyle = createStyle((theme, variant: keyof TypographySheet) => theme.typography[variant]);

export interface TypographyProps extends TextProps {
  variant?: keyof TypographySheet;
}
export const Typography = ({ variant = 'body1', ...props }: TypographyProps) => {
  const style = useTypographyStyle(variant);

  return (
    <Text
      {...props}
      style={[props.style, style]}
    />
  );
};
