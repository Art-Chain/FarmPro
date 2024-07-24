import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';
import { BorderlessButton } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, {
  interpolateColor,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Space } from '@/ui/common';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';

import LogoIcon from '@/assets/logo.svg';
import BackIcon from '@/assets/images/back.svg';

import type { AppShellProps } from './types';
import Color from 'color';

const AnimatedScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);

const useHeaderSizeStyle = createStyle((_, top = 0) => ({
  width: '100%',
  height: 56 + top,
}));
const useHeaderStyle = createStyle((_, __ = 0) => ({
  width: '100%',
  height: 56,

  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',

  paddingVertical: 16,
  paddingTop: 16,

  zIndex: 200,
  overflow: 'hidden',
}));
const useBorderStyle = createStyle((theme, top = 0) => ({
  position: 'absolute',
  top: 56 + top,
  width: '100%',
  height: 1,
  backgroundColor: theme.colors.palette.gray[200],
}));
const useBlurStyle = createStyle((_, top = 0) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 56 + top,
  zIndex: 0,
}));
const useFooterBlurStyle = createStyle((_, height = 0) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height,
  zIndex: 0,
}));
const useTitleStyle = createStyle((theme, showLogo = false) => ({
  ...theme.typography.subtitle1,
  textAlignVertical: 'center',
  color: showLogo ? theme.colors.primary.main : theme.colors.white.text,
  lineHeight: undefined,
}));
const useTitleContainerStyle = createStyle((_, __ = 0, align: 'left' | 'center', useButton = false) => ({
  position: 'absolute',
  top: 0,
  left: 20 + (align === 'left' && useButton ? 24 : 0),
  right: 20,
  height: 56,

  flexDirection: 'row',
  justifyContent: align === 'left' ? 'flex-start' : 'center',
  alignItems: 'center',
}));
const useButtonStyle = createStyle((theme, margin = 0) => ({
  width: 24,
  height: 24,
  margin,

  color: theme.colors.white.text,
}));
const footerStyle = createStyle({
  position: 'absolute',
  top: 0,
  width: '100%',
  zIndex: 100,
  overflow: 'hidden',
});

export const AppShellAndroid = ({
  showLogo = true,
  showBack = false,
  showBorder = 'auto',
  title = 'FarmPro',
  align = 'left',
  icons,

  contentContainerStyle,
  children,
  header,
  footer,
}: AppShellProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const frame = useSafeAreaFrame();
  const navigation = useNavigation();
  const surfaceAlphaColor = useMemo(() => Color(theme.colors.white.surface).alpha(0).rgb().string(), [theme.colors.white.surface]);

  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const [height, setHeight] = useState(0);
  const scroll = useScrollViewOffset(scrollRef);

  const headerStyle = useHeaderStyle(insets.top);
  const headerSizeStyle = useHeaderSizeStyle(insets.top);
  const blurStyle = useBlurStyle(insets.top);
  const footerBlurStyle = useFooterBlurStyle(height + insets.bottom);
  const borderStyle = useBorderStyle(insets.top);
  const titleContainerStyle = useTitleContainerStyle(insets.top, align, showBack);
  const leftButtonStyle = useButtonStyle(20);
  const textStyle = useTitleStyle(showLogo);

  const animatedFooterStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateY: scroll.value + frame.height - height,
      },
    ],
  }), [height, frame.height]);
  const animatedHeaderStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    transform: [
      {
        translateY: scroll.value,
      },
    ],
    backgroundColor: interpolateColor(
      Math.min(scroll.value, 56),
      [0, 56 * 1.5],
      [surfaceAlphaColor, theme.colors.white.surface],
    ),
  }));
  const animatedBorderStyle = useAnimatedStyle(() => ({
    opacity: Math.min(scroll.value, 56) / 56,
  }));

  const onBack = useCallback(() => {
    if (navigation.canGoBack()) navigation.goBack();
  }, [navigation]);

  return (
    <AnimatedScrollView
      ref={scrollRef}
      style={{ minHeight: frame.height }}
    >
      <Animated.View style={[headerStyle, animatedHeaderStyle]}>
        <BlurView style={[blurStyle]} blurType={'light'} blurAmount={16}/>
        {showBorder && (
          <Animated.View
            style={showBorder === 'auto' ? [borderStyle, animatedBorderStyle] : borderStyle}
          />
        )}
        <View style={titleContainerStyle}>
          {showLogo && (
            <LogoIcon
              width={32}
              height={32}
              color={theme.colors.primary.main}
            />
          )}
          <Text style={textStyle}>
            {title}
          </Text>
        </View>
        <View>
          {showBack && (
            <BorderlessButton style={leftButtonStyle} onPress={onBack}>
              <BackIcon width={24} height={24} color={theme.colors.white.text}/>
            </BorderlessButton>
          )}
        </View>
        {icons?.map((icon) => <>
          <Space size={16}/>
          {icon}
        </>)}
        {header}
      </Animated.View>
      <View style={headerSizeStyle}/>
      <View style={[contentContainerStyle, { flex: 1, minHeight: frame.height - height - 56, }]}>
        {children}
      </View>
      <Space size={height}/>
      {!!footer && (
        <Animated.View
          style={[footerStyle, animatedFooterStyle]}
          onLayout={(event) => {
            setHeight(event.nativeEvent.layout.height);
          }}
        >
          <BlurView
            style={[footerBlurStyle]}
            blurType={'light'}
            blurAmount={16}
          />
          {footer}
          <Space size={insets.bottom}/>
        </Animated.View>
      )}
    </AnimatedScrollView>
  );
};