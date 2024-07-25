import React from 'react';
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';

import { Shadow } from '@/ui/Shadow.tsx';
import { useTheme } from '@/features/themes';
import { View } from 'react-native';
import Animated, { useAnimatedProps } from 'react-native-reanimated';

const AnimatedShadow = Animated.createAnimatedComponent(Shadow);

export const BottomSheetBackground = React.forwardRef<View, BottomSheetBackgroundProps>(({
  style,
  animatedIndex,
  ...props
}, ref) => {
  const theme = useTheme();

  const animatedProps = useAnimatedProps(() => ({
    shadowRadius: 128 * Math.max(Math.min(1, 1 + animatedIndex.value), 0),
  }));

  return (
    <AnimatedShadow
      {...props}
      ref={ref}
      borderTopLeftRadius={16}
      shadowColor={'rgba(0, 0, 0, 0.4)'}
      borderTopRightRadius={16}
      style={style}
      animatedProps={animatedProps}
    >
      <View
        style={[style, { backgroundColor: theme.colors.white.main, borderRadius: 16 }]}
      />
    </AnimatedShadow>
  );
});
