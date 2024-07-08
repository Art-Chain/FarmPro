import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ReactNativeStyle = ViewStyle | TextStyle | ImageStyle;
export type ReactNativeStyleProp = StyleProp<ReactNativeStyle>;
