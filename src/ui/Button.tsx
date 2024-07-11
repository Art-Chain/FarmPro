import { TextProps } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

import { createStyle, useTextStyle, useViewStyle } from '@/features/utils';

const baseButtonStyle = createStyle({
  padding: 16,
  borderRadius: 16,
  fontSize: 16,
  textAlign: 'center',
});
const useButtonStyle = createStyle(baseButtonStyle, (theme, variant: 'primary' | 'secondary') => {
  if (variant === 'secondary') {
    return {
      backgroundColor: theme.colors.white.surface,
      color: theme.colors.white.text,
    };
  }

  return {
    backgroundColor: theme.colors.black.surface,
    color: theme.colors.black.text,
  };
});

export interface ButtonProps extends TextProps {
  variant?: 'primary' | 'secondary';
}

export const Button = ({
  style,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressed.value ? 0.5 : 1),
  }));
  const buttonStyle = useButtonStyle(variant);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[useViewStyle([buttonStyle, style]), animatedStyle]}>
        <Animated.Text
          style={useTextStyle([buttonStyle, style])}
          {...props}
        />
      </Animated.View>
    </GestureDetector>
  );
};
