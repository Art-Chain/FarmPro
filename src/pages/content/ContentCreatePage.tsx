import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeSyntheticEvent, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PagerView from 'react-native-pager-view';

import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';

import { ContentCreateFragment, ContentCreateInfoFragment } from './Fragment';

import type { OnPageSelectedEventData } from 'react-native-pager-view/src/specs/PagerViewNativeComponent';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));

export const ContentCreatePage = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const pager = useRef<PagerView>(null);
  const [position, setPosition] = useState(0);

  const buttonContainerStyle = useButtonContainerStyle(insets.bottom);

  useEffect(() => {
    navigation.setOptions({
      title: `콘텐츠 만들기(${position + 1}/2)`
    });
  }, [navigation, position]);

  const onNext = useCallback(() => {
    pager.current?.setPage(1);
  }, []);
  const onPrev = useCallback(() => {
    pager.current?.setPage(0);
  }, []);

  return (
    <View style={{ width: '100%', flex: 1 }}>
      <PagerView
        ref={pager}
        useNext={false}
        scrollEnabled={false}
        initialPage={0}
        onPageSelected={useCallback((event: NativeSyntheticEvent<OnPageSelectedEventData>) => setPosition(event.nativeEvent.position), [])}
        style={{ flex: 1 }}
      >
        <ScrollView key={0} style={{ paddingHorizontal: 20, paddingVertical: 24, flex: 1, }}>
          <ContentCreateInfoFragment/>
        </ScrollView>

        <ScrollView key={1} style={{ paddingHorizontal: 20, paddingVertical: 24, flex: 1, }}>
          <ContentCreateFragment/>
        </ScrollView>
      </PagerView>
      <View style={buttonContainerStyle}>
        <Button variant={'secondary'} style={{ flex: 1 }} onPress={onPrev}>
          이전
        </Button>
        <Space size={10}/>
        <Button style={{ flex: 1 }} onPress={onNext}>
          다음
        </Button>
      </View>
    </View>
  );
};
