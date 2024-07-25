import { Dimensions, Image, ImageStyle, View } from 'react-native';
import { Button, Space, Typography } from '@/ui/common';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import Svg, { Path } from 'react-native-svg';
import Carousel from 'react-native-reanimated-carousel';
import ReadMore from '@fawazahmed/react-native-read-more';

import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

import HeartIcon from '@/assets/images/heart.svg';
import CommentIcon from '@/assets/images/comment.svg';
import AirplaneIcon from '@/assets/images/airplane.svg';
import BookmarkIcon from '@/assets/images/bookmark.svg';
import DocumentIcon from '@/assets/images/document.svg';
import ShareIcon from '@/assets/images/share.svg';
import StarEffect from '@/assets/images/star_effect.svg';

import { ContentPagination, ImageRenderer, ImageRendererMethods } from '@/pages/content/components';
import { Easing, useSharedValue } from 'react-native-reanimated';
import { Shadow } from '@/ui/Shadow.tsx';
import { ExportConfigFragment } from '@/pages/content/fragments';
import { AppShell, BottomSheetModal, LoadingView } from '@/pages/components';
import { useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/pages/types';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));
const commentContainerStyle = createStyle({
  marginHorizontal: 'auto',
  zIndex: 0,
});
const useCommentStyle = createStyle((theme) => ({
  position: 'relative',

  backgroundColor: theme.colors.primary.main,
  borderRadius: 16,
  paddingHorizontal: 10,
  paddingVertical: 4,

  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}));
const commentTailStyle = createStyle({
  position: 'absolute',
  bottom: -6,
  left: '50%',
});
const useContainerStyle = createStyle((theme) => ({
  backgroundColor: theme.colors.palette.gray[50],
  borderColor: theme.colors.palette.gray[200],
  borderWidth: 1,
  borderRadius: 16,
}));
const rowStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 12,
});
const paginationStyle = createStyle({
  position: 'absolute',
  top: -24,
  left: '50%',
  marginHorizontal: 'auto',
});
const profileStyle = createStyle({
  width: 24,
  height: 24,
  borderRadius: 12,
  resizeMode: 'cover',
});

export const ContentSharePage = () => {
  const theme = useTheme();
  const route = useRoute();
  const size = useMemo(() => Dimensions.get('window').width - 64, []);

  const content = (route.params as RootStackParamList['contentShare'])?.content;
  const fontFamily = (route.params as RootStackParamList['contentShare'])?.fontFamily;
  const configRef = useRef<BottomSheetModal>(null);

  const position = useSharedValue(0);
  const refs = useRef<ImageRendererMethods[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const buttonContainerStyle = useButtonContainerStyle(0);
  const commentStyle = useCommentStyle();
  const containerStyle = useContainerStyle();

  const onShare = async () => {
    setLoading(true);
    const newImages = await Promise.all(refs.current.map(async (ref) => {
      return await ref.getImage();
    }));
    setLoading(false);

    setImages(newImages);
    configRef.current?.present();
  };

  return (
    <AppShell
      showBorder
      showLogo={false}
      align={'center'}
      title={'콘텐츠 생성 완료'}
      showBack
      footer={
        <View style={buttonContainerStyle}>
          <Button variant={'secondary'} style={{ flex: 1 }}>
            이미지 다운로드
          </Button>
          <Space size={10}/>
          <Button
            style={{ flex: 1 }}
            onPress={onShare}
            icon={<ShareIcon color={theme.colors.white.main}/>}
          >
            <Typography>
              공유하기
            </Typography>
            <Space size={10}/>
          </Button>
        </View>
      }
      contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 32 }}
    >
      <View style={commentContainerStyle}>
        <View style={commentStyle}>
          <StarEffect color={theme.colors.primary.text}/>
          <Space size={4}/>
          <Typography color={(colors) => colors.primary.text}>
            공유하여 홍보해보세요!
          </Typography>
          <Svg width={12} height={6} viewBox={'0 0 20 10'} style={commentTailStyle}>
            <Path d={'M0 0 L20 0 L10 10 Z'} fill={theme.colors.primary.main}/>
          </Svg>
        </View>
      </View>
      <Space size={16}/>
      <Shadow
        offsetY={4}
        spreadRadius={0}
        shadowRadius={16}
        shadowColor={'rgba(0, 0, 0, 0.1)'}
      >
        <View style={containerStyle}>
          <View style={rowStyle}>
            <Image source={{ uri: content?.images?.images?.[0].imageUrl }} style={profileStyle as ImageStyle}/>
            <Space size={8}/>
            <Typography variant={'subtitle2'}>
              FarmPro
            </Typography>
          </View>
          <Carousel
            loop={false}
            width={size}
            height={size}
            style={{ width: size, height: size }}
            data={content?.images?.images ?? []}
            renderItem={({ item, index }) => (
              <ImageRenderer
                ref={(ref) => {
                  if (ref) refs.current[index] = ref;
                }}
                templateType={content?.cardStyle}
                source={{ uri: item.imageUrl }}
                style={{ width: '100%', height: '100%' }}
                content={item.title ?? ''}
                fontFamily={fontFamily}
              />
            )}
            onProgressChange={useCallback((_: number, progress: number) => position.value = progress, [])}
          />
          <View style={rowStyle}>
            <View style={paginationStyle}>
              <ContentPagination length={content?.images?.images?.length ?? 0} value={position}/>
            </View>
            <HeartIcon color={theme.colors.black.main} width={18} height={18}/>
            <Space size={12}/>
            <CommentIcon color={theme.colors.black.main} width={18} height={18}/>
            <Space size={12}/>
            <AirplaneIcon color={theme.colors.black.main} width={18} height={18}/>
            <Space/>
            <BookmarkIcon color={theme.colors.black.main} width={18} height={18}/>
          </View>
          <Space size={16}/>
          <View style={{ paddingHorizontal: 16 }}>
            <ReadMore
              animate
              expandOnly
              numberOfLines={3}
              seeMoreText={'더보기'}
              seeMoreStyle={{
                color: theme.colors.palette.gray[500],
              }}
              seeMoreOverlapCount={3}
              customTextComponent={Typography as unknown as React.ReactNode}
            >
              {content?.mainText ?? `내용 없음`}
            </ReadMore>
          </View>
          <Space size={8}/>
          <Button variant={'secondary'} style={{ margin: 'auto', paddingVertical: 10, paddingHorizontal: 16 }}>
            본문 복사하기
            <DocumentIcon color={theme.colors.white.text}/>
          </Button>
          <Space size={20}/>
        </View>
      </Shadow>
      <Space size={20}/>
      <ExportConfigFragment
        ref={configRef}
        message={content?.mainText ?? ''}
        data={images}
        onExpand={(expand) => {
          configRef.current?.snapToIndex(expand ? 1 : 0, { easing: Easing.elastic(0.5) });
        }}
      />
      <LoadingView loading={loading} />
    </AppShell>
  );
};
