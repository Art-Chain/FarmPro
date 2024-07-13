import { TextInput as BaseTextInput, TextInputProps as BaseTextInputProps } from 'react-native';
import Animated from 'react-native-reanimated';

import { TypographySheet } from '@/features/themes';

import { useTypographyStyle } from './Typography';
import { createStyle } from '@/features/utils';

const useTextInputViewStyle = createStyle((theme) => ({
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
  borderColor: theme.colors.palette.gray[300],
  borderWidth: 2,
}));

export interface TextInputProps extends BaseTextInputProps {
  variant?: keyof TypographySheet;
}
export const TextInput = ({ variant = 'body1', ...props }: TextInputProps) => {
  const textStyle = useTypographyStyle(variant);
  const viewStyle = useTextInputViewStyle();

  return (
    <Animated.View style={viewStyle}>
      <BaseTextInput {...props} style={[textStyle, props.style]} />
    </Animated.View>
  );
};
