import { ActivityIndicator, StyleSheet } from 'react-native';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import React, { useEffect } from 'react';
import { useTheme } from '@/features/themes';
import { BlurView } from '@react-native-community/blur';

export interface LoadingViewProps {
  loading?: boolean;
}
export const LoadingView = ({ loading }: LoadingViewProps) => {
  const theme = useTheme();

  const value = useSharedValue(0);

  useEffect(() => {
    value.value = withTiming(loading ? 1 : 0, { easing: Easing.elastic(1) });
  }, [loading, value]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: value.value,
  }));

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle, { pointerEvents: 'none' }]}>
      <BlurView style={StyleSheet.absoluteFill} blurType={'dark'} blurAmount={16} />
      <ActivityIndicator
        size={'large'}
        style={StyleSheet.absoluteFill}
        color={theme.colors.primary.main}
      />
    </Animated.View>
  )
}