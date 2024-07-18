import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';
import { Space, Typography } from '@/ui/common';

import BackIcon from '@/assets/images/back.svg';
import { useNavigation } from '@react-navigation/native';

const useHeaderStyle = createStyle((theme, top = 0) => ({
  width: '100%',
  height: 56 + top,

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',

  padding: 16,
  paddingTop: 16 + top,

  borderBottomWidth: 1,
  borderColor: theme.colors.palette.gray[200],
}));

interface BaseHeaderProps {
  left?: React.ReactNode;
  right?: React.ReactNode;
  title?: string;
  canBack?: boolean;
}

export const BaseHeader = ({
  title,
  left,
  right,
  canBack = true,
}: BaseHeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const headerStyle = useHeaderStyle(insets.top);

  return (
    <View style={headerStyle}>
      {left ?? (
        canBack
          ? (
            <BackButton
              tintColor={theme.colors.palette.gray[950]}
              canGoBack
              label={''}
              onPress={() => navigation.goBack()}
            />
          )
          : <Space size={24}/>
      )}
      <Typography variant={'subtitle1'}>
        {title}
      </Typography>
      {right ?? <Space size={24}/>}
    </View>
  );
};

interface BackButtonProps {
  tintColor: string;
  canGoBack: boolean;
  label: string;
  onPress?: () => void;
}

const BackButton = ({ tintColor, onPress }: BackButtonProps) => {
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(pressed.value ? 0.5 : 1, {
      easing: Easing.elastic(1),
    }),
  }));

  const tap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = true;
    })
    .onEnd(() => {
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      pressed.value = false;
    });

  return (
    <GestureDetector gesture={tap}>
      <Animated.View accessible accessibilityRole={'button'} style={animatedStyle}>
        <BackIcon
          width={24}
          height={24}
          color={tintColor}
        />
      </Animated.View>
    </GestureDetector>
  );
};
