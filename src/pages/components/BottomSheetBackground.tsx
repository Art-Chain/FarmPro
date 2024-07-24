import React from 'react';
import type { BottomSheetBackgroundProps } from '@gorhom/bottom-sheet';

import { Shadow } from '@/ui/Shadow';
import { useTheme } from '@/features/themes';
import { View } from 'react-native';

export const BottomSheetBackground = ({ style, ...props }: BottomSheetBackgroundProps) => {
  const theme = useTheme();

  return (
    <Shadow
      key={0}
      shadowRadius={128}
      shadowColor={'rgba(0, 0, 0, 0.4)'}
      borderTopLeftRadius={16}
      borderTopRightRadius={16}
      style={style}
    >
      <View
        {...props}
        style={[style, { backgroundColor: theme.colors.white.main, borderRadius: 16 }]}
      />
    </Shadow>
  );
};
