import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, Card, Space, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

import { ContentCard, ImageCard } from './components';

import AddIcon from '@/assets/images/add.svg';
import StrawberryImage from '@/assets/images/strawberry.png';
import CucumberImage from '@/assets/images/cucumber.png';
import PaprikaImage from '@/assets/images/paprika.png';
import { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppShell } from '@/pages/components';
import { View } from 'react-native';

const gradientStyle = createStyle({
  position: 'absolute',
});

export const HomePage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <AppShell>
      <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
        <Card round={16} padding={0}>
          <Svg width={'100%'} height={'100%'} style={gradientStyle}>
            <Defs>
              <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                <Stop offset={'0'} stopColor={theme.colors.primary.main} stopOpacity={'0.1'}/>
                <Stop offset={'1'} stopColor={theme.colors.primary.main} stopOpacity={'0'}/>
              </LinearGradient>
            </Defs>
            <Rect x={'0'} y={'0'} width={'100%'} height={'100%'} fill={'url(#gradient)'}/>
          </Svg>
          <Space size={16}/>
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
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <ImageCard
              source={StrawberryImage}
              subtitle={'당도 200% 딸기의 계절,'}
              title={'그린팜으로 놀러오세요!'}
              color={'#FF7272'}
            />
            <Space size={12}/>
            <ImageCard
              source={CucumberImage}
              subtitle={'아삭아삭 신선하고 건강한'}
              title={'오이만 파는 오이가게'}
              color={'#8FB852'}
            />
            <Space size={12}/>
            <ImageCard
              source={PaprikaImage}
              subtitle={'알록달록 아삭아삭'}
              title={'파프리카의 왕, 파프리카링'}
              color={'#AB90F8'}
            />
          </ScrollView>
          <Space size={24}/>
          <Button
            style={{ margin: 16 }}
            icon={<AddIcon width={16} height={16} color={theme.colors.primary.text}/>}
            onPress={useCallback(() => {
              navigation.navigate('contentCreate');
            }, [navigation])}
          >
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
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
        <Space size={12}/>
        <ContentCard
          tags={['딸기', '판매목적']}
          title={'내가 친환경 유기농 농사를 짓는다면?'}
          description={'제목: "자연의 맛 그대로, 무농약 스마트팜 딸기! 지금 바로 OOO팜에서 만나보세요, 50% 세일 진행 중"'}
        />
      </View>
    </AppShell>
  );
};
