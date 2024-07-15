import { View, TextInput as BaseTextInput, TextInputProps as BaseTextInputProps } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { TypographySheet } from '@/features/themes';
import { createStyle } from '@/features/utils';

import type { JSX } from 'react/jsx-runtime';

const useTextInputStyle = createStyle((theme, variant: keyof TypographySheet, { left = false, right = false }: { left?: boolean; right?: boolean; } = {}) => ({
  flex: 1,
  fontFamily: theme.typography[variant].fontFamily,
  fontWeight: theme.typography[variant].fontWeight,
  fontSize: theme.typography[variant].fontSize,
  letterSpacing: theme.typography[variant].letterSpacing,
  marginRight: right ? 8 : 0,
  marginLeft: left ? 8 : 0,
}));
const useTextInputViewStyle = createStyle((theme) => ({
  flexDirection: 'row',

  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  borderColor: theme.colors.palette.gray[300],
  borderWidth: 2,
}));

export interface TextInputProps extends BaseTextInputProps {
  variant?: keyof TypographySheet;
  icon?: JSX.Element;
  onIconPress?: () => void;
}
export const TextInput = ({ variant = 'body1', icon, onIconPress, ...props }: TextInputProps) => {
  const textStyle = useTextInputStyle(variant, { right: !!icon });
  const viewStyle = useTextInputViewStyle();

  return (
    <Animated.View style={viewStyle}>
      <BaseTextInput {...props} style={[textStyle, props.style]} />
      {!!icon && (
        <BorderlessButton activeOpacity={0.5} onPress={onIconPress}>
          <View accessible accessibilityRole={'button'}>
          {icon}
          </View>
        </BorderlessButton>
      )}
    </Animated.View>
  );
};
