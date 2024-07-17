import React from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

const containerStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  height: 8,
});
const dotStyle = createStyle({
  width: 8,
  height: 8,
  borderRadius: 4,
});

export interface PaginationProps {
  length: number;
  current?: number;
  value?: SharedValue<number>;
}

export const Pagination = ({ length, current, value: propValue }: PaginationProps) => {
  const fallbackValue = useSharedValue(current ?? 0);
  const value = propValue ?? fallbackValue;

  return (
    <View style={containerStyle}>
      {Array.from({ length }).map((_, i) => (
        <Dot key={i} current={value} position={i}/>
      ))}
    </View>
  );
};

interface DotProps {
  position: number;
  current: SharedValue<number>;
}

const Dot = React.memo(({ position, current }: DotProps) => {
  const theme = useTheme();

  const animatedDotStyle = useAnimatedStyle(() => {
    const offset = Math.min(1, Math.abs(position - current.value));

    return {
      transform: [
        {
          scale: 1 - offset * 0.5,
        },
      ],
      backgroundColor: interpolateColor(offset, [0, 1], [theme.colors.palette.gray[700], theme.colors.palette.gray[300]]),
    };
  }, [theme]);

  return (
    <Animated.View style={[dotStyle, animatedDotStyle]}/>
  );
});