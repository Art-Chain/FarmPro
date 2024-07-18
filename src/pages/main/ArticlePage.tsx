import { View } from 'react-native';
import { Space, Typography } from '@/ui/common';
import LottieView from 'lottie-react-native';
import LoadingAnimation from '@/assets/animations/loading.json';

export const ArticlePage = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LottieView
        source={LoadingAnimation}
        style={{ width: 80, height: 80 }}
        autoPlay
        loop
      />
      <Space size={16} />
      <Typography variant={'head3'}>본선에서 만나요!</Typography>
    </View>
  );
};
