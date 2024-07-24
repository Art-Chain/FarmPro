import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React from 'react';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import type { JSX } from 'react/jsx-runtime';
import { ViewProps } from 'react-native';
import { ReactNativeStyle } from '@/features/utils';

export type TabAnimation = (value: SharedValue<number>) => ReactNativeStyle;
export const Animation = {
  scale: (value) => {
    'worklet';

    return {
      transform: [
        {
          scale: 1 - value.value * 0.1,
        },
      ]
    };
  },
  opacity: (value) => {
    'worklet';

    return {
      opacity: 1 - value.value * 0.5,
    };
  },
} satisfies Record<string, TabAnimation>;

export interface TabProps extends ViewProps {
  onPress?: () => void;
  children?: JSX.Element;
  animation?: TabAnimation;
}
export const Tap = React.memo(({
  animation = Animation.scale,
  onPress,
  children,
  ...props
}: TabProps) => {
  const pressed = useSharedValue(0);

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = withTiming(1, { easing: Easing.elastic(1) });
    })
    .onEnd(() => {
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      pressed.value = withTiming(0, { easing: Easing.elastic(1) });
    });

  const animatedStyle = useAnimatedStyle(() => animation(pressed));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View {...props} style={[props.style, animatedStyle]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
});
