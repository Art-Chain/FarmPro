import type { BottomSheetHandleProps as BaseBottomSheetHandleProps } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { Space, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import React from 'react';

const useContainerStyle = createStyle((theme) => ({
  width: '100%',
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.palette.gray[200],
  alignItems: 'center',
}));
const useHandleStyle = createStyle((theme) => ({
  width: 40,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.colors.palette.gray[200],
}));

export interface BottomSheetHandleProps extends BaseBottomSheetHandleProps {
  title?: string;
}

export const BottomSheetHandle = React.forwardRef<View, BottomSheetHandleProps>(({ title }, ref) => {
  const handleStyle = useHandleStyle();
  const containerStyle = useContainerStyle();

  return (
    <View ref={ref} style={containerStyle}>
      <Space size={6}/>
      <View style={handleStyle}/>
      <Space size={12}/>
      <Typography variant={'subtitle1'}>
        {title}
      </Typography>
      <Space size={12}/>
    </View>
  );
});
