import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';

import { AIConfigFragment, ContentCreateFragment, ContentCreateInfoFragment } from './fragments';

import { Shadow } from '@/ui/Shadow';
import { useTheme } from '@/features/themes';
import { AppShell } from '@/pages/components';
import { useNavigation } from '@react-navigation/native';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));

export const ContentCreatePage = () => {
  const theme = useTheme();
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
    else navigation.navigate('contentLoading');

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
        <Animated.View entering={SlideInLeft} exiting={SlideOutLeft} collapsable={false} style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
          <ContentCreateInfoFragment/>
        </Animated.View>
      )}
      {position === 1 && (
        <Animated.View entering={SlideInRight} exiting={SlideOutRight} collapsable={false} style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
          <ContentCreateFragment onConfigPress={configRef.current?.present}/>
        </Animated.View>
      )}
      <BottomSheetModal
        ref={configRef}
        index={0}
        snapPoints={['80%']}
        backgroundComponent={({ style, ...props }) => (
          <Shadow
            key={0}
            {...props}
            shadowRadius={128}
            shadowColor={'rgba(0, 0, 0, 0.4)'}
            borderTopLeftRadius={16}
            borderTopRightRadius={16}
            style={[style, { backgroundColor: theme.colors.white.main }]}
          />
        )}
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
