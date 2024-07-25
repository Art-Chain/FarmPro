import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Space, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { View } from 'react-native';
import Color from 'color';
import { useTheme } from '@/features/themes';
import { SvgProps } from 'react-native-svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import React from 'react';

const containerStyle = createStyle({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  flex: 1,
});

const useIconFrameStyle = createStyle((theme) => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: Color(theme.colors.primary.main).alpha(0.1).rgb().string(),
  color: theme.colors.primary.main,

  justifyContent: 'center',
  alignItems: 'center',
}));

export interface CardButtonProps {
  icon: React.FC<SvgProps>;
  name: string;

  onPress?: () => void;
}
export const CardButton = ({ icon: Icon, name, onPress }: CardButtonProps) => {
  const theme = useTheme();
  const iconFrameStyle = useIconFrameStyle();

  const pressed = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: 1 - pressed.value * 0.1,
      },
    ],
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = withTiming(1, { easing: Easing.elastic(1) });
    })
    .onEnd(() => {
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      pressed.value = withTiming(0, { easing: Easing.elastic(1) });
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View style={[containerStyle, animatedContainerStyle]}>
        <View style={iconFrameStyle}>
          <Icon color={theme.colors.primary.main}/>
        </View>
        <Space size={10}/>
        <Typography variant={'subtitle2'}>
          {name}
        </Typography>
      </Animated.View>
    </GestureDetector>
  );
};
