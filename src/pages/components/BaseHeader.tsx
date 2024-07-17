import { useTheme } from '@/features/themes';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { createStyle } from '@/features/utils';
import { View } from 'react-native';

import { Space, Typography } from '@/ui/common';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

const useHeaderStyle = createStyle((theme, top = 0) => ({
  width: '100%',
  height: 56 + top,

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: 18,
  paddingTop: 18 + top,

  borderBottomWidth: 1,
  borderColor: theme.colors.palette.gray[200],
}));
export const BaseHeader = ({ route, options }: NativeStackHeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const headerStyle = useHeaderStyle(insets.top);

  return (
    <View style={headerStyle}>
      {options.headerLeft?.({
        tintColor: theme.colors.palette.gray[950],
        canGoBack: true,
        label: '',
      }) ?? <Space size={24} />}
      <Typography variant={'subtitle1'}>
        {options.title ?? route.name}
      </Typography>
      {options.headerRight?.({
        tintColor: theme.colors.primary.main,
        canGoBack: true,
      }) ?? <Space size={24} />}
    </View>
  );
};
