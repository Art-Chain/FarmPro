import LottieView from 'lottie-react-native';
import { View } from 'react-native';

import { createStyle } from '@/features/utils';
import { Space, Typography } from '@/ui/common';

import LoadingAnimation from '@/assets/animations/loading.json';
import { useEffect, useMemo } from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { ContentForm, ContentFormSchema } from '@/features/scheme';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/api/image.ts';
import { createContent } from '@/api';
import { RootStackParamList } from '@/pages/types.ts';
import { createLocalContent } from '@/api/local/content.ts';

const containerStyle = createStyle({
  width: '100%',
  height: '100%',

  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const ContentLoadingPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const rawForm = (route.params as RootStackParamList['contentLoading'])?.form;
  const fontFamily = (route.params as RootStackParamList['contentLoading'])?.fontFamily;
  const projectId = (route.params as RootStackParamList['contentLoading'])?.projectId;

  const mutation = useMutation({
    mutationFn: async (form: ContentForm) => {
      const uploadedImages = await Promise.all(
        [form.cards.root.url, ...form.cards.others.map((card) => card.url)]
          .map(async (url) => {
            if (!url) return null;
            return uploadImage(`img-${Date.now()}`, 'jpg', url);
          }),
      );

      const newForm: ContentForm = {
        ...form,
        cards: {
          root: {
            ...form.cards.root,
            url: uploadedImages[0]?.urls.url,
          },
          others: form.cards.others.map((card, index) => ({
            ...card,
            url: uploadedImages[index + 1]?.urls.url,
          })),
        },
      };

      const result = await createContent(newForm);
      if (projectId) await createLocalContent(projectId, result);

      return result;
    },
  });

  const form = useMemo(() => {
    const result = ContentFormSchema.safeParse(rawForm);
    if (result.success) return result.data;

    return null;
  }, [rawForm]);

  useEffect(() => {
    if (!form) {
      navigation.goBack();
      return;
    }

    mutation.mutate(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, mutation.mutate, navigation]);

  useEffect(() => {
    if (mutation.data) {
      navigation.dispatch(StackActions.replace('contentShare', { content: mutation.data, fontFamily }));
    }

    if (mutation.error) {
      console.log('error', mutation.error, mutation.error?.stack);
      navigation.goBack();
    }
  }, [fontFamily, mutation.data, mutation.error, navigation]);

  return (
    <View style={containerStyle}>
      <Typography variant={'head2'}>
        콘텐츠를 생성하는 중이에요!
      </Typography>
      <Space size={12}/>
      <Typography align={'center'} variant={'body1'} color={(colors) => colors.palette.gray[500]}>
        콘텐츠의 길이에 따라 7초-40초 정도{'\n'}
        소요될 수 있습니다.
      </Typography>
      <Space size={24}/>
      <LottieView
        source={LoadingAnimation}
        style={{ width: 80, height: 80 }}
        autoPlay
        loop
      />
    </View>
  );
};
