import { Text, TextProps } from 'react-native';

import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler';

import { createStyle, useTextStyle, useViewStyle } from '@/features/utils';
import React from 'react';

const baseButtonStyle = createStyle((theme) => ({
  ...theme.typography.button,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  padding: 16,
  borderRadius: 16,
  fontSize: 16,
}));
const useButtonStyle = createStyle(baseButtonStyle, (theme, variant: 'primary' | 'secondary') => {
  if (variant === 'secondary') {
    return {
      backgroundColor: theme.colors.white.surface,
      color: theme.colors.white.text,
    };
  }

  return {
    backgroundColor: theme.colors.primary.surface,
    color: theme.colors.primary.text,
  };
});

export interface ButtonProps extends Omit<TextProps, 'onPress' | 'onPressIn' | 'onPressOut'> {
  variant?: 'primary' | 'secondary';
  onPress?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  onPressIn?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  onPressOut?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  icon?: React.ReactNode;
}

export const Button = ({
  style,
  variant = 'primary',
  children,
  onPress,
  onPressIn,
  onPressOut,
  icon,
  ...props
}: ButtonProps) => {
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onBegin((event) => {
      pressed.value = true;
      if (onPressIn) runOnJS(onPressIn)(event);
    })
    .onEnd((event) => {
      if (onPress) runOnJS(onPress)(event);
    })
    .onFinalize((event) => {
      if (onPressOut) runOnJS(onPressOut)(event);
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressed.value ? 0.5 : 1, {
      easing: Easing.elastic(1),
    }),
    transform: [
      {
        scale: withTiming(pressed.value ? 0.95 : 1, {
          easing: Easing.elastic(1),
        }),
      }
    ]
  }));
  const buttonStyle = useButtonStyle(variant);

  return (
    <GestureDetector gesture={tap}>
      <Animated.View
        {...props}
        accessible
        accessibilityRole={'button'}
        style={[useViewStyle([buttonStyle, style]), animatedStyle]}>
        <Text style={useTextStyle([buttonStyle, style])}>
          {children}
        </Text>
        {icon}
      </Animated.View>
    </GestureDetector>
  );
};
