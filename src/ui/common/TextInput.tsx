import { Platform, TextInput as BaseTextInput, TextInputProps as BaseTextInputProps, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { TypographySheet } from '@/features/themes';
import { createStyle, ReactNativeStyleProp, useTextStyle, useViewStyle } from '@/features/utils';

import type { JSX } from 'react/jsx-runtime';
import React from 'react';

const useTextInputStyle = createStyle((theme, variant: keyof TypographySheet, { left = false, right = false }: {
  left?: boolean;
  right?: boolean;
} = {}) => ({
  flex: 1,
  fontFamily: theme.typography[variant].fontFamily,
  fontWeight: theme.typography[variant].fontWeight,
  fontSize: theme.typography[variant].fontSize,
  lineHeight: Platform.OS === 'android' ? theme.typography[variant].lineHeight : undefined,
  margin: 0,
  padding: 0,
  letterSpacing: theme.typography[variant].letterSpacing,
  minHeight: theme.typography[variant].fontSize,
  textVerticalAlign: 'center',
  marginRight: right ? 8 : 0,
  marginLeft: left ? 8 : 0,
}));
const useTextInputViewStyle = createStyle((theme) => ({
  flexDirection: 'row',

  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  borderColor: theme.colors.palette.gray[300],
  borderWidth: 1,

  overflow: 'hidden',
}));
const textInputIconStyle = createStyle({
  justifyContent: 'center',
  alignItems: 'center',
});

export interface TextInputProps extends BaseTextInputProps {
  variant?: keyof TypographySheet;
  icon?: JSX.Element;
  onIconPress?: () => void;
  textStyle?: ReactNativeStyleProp;
}

export const TextInput = ({ variant = 'body1', icon, onIconPress, children, style, textStyle, ...props }: TextInputProps) => {
  const textInputStyle = useTextInputStyle(variant, { right: !!icon });
  const viewStyle = useTextInputViewStyle();

  return (
    <View style={[viewStyle, useViewStyle(style)]}>
      {children}
      <BaseTextInput {...props} style={[textInputStyle, useTextStyle(style), textStyle]}/>
      {!!icon && (
        <BorderlessButton activeOpacity={0.5} onPress={onIconPress} style={textInputIconStyle}>
          <View accessible accessibilityRole={'button'}>
            {icon}
          </View>
        </BorderlessButton>
      )}
    </View>
  );
};
