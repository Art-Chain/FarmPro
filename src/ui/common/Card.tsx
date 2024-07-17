import React from 'react';
import { View, ViewProps } from 'react-native';

import { createStyle } from '@/features/utils';

export const useCardStyle = createStyle((theme, padding = 16, borderRadius = 12) => ({
  padding,
  borderRadius,
  borderWidth: 1,
  borderColor: theme.colors.palette.gray[200],
  overflow: 'hidden',
}));

export interface CardProps extends ViewProps {
  round?: number;
  padding?: number;
  children?: React.ReactNode;
}

export const Card = React.memo(({ round = 12, padding = 16, children, ...props }: CardProps) => {
  const cardStyle = useCardStyle(padding, round);

  return (
    <View {...props} style={[cardStyle, props.style]}>
      {children}
    </View>
  );
});
