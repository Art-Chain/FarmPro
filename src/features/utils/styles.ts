import { useMemo } from 'react';
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { ReactNativeStyle, ReactNativeStyleProp } from './types';

export const propToStyle = (style?: ReactNativeStyleProp): ReactNativeStyle => StyleSheet.flatten(style);

export const useTextStyle = (prop?: ReactNativeStyleProp): TextStyle => useMemo(() => {
  if (!prop) return {};
  const style = propToStyle(prop) as TextStyle;
  const result: TextStyle = {};

  if (style.color) result.color = style.color;
  if (style.fontFamily) result.fontFamily = style.fontFamily;
  if (style.fontSize) result.fontSize = style.fontSize;
  if (style.fontStyle) result.fontStyle = style.fontStyle;
  if (style.fontWeight) result.fontWeight = style.fontWeight;
  if (style.letterSpacing) result.letterSpacing = style.letterSpacing;
  if (style.lineHeight) result.lineHeight = style.lineHeight;
  if (style.textAlign) result.textAlign = style.textAlign;
  if (style.textDecorationLine) result.textDecorationLine = style.textDecorationLine;
  if (style.textDecorationStyle) result.textDecorationStyle = style.textDecorationStyle;
  if (style.textDecorationColor) result.textDecorationColor = style.textDecorationColor;
  if (style.textShadowColor) result.textShadowColor = style.textShadowColor;
  if (style.textShadowOffset) result.textShadowOffset = style.textShadowOffset;
  if (style.textShadowRadius) result.textShadowRadius = style.textShadowRadius;
  if (style.textTransform) result.textTransform = style.textTransform;
  if (style.userSelect) result.userSelect = style.userSelect;

  // iOS-only
  if (style.fontVariant) result.fontVariant = style.fontVariant;
  // if (style.textDecorationColor) result.textDecorationColor = style.textDecorationColor;
  // if (style.textDecorationStyle) result.textDecorationStyle = style.textDecorationStyle;
  if (style.writingDirection) result.writingDirection = style.writingDirection;

  // Android-only
  if (style.textAlignVertical) result.textAlignVertical = style.textAlignVertical;
  if (style.verticalAlign) result.verticalAlign = style.verticalAlign;
  if (style.includeFontPadding) result.includeFontPadding = style.includeFontPadding;

  return result;
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
  const result: ImageStyle = {};

  if (style.resizeMode) result.resizeMode = style.resizeMode;
  if (style.overlayColor) result.overlayColor = style.overlayColor;
  if (style.tintColor) result.tintColor = style.tintColor;
  if (style.objectFit) result.objectFit = style.objectFit;

  return result;
}, [prop]);
