import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { AppShell, BottomSheetBackground } from '@/pages/components';

import { AIConfigFragment, ContentCreateFragment, ContentCreateInfoFragment } from './fragments';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));

export const ContentCreatePage = () => {
  const navigation = useNavigation();

  const configRef = useRef<BottomSheetModal>(null);
  const [position, setPosition] = useState(0);
  const [aiConfig, setAiConfig] = useState({
    articleType: 'info',
    imageStyle: 'fancy',
  });

  const buttonContainerStyle = useButtonContainerStyle(0);

  const onNext = useCallback(() => {
    if (position === 0) setPosition(1);
    // else navigation.navigate('contentLoading');
    else configRef.current?.present();
  }, [navigation, position]);
  const onPrev = useCallback(() => {
    setPosition(0);
  }, []);

  return (
    <AppShell
      showBack
      showBorder
      showLogo={false}
      align={'center'}
      title={`콘텐츠 만들기 (${position + 1}/2)`}
      footer={
        <View style={buttonContainerStyle}>
          <Button variant={'secondary'} style={{ flex: 1 }} onPress={onPrev}>
            이전
          </Button>
          <Space size={10}/>
          <Button style={{ flex: 1 }} onPress={onNext}>
            {position ? '생성' : '다음'}
          </Button>
        </View>
      }
    >
      {position === 0 && (
        <Animated.View
          entering={SlideInLeft}
          exiting={SlideOutLeft}
          collapsable={false}
          style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}
        >
          <ContentCreateInfoFragment/>
        </Animated.View>
      )}
      {position === 1 && (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          collapsable={false}
          style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}
        >
          <ContentCreateFragment />
        </Animated.View>
      )}
      <BottomSheetModal
        ref={configRef}
        index={0}
        snapPoints={['80%']}
        backgroundComponent={BottomSheetBackground}
      >
        <AIConfigFragment
          key={0}
          defaultArticleType={aiConfig.articleType}
          defaultImageStyle={aiConfig.imageStyle}
          onCancel={configRef.current?.close}
          onSubmit={useCallback((articleType: string, imageStyle: string) => {
            setAiConfig({ articleType, imageStyle });
            configRef.current?.close();
          }, [])}
        />
      </BottomSheetModal>
    </AppShell>
  );
};
