import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { useTheme } from '@/features/themes';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const BottomSheetBackdrop = ({ animatedIndex, style, ...props }: BottomSheetBackdropProps) => {
  const theme = useTheme();

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: Math.max(Math.min(1, 1 + animatedIndex.value), 0) * 0.2,
    backgroundColor: theme.colors.black.main,
  }));

  return (
    <Animated.View
      {...props}
      style={[animatedStyle, style]}
    />
  )
};
