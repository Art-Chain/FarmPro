import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ReactNativeStyle, ReactNativeStyleProp } from './types';

export const propToStyle = (style?: ReactNativeStyleProp): ReactNativeStyle => StyleSheet.flatten(style);

export const useTextStyle = (prop?: ReactNativeStyleProp): TextStyle => useMemo(() => {
  if (!prop) return {};
  const style = propToStyle(prop) as TextStyle;

  return { // for performance
    color: style.color,
    fontFamily: style.fontFamily,
    fontSize: style.fontSize,
    fontStyle: style.fontStyle,
    fontWeight: style.fontWeight,
    letterSpacing: style.letterSpacing,
    lineHeight: style.lineHeight,
    textAlign: style.textAlign,
    textDecorationLine: style.textDecorationLine,
    textDecorationStyle: style.textDecorationStyle,
    textDecorationColor: style.textDecorationColor,
    textShadowColor: style.textShadowColor,
    textShadowOffset: style.textShadowOffset,
    textShadowRadius: style.textShadowRadius,
    textTransform: style.textTransform,
    userSelect: style.userSelect,

    // iOS-only
    fontVariant: style.fontVariant,
    // textDecorationColor: style.textDecorationColor,
    // textDecorationStyle: style.textDecorationStyle,
    writingDirection: style.writingDirection,

    // Android-only
    textAlignVertical: style.textAlignVertical,
    verticalAlign: style.verticalAlign,
    includeFontPadding: style.includeFontPadding,
  };
}, [prop]);

export const useViewStyle = (prop?: ReactNativeStyleProp): ViewStyle => {
  const textStyle = useTextStyle(prop);
  const imageStyle = useImageStyle(prop);

  return useMemo(() => { // for performance
    if (!prop) return {};

    const textKeys = Object.keys(textStyle);
    const imageKeys = Object.keys(imageStyle);

    return Object.entries(propToStyle(prop))
      .filter(([key]) => !textKeys.includes(key) && !imageKeys.includes(key))
      .reduce((acc, [key, value]) => ({
        ...acc,
        [key]: value as unknown,
      }), {} as ViewStyle);
  }, [prop, textStyle, imageStyle]);
};

export const useImageStyle = (prop?: ReactNativeStyleProp): ImageStyle => useMemo(() => {
  if (!prop) return {};
  const style = propToStyle(prop) as ImageStyle;

  return { // for performance
    resizeMode: style.resizeMode,
    overlayColor: style.overlayColor,
    tintColor: style.tintColor,
    objectFit: style.objectFit,
  };
}, [prop]);
