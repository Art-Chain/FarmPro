import React, { useCallback, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Animated, { SlideInLeft, SlideInRight, SlideOutLeft, SlideOutRight } from 'react-native-reanimated';

import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { AppShell } from '@/pages/components';

import {
  AIConfigFragment,
  ContentCreateFragment,
  ContentCreateInfoFragment,
} from './fragments';
import { useNavigation } from '@react-navigation/native';
import {
  CardStyle,
  ContentForm,
  ContentFormSchema,
  ContentPurpose,
  ContentType,
  Crop,
  ParlanceStyle
} from '@/features/scheme';
import { fetchProject } from '@/api/local';
import { PromptData } from '@/pages/content/components';
import RNFetchBlob from 'rn-fetch-blob';

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
  const [form, setForm] = useState<Partial<ContentForm>>({});

  const buttonContainerStyle = useButtonContainerStyle(0);

  const onNext = useCallback(() => {
    if (position === 0) setPosition(1);
    else configRef.current?.present();
  }, [position]);
  const onPrev = useCallback(() => {
    setPosition(0);
  }, []);

  const onInfoChange = useCallback(async (projectId: number | null, crop: Crop, contentType: ContentType, contentPurpose: ContentPurpose) => {
    let projectInfo: ContentForm['projectInfo'] = null;

    if (projectId) {
      const project = await fetchProject(projectId);

      if (project) {
        projectInfo = {
          cropCategoryName: crop,
          cropDetailName: project.name,
          growMethod: project.method,
          plantDescription: project.description,
          cropPrice: project.price,
          plantContactInfo: project.outlink,
        };
      }
    }

    setForm((prev) => ({
      ...prev,
      projectInfo,
      crops: [{ name: crop.name }],
      contentType,
      contentPurpose,
    }));
  }, []);
  const onFormChange = useCallback(async (cards: PromptData[], mainText: string) => {
    const root: ContentForm['cards']['root'] = {
      title: cards[0]?.title ?? '',
      keywords: cards[0]?.keywords.join(', ') ?? '',
    };
    if (cards[0]?.image) {
      root.url = await convertToBase64(Image.resolveAssetSource(cards[0].image).uri);
    }
    const others = await Promise.all(cards.slice(1).map(async (it) => {
      let url: string | undefined = undefined;
      if (it.image) url = await convertToBase64(Image.resolveAssetSource(it.image).uri);

      return {
        keywords: it.keywords.join(', '),
        url,
      };
    }));

    setForm((prev) => ({
      ...prev,
      cards: {
        root,
        others,
      },
      mainText,
    }));
  }, []);

  const convertToBase64 = async (uri: string) => {
    const response = await RNFetchBlob.config({ fileCache: true }).fetch('GET', uri);
    const path = response.path();
    const data = await response.readFile('base64') as string;

    await RNFetchBlob.fs.unlink(path);

    return `data:image/png;base64,${data}`;
  };

  const onSubmit = useCallback((parlanceStyle: ParlanceStyle, cardStyle: CardStyle, fontFamily: string) => {
    configRef.current?.close();
    const body = {
      ...form,
      parlanceStyle,
      cardStyle,
    };
    const parsed = ContentFormSchema.safeParse(body);
    console.log('submit', parsed, JSON.stringify(body, null, 2));
    if (parsed.success) {
      navigation.navigate('contentLoading', { form: parsed.data, fontFamily });
    }
  }, [form, navigation]);

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
          <ContentCreateInfoFragment
            onChange={onInfoChange}
          />
        </Animated.View>
      )}
      {position === 1 && (
        <Animated.View
          entering={SlideInRight}
          exiting={SlideOutRight}
          collapsable={false}
          style={{ paddingHorizontal: 20, paddingTop: 24, flex: 1 }}
        >
          <ContentCreateFragment
            onChange={onFormChange}
          />
        </Animated.View>
      )}
      <AIConfigFragment
        ref={configRef}
        key={0}
        onCancel={configRef.current?.close}
        onSubmit={onSubmit}
      />
    </AppShell>
  );
};
