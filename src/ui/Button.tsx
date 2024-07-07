import { StyleSheet, TextProps } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { useTheme } from '@/features/theme';



export interface ButtonProps extends TextProps {
  variant: 'primary' | 'secondary';
}

export const Button = ({
  style,
  ...props
}: ButtonProps) => {
  const theme = useTheme();
  const pressed = useSharedValue<boolean>(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: theme.colors.black.background,
    color: theme.colors.black.content,
    opacity: withTiming(pressed.value ? 0.5 : 1),
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.Text
        style={StyleSheet.compose(style, animatedStyle)}
        {...props}
      />
    </GestureDetector>
  );
};
