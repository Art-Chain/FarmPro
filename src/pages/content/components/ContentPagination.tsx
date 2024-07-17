import React from 'react';
import { View } from 'react-native';
import Animated, { interpolateColor, SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';
import { Space } from '@/ui/common';

const useContainerStyle = createStyle((theme) => ({
  width: 'auto',

  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',

  marginHorizontal: 'auto',
  padding: 4,
  borderRadius: 25,

  backgroundColor: theme.colors.palette.gray[100],
}));
const dotStyle = createStyle({
  width: 6,
  height: 6,
  borderRadius: 6,
});

export interface ContentPaginationProps {
  length: number;
  current?: number;
  value?: SharedValue<number>;
}

export const ContentPagination = ({ length, current, value: propValue }: ContentPaginationProps) => {
  const fallbackValue = useSharedValue(current ?? 0);
  const value = propValue ?? fallbackValue;

  const containerStyle = useContainerStyle();

  return (
    <View style={containerStyle}>
      {Array.from({ length }).map((_, i) => <>
        {i > 0 && <Space size={4} />}
        <Dot key={i} current={value} position={i}/>
      </>)}
    </View>
  );
};

interface DotProps {
  position: number;
  current: SharedValue<number>;
}

const Dot = React.memo(({ position, current }: DotProps) => {
  const theme = useTheme();

  const animatedDotStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      Math.min(1, Math.abs(position - current.value)),
      [0, 1],
      [theme.colors.palette.gray[700], theme.colors.palette.gray[300]],
    ),
  }), [theme]);

  return (
    <Animated.View style={[dotStyle, animatedDotStyle]}/>
  );
});