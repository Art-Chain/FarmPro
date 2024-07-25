import { BottomSheetBackground, BottomSheetFooter, BottomSheetHandle } from '@/pages/components';
import { StyleProp, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import {
  BottomSheetModal as BaseBottomSheetModal,
  BottomSheetModalProps as BaseBottomSheetModalProps,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { Space } from '@/ui/common';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomSheetModalProps extends Omit<BaseBottomSheetModalProps, 'children'> {
  title?: string;
  footer?: React.ReactNode;
  children?: React.ReactNode;

  footerContentStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}
export type BottomSheetModal = BaseBottomSheetModal;
export const BottomSheetModal = React.forwardRef<BaseBottomSheetModal, BottomSheetModalProps>(({
  title,
  footer,
  children,
  footerContentStyle,
  contentContainerStyle,
  ...props
}, ref) => {
  const insets = useSafeAreaInsets();

  const [height, setHeight] = useState(0);

  return (
    <BaseBottomSheetModal
      ref={ref}
      {...props}
      backgroundComponent={BottomSheetBackground}
      handleComponent={title ? (props) => <BottomSheetHandle {...props} title={title}/> : undefined}
      footerComponent={(props) => (
        <BottomSheetFooter {...props}>
          <View style={footerContentStyle} onLayout={(event) => setHeight(event.nativeEvent.layout.height)}>
            {footer}
          </View>
        </BottomSheetFooter>
      )}
    >
      <BottomSheetScrollView contentContainerStyle={contentContainerStyle}>
        {children}
        <Space size={height + insets.bottom} />
      </BottomSheetScrollView>
    </BaseBottomSheetModal>
  )
});
