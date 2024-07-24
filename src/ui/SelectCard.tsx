import Animated, {
  Easing,
  interpolateColor, runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';
import {
  Gesture,
  GestureDetector,
  GestureStateChangeEvent,
  TapGestureHandlerEventPayload
} from 'react-native-gesture-handler';
import { StyleSheet, ViewProps } from 'react-native';
import { useEffect } from 'react';

const baseCardStyle = createStyle({
  paddingHorizontal: 16,
  paddingVertical: 12,
  borderRadius: 8,
});

export interface SelectCardProps extends ViewProps {
  selected?: boolean;
  onPress?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  onPressIn?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  onPressOut?: (event: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
}

export const SelectCard = ({ selected, onPress, onPressIn, onPressOut, children, ...props }: SelectCardProps) => {
  const theme = useTheme();

  const pressed = useSharedValue(0);
  const activeValue = useSharedValue(0);

  const tap = Gesture.Tap()
    .onBegin((event) => {
      pressed.value = withTiming(1, {
        easing: Easing.elastic(1),
      });
      if (onPressIn) runOnJS(onPressIn)(event);
    })
    .onEnd((event) => {
      if (onPress) runOnJS(onPress)(event);
    })
    .onFinalize((event) => {
      if (onPressOut) runOnJS(onPressOut)(event);
      pressed.value = withTiming(0, {
        easing: Easing.elastic(1),
      });
    });

  useEffect(() => {
    activeValue.value = withTiming(selected ? 1 : 0, {
      easing: Easing.elastic(1),
    });
  }, [activeValue, selected]);

  const animatedCardStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 5],
      ['transparent', theme.colors.primary.main],
    ),
    borderColor: interpolateColor(
      pressed.value || activeValue.value,
      [0, 1],
      [theme.colors.palette.gray[300], theme.colors.primary.main],
    ),
    borderWidth: 1 + activeValue.value,
    margin: 1 - activeValue.value,
  }));

  return (
    <GestureDetector gesture={tap}>
      <Animated.View {...props} style={StyleSheet.compose([baseCardStyle, animatedCardStyle], props.style)}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};
