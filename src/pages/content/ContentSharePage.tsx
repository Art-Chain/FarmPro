import { Dimensions, Image, ImageStyle, View } from 'react-native';
import { Button, Space, Typography } from '@/ui/common';
import React, { useCallback, useMemo, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

import image1 from '@/assets/images/mock/image1.png';
import image2 from '@/assets/images/mock/image2.png';
import image3 from '@/assets/images/mock/image3.png';
import image4 from '@/assets/images/mock/image4.png';
import image5 from '@/assets/images/mock/image5.png';
import { ContentPagination } from '@/pages/content/components';
import { Easing, useSharedValue } from 'react-native-reanimated';
import { Shadow } from '@/ui/Shadow.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ExportConfigFragment } from '@/pages/content/fragments';
import { AppShell, BottomSheetBackground } from '@/pages/components';

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

const imageList = [image1, image2, image3, image4, image5];

export const ContentSharePage = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const size = useMemo(() => Dimensions.get('window').width - 64, []);
  const configRef = useRef<BottomSheetModal>(null);

  const position = useSharedValue(0);

  const buttonContainerStyle = useButtonContainerStyle(0);
  const commentStyle = useCommentStyle();
  const containerStyle = useContainerStyle();

  return (
    <AppShell
      showBorder
      showLogo={false}
      align={'center'}
      title={'콘텐츠 생성 완료'}
      footer={
        <View style={buttonContainerStyle}>
          <Button variant={'secondary'} style={{ flex: 1 }}>
            이미지 다운로드
          </Button>
          <Space size={10}/>
          <Button
            style={{ flex: 1 }}
            onPress={() => configRef.current?.present()}
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
            <Image source={imageList[0]} style={profileStyle as ImageStyle}/>
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
            data={imageList}
            renderItem={({ item }) => (
              <Image
                source={item}
                resizeMode={'cover'}
                style={{ width: '100%', height: '100%' }}
              />
            )}
            onProgressChange={useCallback((_: number, progress: number) => position.value = progress, [])}
          />
          <View style={rowStyle}>
            <View style={paginationStyle}>
              <ContentPagination length={imageList.length} value={position}/>
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
              {`제주 감귤의 상큼함을 팜프로농장에서 직접 느껴보세요! 🍊 저희 농장에서 자란 고당도의 제주 감귤은 오렌지 품종 중에서도 특히 맛있답니다. 여러분의 입맛을 사로잡을 감귤, 지금 만나보세요!

팜프로농장에서는 직배송 서비스를 제공하고 있어요. 신선한 감귤을 집 앞까지 빠르게 배송해 드립니다. 🍊📦 또한, 처음 구매하시는 분들을 위해 맛보기 서비스도 준비했답니다. 감귤의 풍미를 직접 경험해보세요!

이 게시글을 보고 연락해주시는 분들께는 특별 할인 쿠폰을 드려요! 🎟️ 감귤의 달콤한 맛과 함께 더 큰 혜택을 누리세요. 뿐만 아니라, 저희 감귤은 비타민 C가 풍부해 건강에도 아주 좋아요. 🍊💪

주말엔 농장으로 놀러 오셔서 직접 감귤을 따는 체험도 해보세요! 여러분의 방문을 기다리고 있답니다. 늘 함께 해주셔서 감사합니다. 앞으로도 팜프로농장과 함께 해주세요! 이번 한 해도 모두 파이팅! 💪🍊✨

팜프로농장 : (+82) 064-XXX-XXXX
- 평일 09:00 ~ 19:00 (주말, 공휴일 휴무)

이 게시글은 FarmPro의 AI 지원으로 작성되었어요. `}
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
      <BottomSheetModal
        ref={configRef}
        index={0}
        snapPoints={[224 + insets.bottom, '80%']}
        backgroundComponent={BottomSheetBackground}
      >
        <ExportConfigFragment
          data={imageList.map((source) => Image.resolveAssetSource(source).uri)}
          onExpand={(expand) => {
            configRef.current?.snapToIndex(expand ? 1 : 0, { easing: Easing.elastic(0.5) });
          }}
        />
      </BottomSheetModal>
    </AppShell>
  );
};
