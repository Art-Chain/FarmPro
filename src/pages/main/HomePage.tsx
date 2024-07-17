import { Button, Card, Space, Typography } from '@/ui/common';
import { ScrollView } from 'react-native-gesture-handler';

import { ContentCard } from './components/ContentCard';

import AddIcon from '@/assets/images/add.svg';
import { useTheme } from '@/features/themes';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { createStyle } from '@/features/utils';

const gradientStyle = createStyle({
  position: 'absolute',
});

export const HomePage = () => {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingHorizontal: 20 }}>
      <Card round={16}>
        <Svg width={1000} height={'100%'} style={gradientStyle}>
          <Defs>
            <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
              <Stop offset={'0'} stopColor={theme.colors.primary.main} stopOpacity={'0.1'}/>
              <Stop offset={'1'} stopColor={theme.colors.primary.main} stopOpacity={'0'}/>
            </LinearGradient>
          </Defs>
          <Rect x={'0'} y={'0'} width={'100%'} height={'100%'} fill={'url(#gradient)'} />
        </Svg>
        <Typography variant={'head3'} align={'center'}>
          1분 만에 만드는{'\n'}
          SNS 마케팅 콘텐츠
        </Typography>
        <Space size={8}/>
        <Typography variant={'body2'} align={'center'} color={(colors) => colors.palette.gray[500]}>
          어려웠던 콘텐츠 제작, 이제는 AI가 글과 이미지를{'\n'}
          원하는 대로 만들어드립니다!
        </Typography>
        <Space size={24}/>
        <Button icon={<AddIcon width={16} height={16} color={theme.colors.primary.text}/>}>
          콘텐츠 만들기
        </Button>
      </Card>
      <Space size={24}/>
      <Typography variant={'subtitle1'}>
        딸기로 인스타 콘텐츠 만드는 법
      </Typography>
      <Space size={16}/>
      <ContentCard
        tags={['딸기', '홍보목적']}
        title={'내가 스마트팜 딸기 생산자라면?'}
        description={'제목: “최첨단 스마트팜에서 자란 최고 품질의 딸기, OO 농장은 소비자를 위해 최고 품질만 취급합니다.”'}
      />
      <Space size={12}/>
      <ContentCard
        tags={['딸기', '판매목적']}
        title={'내가 친환경 유기농 농사를 짓는다면?'}
        description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
      />
    </ScrollView>
  );
};
