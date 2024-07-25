import { AppShell } from '@/pages/components';
import { Shadow } from '@/ui/Shadow.tsx';
import { Dimensions, Image, ImageStyle, View } from 'react-native';
import { Space, Typography } from '@/ui/common';
import Carousel from 'react-native-reanimated-carousel';
import { ContentPagination } from '@/pages/content/components';
import React, { useCallback, useMemo } from 'react';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/pages/types';
import { useSharedValue } from 'react-native-reanimated';
import { createStyle } from '@/features/utils';

const useImageStyle = createStyle((theme) => ({
  width: '100%',
  height: '100%',
  borderRadius: 12,
  backgroundColor: theme.colors.white.surface,
}));

export const ContentViewPage = () => {
  const route = useRoute();

  const size = useMemo(() => Dimensions.get('window').width - 40, []);
  const content = (route.params as RootStackParamList['contentView'])?.content;

  const position = useSharedValue(0);

  const imageStyle = useImageStyle();

  return (
    <AppShell
      showBack
      showBorder
      showLogo={false}
      title={content?.title ?? '제목 없음'}
      align={'center'}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 24 }}
    >
      <View>
        <Carousel
          loop={false}
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            overflow: 'visible',
          }}
          data={content?.images?.images ?? []}
          renderItem={({ item }) => (
            <Shadow
              borderBottomLeftRadius={12}
              borderBottomRightRadius={12}
              borderTopLeftRadius={12}
              borderTopRightRadius={12}
              offsetY={4}
              spreadRadius={0}
              shadowRadius={16}
              shadowColor={'rgba(0, 0, 0, 0.2)'}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={imageStyle as ImageStyle}
              />
            </Shadow>
          )}
          onProgressChange={useCallback((_: number, progress: number) => position.value = progress, [position])}
          mode={'parallax'}
          modeConfig={{
            parallaxScrollingScale: 0.8,
            parallaxScrollingOffset: 100,
          }}
        />

      </View>
      <Space size={8}/>
      <ContentPagination
        length={content?.images?.images?.length ?? 0}
        value={position}
      />
      <Space size={16}/>
      <View style={{ paddingHorizontal: 16 }}>
        <Typography>

          {content?.mainText ?? '내용 없음'}
        </Typography>
      </View>
    </AppShell>
  );
};
