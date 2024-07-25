import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { Space } from '@/ui/common';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BottomSheetFooter as BaseBottomSheetFooter, BottomSheetFooterProps as BaseBottomSheetFooterProps } from '@gorhom/bottom-sheet';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';

const footerGradientStyle = createStyle({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: '100%',
  zIndex: 0,
  backgroundColor: 'transparent',
});

export interface BottomSheetFooterProps extends Omit<BaseBottomSheetFooterProps, 'children'> {
  children?: React.ReactNode;
}
export const BottomSheetFooter = ({ children, ...props }: BottomSheetFooterProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <BaseBottomSheetFooter {...props}>
      <Svg width={'100%'} height={'100%'} style={footerGradientStyle}>
        <Defs>
          <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
            <Stop offset={'0'} stopColor={theme.colors.white.main} stopOpacity={'0'}/>
            <Stop offset={'0.5'} stopColor={theme.colors.white.main} stopOpacity={'1'}/>
          </LinearGradient>
        </Defs>
        <Rect x={'0'} y={'0'} width={'100%'} height={'100%'} fill={'url(#gradient)'}/>
      </Svg>
      {children}
      <Space size={insets.bottom}/>
    </BaseBottomSheetFooter>
  );
}