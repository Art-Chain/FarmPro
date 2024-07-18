import { Dimensions, Image, View } from 'react-native';
import { Button, Space, Typography } from '@/ui/common';
import React, { useCallback, useMemo, useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
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

import Strawberry from '@/assets/images/strawberry.png';
import Cucumber from '@/assets/images/cucumber.png';
import Paprika from '@/assets/images/paprika.png';
import { ContentPagination } from '@/pages/content/components';
import { Easing, useSharedValue } from 'react-native-reanimated';
import { Shadow } from '@/ui/Shadow.tsx';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ExportConfigFragment } from '@/pages/content/fragments';

const useButtonContainerStyle = createStyle((_, bottom = 0) => ({
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 20,
  paddingBottom: 20 + bottom,
}));
const commentContainerStyle = createStyle({
  marginHorizontal: 'auto',
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

const imageList = [Strawberry, Cucumber, Paprika];

export const ContentSharePage = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const size = useMemo(() => Dimensions.get('window').width - 64, []);
  const configRef = useRef<BottomSheetModal>(null);

  const position = useSharedValue(0);

  const buttonContainerStyle = useButtonContainerStyle(insets.bottom);
  const commentStyle = useCommentStyle();
  const containerStyle = useContainerStyle();

  return (
    <View style={{ width: '100%', height: '100%' }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 32 }}>
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
          style={containerStyle}
          offsetY={4}
          spreadRadius={16}
          shadowColor={'rgba(0, 0, 0, 0.2)'}
        >
          <View style={rowStyle}>
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
              <Image source={item} resizeMode={'cover'} style={{ width: '100%', height: '100%' }}/>
            )}
            onProgressChange={useCallback((_: number, progress: number) => position.value = progress, [])}
          />
          <View style={rowStyle}>
            <View style={paginationStyle}>
              <ContentPagination length={3} value={position}/>
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
              {`FarmPro 팜프로농장에도 싱그러운 딸기들이 주렁주렁 익어가고 있습니다 : ) 해마다 또다른 어려움에 힘든시간도 있었지만 이렇게 해냈네요! 도움 주신 모든 분들께감사의 말씀을 드립니다! 이번 한 해도 파이팅! 농장에도 싱그러운 딸기들이 주렁주렁 익어가고 있습니다 : ) 해마다 또다른 어려움에 힘든시간 이제 안녕입니다! 싱그러운 딸기들이 주렁주렁 익어가고 있습니다 : ) 해마다 또다른 어려움에 힘든시간 이제 안녕입니다!`}
            </ReadMore>
          </View>
          <Space size={8}/>
          <Button variant={'secondary'} style={{ margin: 'auto', paddingVertical: 10, paddingHorizontal: 16 }}>
            본문 복사하기
            <DocumentIcon color={theme.colors.white.text}/>
          </Button>
          <Space size={20}/>
        </Shadow>
      </ScrollView>
      <View style={buttonContainerStyle}>
        <Button variant={'secondary'} style={{ flex: 1 }}>
          이미지 다운로드
        </Button>
        <Space size={10}/>
        <Button style={{ flex: 1 }} onPress={() => configRef.current?.present()}>
          공유하기
          <Space size={10}/>
          <ShareIcon color={theme.colors.white.main}/>
        </Button>
      </View>
      <BottomSheetModal
        ref={configRef}
        index={0}
        snapPoints={[224 + insets.bottom, '80%']}
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
        <ExportConfigFragment
          data={imageList}
          onExpand={(expand) => {
            configRef.current?.snapToIndex(expand ? 1 : 0, { easing: Easing.elastic(0.5) });
          }}
        />
      </BottomSheetModal>
    </View>
  );
};
