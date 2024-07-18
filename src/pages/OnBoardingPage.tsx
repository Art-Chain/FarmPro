import { useCallback } from 'react';
import { Image, ImageStyle, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import PagerView from 'react-native-pager-view';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { Space, Typography } from '@/ui/common';
import { Pagination } from '@/pages/components/Pagination.tsx';

import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';
import { usePageScrollHandler } from '@/features/hooks';

import img from '@/assets/images/on_boarding_1.png';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const useButtonStyle = createStyle((theme, inset = 0) => ({
  padding: 28,
  backgroundColor: theme.colors.primary.main,
  paddingBottom: 28 + inset,
}));
const useButtonTextStyle = createStyle((theme) => ({
  color: theme.colors.primary.text,
  textAlign: 'center',
}));
const imageStyle = createStyle({
  width: '100%',
  flex: 1,
  resizeMode: 'contain',
});
const textStyle = createStyle({
  textAlign: 'center',
  marginTop: 24,
});

export const OnBoardingPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const page = useSharedValue(0);
  const buttonStyle = useButtonStyle(insets.bottom);
  const buttonTextStyle = useButtonTextStyle();

  const onStart = useCallback(() => {
    navigation.navigate('main');
    void AsyncStorage.setItem('onBoarding', 'true');
  }, [navigation]);
  const handler = usePageScrollHandler({
    onPageScroll: (event) => {
      'worklet';
      page.value = event.offset + event.position;
    },
  });

  return (
    <View style={{ width: '100%', height: '100%', paddingTop: insets.top }}>
      <View key={0} style={{ width: '100%', height: '100%' }}>
        <Space size={24}/>
        <Pagination length={2} value={page}/>
        <AnimatedPagerView useNext={false} style={{ flex: 1 }} scrollEnabled initialPage={0} onPageScroll={handler}>
          <View key={0} style={{ flex: 1 }}>
            <Typography variant={'head2'} style={textStyle}>
              <Typography variant={'head2'} style={{ color: theme.colors.primary.main }}>AI로</Typography> 자동 생성되는{'\n'}
              마케팅 콘텐츠
            </Typography>
            <Image source={img} style={imageStyle as ImageStyle}/>
          </View>
          <View key={1} style={{ flex: 1 }}>
            <Typography variant={'head2'} style={textStyle}>
              <Typography variant={'head2'} style={{ color: theme.colors.primary.main }}>지속적인</Typography>{'\n'}
              마케팅 콘텐츠
            </Typography>
            <Image source={img} style={imageStyle as ImageStyle}/>
          </View>
        </AnimatedPagerView>
        <RectButton style={buttonStyle} onPress={onStart}>
          <View accessible accessibilityRole={'button'}>
            <Typography variant={'button'} style={buttonTextStyle}>시작하기</Typography>
          </View>
        </RectButton>
      </View>
    </View>
  );
};
