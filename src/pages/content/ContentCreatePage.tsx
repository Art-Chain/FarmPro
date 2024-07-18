import React, { useCallback, useRef, useState } from 'react';
import { NativeSyntheticEvent, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';
import { BottomSheetModal } from '@gorhom/bottom-sheet';

import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';

import { AIConfigFragment, ContentCreateFragment, ContentCreateInfoFragment } from './fragments';

import type { OnPageSelectedEventData } from 'react-native-pager-view/src/specs/PagerViewNativeComponent';
import { Shadow } from '@/ui/Shadow';
import { useTheme } from '@/features/themes';
import { BaseHeader } from '@/pages/components';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));

export const ContentCreatePage = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const pager = useRef<PagerView>(null);
  const configRef = useRef<BottomSheetModal>(null);
  const [position, setPosition] = useState(0);
  const [aiConfig, setAiConfig] = useState({
    articleType: 'info',
    imageStyle: 'fancy',
  });

  const buttonContainerStyle = useButtonContainerStyle(insets.bottom);

  const onNext = useCallback(() => {
    pager.current?.setPage(1);
  }, []);
  const onPrev = useCallback(() => {
    pager.current?.setPage(0);
  }, []);

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <BaseHeader title={`콘텐츠 만들기 (${position + 1}/2)`}/>
      <PagerView
        ref={pager}
        useNext={false}
        scrollEnabled={false}
        initialPage={0}
        onPageSelected={useCallback((event: NativeSyntheticEvent<OnPageSelectedEventData>) => setPosition(event.nativeEvent.position), [])}
        style={{ flex: 1 }}
      >
        <ScrollView key={0} collapsable={false} style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
          <ContentCreateInfoFragment/>
        </ScrollView>
        <View key={1} collapsable={false} style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}>
          <ContentCreateFragment onConfigPress={configRef.current?.present}/>
        </View>
      </PagerView>
      <View style={buttonContainerStyle}>
        <Button variant={'secondary'} style={{ flex: 1 }} onPress={onPrev}>
          이전
        </Button>
        <Space size={10}/>
        <Button style={{ flex: 1 }} onPress={onNext}>
          {position ? '생성' : '다음'}
        </Button>
      </View>
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
    </View>
  );
};
