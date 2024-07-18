import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { createStyle } from '@/features/utils';
import { Space, Typography } from '@/ui/common';

import LoadingAnimation from '@/assets/animations/loading.json';

const containerStyle = createStyle({
  width: '100%',
  height: '100%',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ContentLoadingPage = () => {
  return (
    <View style={containerStyle}>
      <Typography variant={'head2'}>
        콘텐츠를 생성하는 중이에요!
      </Typography>
      <Space size={12}/>
      <Typography align={'center'} variant={'body1'} color={(colors) => colors.palette.gray[500]}>
        콘텐츠의 길이에 따라 7초-40초 정도{'\n'}
        소요될 수 있습니다.
      </Typography>
      <Space size={24}/>
      <LottieView
        source={LoadingAnimation}
        style={{ width: 80, height: 80 }}
        autoPlay
        loop
      />
    </View>
  );
};
