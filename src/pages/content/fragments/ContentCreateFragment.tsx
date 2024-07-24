import React, { useCallback, useMemo, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, View } from 'react-native';

import { Space, TextInput, Typography } from '@/ui/common';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';

import { ContentPagination, ContentPromptCard } from '../components';

import AIIcon from '@/assets/images/ai.svg';
import AddIcon from '@/assets/images/add.svg';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';

const titleContainer = createStyle({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});
const useAddCardStyle = createStyle((theme) => ({
  width: '100%',
  padding: 16,
  borderRadius: 16,
  aspectRatio: 1,

  justifyContent: 'center',
  alignItems: 'center',

  overflow: 'hidden',
  borderWidth: 2,
  borderColor: theme.colors.palette.gray[300],
  backgroundColor: theme.colors.palette.gray[200],
}));

export const ContentCreateFragment = () => {
  const theme = useTheme();
  const size = useMemo(() => Dimensions.get('window').width, []);

  const [length, setLength] = useState(1);
  const [position, setPosition] = useState(0);

  const onAdd = useCallback(() => {
    setLength((size) => size + 1);
  }, []);

  const tap = Gesture.Tap()
    .onEnd(() => {
      runOnJS(onAdd)();
    });
  const tapConfig = Gesture.Tap()
    .onEnd(() => {
      // TODO: AI gen
    });

  const addCardStyle = useAddCardStyle();

  return (
    <View style={{ width: '100%', flex: 1, overflow: 'visible' }}>
      <View style={titleContainer}>
        <Typography variant={'subtitle1'}>
          카드뉴스 이미지 생성
        </Typography>
        <GestureDetector gesture={tapConfig}>
          <AIIcon color={theme.colors.primary.main}/>
        </GestureDetector>
      </View>
      <Space size={16}/>
      <View style={{ margin: -20, height: size }}>
        <Carousel
          loop={false}
          width={size}
          height={size}
          data={Array.from({ length: length + 1 })}
          renderItem={(data) => {
            if (data.index === length) {
              return (
                <GestureDetector gesture={tap}>
                  <View style={addCardStyle}>
                    <AddIcon width={72} height={72} color={theme.colors.palette.gray[500]}/>
                  </View>
                </GestureDetector>
              );
            }

            return <ContentPromptCard
              showTitle={data.index === 0}
              onRemove={() => setLength((it) => it > 1 ? it - 1 : it)}
            />;
          }}
          mode={'parallax'}
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={useCallback((_: number, progress: number) => {
            if (progress >= length) return;

            setPosition(progress);
          }, [length])}
        />
      </View>
      <Space size={16}/>
      <ContentPagination current={position} length={length}/>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        본문 입력
        <Typography variant={'subtitle1'} style={{ color: '#FF1F1F' }}>
          *
        </Typography>
      </Typography>
      <Space size={8}/>
      <TextInput
        variant={'body1'}
        placeholder={'본문의 키워드나 문장를 입력하세요.\n' +
          '예) 새로 수확한 딸기, 당일 수확 딸기, 구매 원하시면 연락'}
        multiline
        style={{ flex: 1, minHeight: 60 }}
      />
    </View>
  );
};
