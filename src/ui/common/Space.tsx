import { View } from 'react-native';
import React from 'react';

export interface SpaceProps {
  size?: number;
}

export const Space = React.memo(({ size }: SpaceProps) => (
  <View style={size ? { height: size, width: size } : { flex: 1 }}/>
));
