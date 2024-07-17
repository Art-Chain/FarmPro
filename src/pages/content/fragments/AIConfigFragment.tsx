import React, { useState } from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { Easing, ZoomIn, ZoomOut } from 'react-native-reanimated';

import { Button, Space, Typography } from '@/ui/common';
import { SelectCard } from '@/ui/SelectCard';
import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

import CheckIcon from '@/assets/images/check.svg';
import FancyStyle from '@/assets/images/style/style_fancy.png';
import CalmStyle from '@/assets/images/style/style_calm.png';
import ModernStyle from '@/assets/images/style/style_modern.png';
import EmotionalStyle from '@/assets/images/style/style_emotional.png';
import HumorousStyle from '@/assets/images/style/style_humorous.png';
import { Image, ImageStyle, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

const articleTypes = [
  {
    id: 'info',
    name: '정보성',
    description: '"우리 농산물의 영양 성분과\n' + '효능을 알려드립니다."',
  },
  {
    id: 'humorous',
    name: '유머러스한',
    description: '"이 농산물, 먹으면 기분 좋아져요!\n' + '농담 아니에요!"'
  },
  {
    id: 'touching',
    name: '감동적인',
    description: '"한 알 한 알 정성으로 키워낸 농산물,\n' + '여러분의 식탁에 감동을 더합니다."',
  },
  {
    id: 'convincing',
    name: '설득력 있는',
    description: '"건강을 지키는 최고의 선택, \n' + '우리 농산물을 지금 바로 구매하세요!"',
  },
  {
    id: 'storytelling',
    name: '이야기 형식',
    description: '"이 농산물이 자라기까지의\n' + '이야기를 들려드릴게요."',
  },
  {
    id: 'professional',
    name: '전문적인',
    description: '"최신 농업 기술로 재배된 농산물, \n' + '품질과 신뢰를 보장합니다."'
  },
] satisfies { id: string; name: string; description: string }[];

const imageStyles = [
  {
    id: 'fancy',
    name: '화려한',
    source: FancyStyle,
  },
  {
    id: 'calm',
    name: '차분한',
    source: CalmStyle,
  },
  {
    id: 'modern',
    name: '모던한',
    source: ModernStyle,
  },
  {
    id: 'emotional',
    name: '감성적인',
    source: EmotionalStyle,
  },
  {
    id: 'humorous',
    name: '유머러스한',
    source: HumorousStyle,
  },
];

const cardStyle = createStyle({
  width: 215,
  aspectRatio: 1,

  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 0,
  paddingHorizontal: 0,

  overflow: 'hidden',
});
const checkContainerStyle = createStyle({
  position: 'absolute',
  top: 12,
  right: 12,
});
const useCheckStyle = createStyle((theme) => ({
  backgroundColor: theme.colors.primary.main,
  borderRadius: 10,
  overflow: 'hidden',
}));
const backgroundStyle = createStyle({
  position: 'absolute',
  width: '100%',
  height: '100%',
});
const buttonContainerStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'space-between',
});

interface AIConfigFragmentProps {
  defaultArticleType?: string;
  defaultImageStyle?: string;
  onCancel?: () => void;
  onSubmit?: (articleType: string, imageStyle: string) => void;
}
export const AIConfigFragment = ({
  defaultArticleType = articleTypes[0].id,
  defaultImageStyle = imageStyles[0].id,
  onCancel,
  onSubmit,
}: AIConfigFragmentProps) => {
  const theme = useTheme();

  const checkStyle = useCheckStyle();

  const [articleType, setArticleType] = useState(defaultArticleType);
  const [imageStyle, setImageStyle] = useState(defaultImageStyle);

  return (
    <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
      <Typography variant={'subtitle1'}>
        게시물 문체 선택
      </Typography>
      <Space size={12}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {articleTypes.map((item, index) => <React.Fragment key={index}>
          {index > 0 && <Space size={12}/>}
          <SelectCard
            selected={item.id === articleType}
            style={cardStyle}
            onPress={() => setArticleType(item.id)}
          >
            <Typography variant={'head2'} color={(colors) => colors.primary.main}>
              {item.name}
            </Typography>
            <Space size={16}/>
            <Typography align={'center'} variant={'subtitle2'}>
              {item.description}
            </Typography>
            {item.id === articleType && (
              <Animated.View
                entering={ZoomIn.easing(Easing.elastic(0.5))}
                exiting={ZoomOut.easing(Easing.elastic(0.5))}
                style={checkContainerStyle}
              >
                <CheckIcon
                  width={20}
                  height={20}
                  color={theme.colors.white.main}
                  style={checkStyle}
                />
              </Animated.View>
            )}
          </SelectCard>
        </React.Fragment>)}
      </ScrollView>
      <Space size={36} />
      <Typography variant={'subtitle1'}>
        게시물 이미지 스타일 선택
      </Typography>
      <Space size={12}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -16 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {imageStyles.map((item, index) => <React.Fragment key={index}>
          {index > 0 && <Space size={12}/>}
          <SelectCard
            selected={item.id === imageStyle}
            style={cardStyle}
            onPress={() => setImageStyle(item.id)}
          >
            <Image source={item.source} style={backgroundStyle as ImageStyle}/>
            <Svg width={'100%'} height={'100%'} style={backgroundStyle}>
              <Defs>
                <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                  <Stop offset={'0'} stopColor={theme.colors.palette.gray['700']} stopOpacity={'0'}/>
                  <Stop offset={'0.8'} stopColor={theme.colors.black.main} stopOpacity={'0.5'}/>
                </LinearGradient>
              </Defs>
              <Rect x={'0'} y={'0'} width={'100%'} height={'100%'} fill={'url(#gradient)'} />
            </Svg>
            <Typography variant={'head2'} color={(colors) => colors.white.main}>
              {item.name}
            </Typography>
            {item.id === imageStyle && (
              <Animated.View
                entering={ZoomIn.easing(Easing.elastic(0.5))}
                exiting={ZoomOut.easing(Easing.elastic(0.5))}
                style={checkContainerStyle}
              >
                <CheckIcon
                  width={20}
                  height={20}
                  color={theme.colors.white.main}
                  style={checkStyle}
                />
              </Animated.View>
            )}
          </SelectCard>
        </React.Fragment>)}
      </ScrollView>
      <Space size={24} />
      <View style={buttonContainerStyle}>
        <Button variant={'secondary'} style={{ flex: 1 }} onPress={onCancel}>
          취소
        </Button>
        <Space size={10}/>
        <Button style={{ flex: 1 }} onPress={() => onSubmit?.(articleType, imageStyle)}>
          저장
        </Button>
      </View>
    </BottomSheetScrollView>
  );
};
