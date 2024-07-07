import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from 'react-native';

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;
export type StyleFactory<Style extends ReactNativeStyle> = (style: Style) => void;
export const createStyle = <Styles extends ReactNativeStyle[]>(...styles: Styles) => {
   StyleSheet.compose();
};
