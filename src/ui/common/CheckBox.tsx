import React, { useCallback, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  interpolateColor, useAnimatedProps, useAnimatedStyle, useSharedValue, runOnJS, withTiming, Easing,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';
import { Space } from './Space';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const AnimatedPath = Animated.createAnimatedComponent(Path);

// Style Start
const useContainerStyle = createStyle((_, align: 'left' | 'right') => ({
  display: 'flex',
  flexDirection: align === 'left' ? 'row' : 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

const checkContainerStyle = createStyle({
  width: 16,
  height: 16,
  position: 'relative',
});

const checkStyle = createStyle({
  position: 'absolute',
});

// Style End

export interface CheckBoxProps {
  align?: 'left' | 'right';
  value?: boolean;
  onValueChange?: (value: boolean) => void;
  children?: React.ReactNode;
}

const CheckBox = React.memo(({
  align,
  value,
  onValueChange,
  children,
}: CheckBoxProps): JSX.Element => {
  const theme = useTheme();

  const offset = useSharedValue(0);
  const check = useSharedValue(0);

  const onEnd = useCallback(() => {
    'worklet';

    const result = offset.value > 0.5 ? 0 : 1;
    offset.value = withTiming(result, { easing: Easing.elastic(0.5) }, () => {
      check.value = withTiming(result, { easing: Easing.elastic(0.5) });
    });

    if (onValueChange) runOnJS(onValueChange)(result === 1);
  }, [check, offset, onValueChange]);
  const tapGesture = Gesture.Tap().onEnd(onEnd);

  const containerStyle = useContainerStyle(align ?? 'left');
  const checkBackgroundStyle = useAnimatedStyle(() => ({
    width: '100%',
    height: '100%',
    borderRadius: 4,
    borderWidth: (offset.value * 7) + 1,
    borderColor: interpolateColor(offset.value, [0, 1], [theme.colors.palette.gray[500], theme.colors.primary.main]),
    position: 'relative',
  }), [theme]);

  const dashOffset = useAnimatedProps(() => ({
    strokeDashoffset: (1 - check.value) * 12,
    strokeWidth: check.value * 2,
  }));

  useEffect(() => {
    const result = value ? 1 : 0;

    offset.value = withTiming(result, { easing: Easing.elastic(0.5) }, () => {
      check.value = withTiming(result, { easing: Easing.elastic(0.5) });
    });
  }, [check, offset, value]);

  return (
    <GestureDetector gesture={tapGesture}>
      <View style={[containerStyle]}>
        <Animated.View style={checkContainerStyle}>
          <Animated.View style={[checkBackgroundStyle]}/>
          <AnimatedSvg width={16} height={16} style={[checkStyle]}>
            {Platform.OS === 'android' && (
              <AnimatedPath
                d={'M4 8 L7 11 L12 5'}
                fill={'transparent'}
                stroke={theme.colors.primary.text}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
                strokeDasharray={12}
              />
            )}
            {Platform.OS === 'ios' && (
              <AnimatedPath
                d={'M4 8 L7 11 L12 5'}
                fill={'transparent'}
                stroke={theme.colors.primary.text}
                strokeLinecap={'round'}
                strokeLinejoin={'round'}
                strokeDasharray={12}
                animatedProps={dashOffset}
              />
            )}
          </AnimatedSvg>
        </Animated.View>
        {children && <Space size={10} />}
        {children}
      </View>
    </GestureDetector>
  );
});

export default CheckBox;