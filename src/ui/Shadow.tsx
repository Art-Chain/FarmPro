import Color from 'color';
import React, { PropsWithChildren, useMemo } from 'react';

import {
  PixelRatio, Platform, requireNativeComponent, StyleSheet, View, ViewProps, ViewStyle,
} from 'react-native';

const NativeShadowView = requireNativeComponent('ShadowView');

export interface ShadowProps extends ViewProps {
  borderTopLeftRadius?: number;
  borderTopRightRadius?: number;
  borderBottomLeftRadius?: number;
  borderBottomRightRadius?: number;

  shadowColor?: string;
  shadowRadius?: number;
  spreadRadius?: number;

  offsetX?: number;
  offsetY?: number;
}

const ShadowAndroid = React.memo(({ children, ...props }: PropsWithChildren<ShadowProps>): JSX.Element => {
  const ratio = useMemo(() => PixelRatio.get(), []);

  const computedProps = useMemo(() => {
    const list = Object.entries(props);

    return Object.fromEntries(
      list.map(([key, value]) => {
        if (typeof value === 'number') {
          return [key, value * ratio];
        }

        return [key, value];
      }),
    );
  }, [props, ratio]);

  return (
    <NativeShadowView {...computedProps}>
      {children}
    </NativeShadowView>
  );
});

const ShadowIOS = React.memo(React.forwardRef<View, PropsWithChildren<ShadowProps>>(({ children, style, ...props }, ref) => {
  const color = useMemo(() => Color(props.shadowColor), [props.shadowColor]);

  const shadowStyle: ViewStyle = useMemo(() => ({
    shadowColor: color.hex(),
    shadowOpacity: color.alpha(),
    shadowRadius: props.shadowRadius,
    shadowOffset: {
      width: props.offsetX ?? 0,
      height: props.offsetY ?? 0,
    },
  }), [color, props.offsetX, props.offsetY, props.shadowRadius]);

  return (
    <View {...props} ref={ref} style={StyleSheet.compose(style, shadowStyle)}>
      {children}
    </View>
  );
}));

export const Shadow = Platform.OS === 'android' ? ShadowAndroid : ShadowIOS;
