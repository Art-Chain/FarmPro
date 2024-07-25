import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image, ImageStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import Share, { Social } from 'react-native-share';

import { Button, Card, CheckBox, Space, Typography } from '@/ui/common';
import { SelectCard } from '@/ui/SelectCard';
import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

import ExpandMore from '@/assets/images/expand_more.svg';
import ShareIcon from '@/assets/images/share.svg';
import { BottomSheetModal } from '@/pages/components';

const useContainerStyle = createStyle((_, expand = false, bottom = 0) => ({
  width: '100%',
  flex: expand ? 1 : undefined,
  padding: 16,
  paddingBottom: 16 + bottom
}));
const selectStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
});
const imageStyle = createStyle({
  width: 56,
  height: 56,
  borderRadius: 6,
  resizeMode: 'cover',
});
const itemStyle = createStyle({
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

interface ExportConfigFragmentProps {
  message?: string;
  data?: string[];
  onExpand?: (expand?: boolean) => void;
}

export const ExportConfigFragment = React.forwardRef<BottomSheetModal, ExportConfigFragmentProps>(({
  data = [],
  onExpand
}, ref) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const [expand, setExpand] = useState(false);
  const [selected, setSelected] = useState<boolean[]>(Array.from({ length: data.length }, () => false));
  const value = useSharedValue(0);

  const containerStyle = useContainerStyle(expand, insets.bottom);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${value.value * 180}deg`
      }
    ]
  }), [expand]);

  useEffect(() => {
    value.value = withTiming(expand ? 1 : 0, { easing: Easing.elastic(0.5) });
    onExpand?.(expand);
  }, [expand, onExpand, value]);

  const onShare = async () => {
    const urls = data.filter((_, index) => selected[index]);

    if (urls.length === 1) {
      await Share.shareSingle({
        title: '콘텐츠 공유하기',
        // type: 'image/*',
        url: urls[0],
        social: Social.Instagram,
      }).catch(() => null);
    } else {
      await Share.open({
        title: '콘텐츠 공유하기',
        message: 'AI가 생성한 카드뉴스를 공유합니다.',
        urls,
      }).catch(() => null);
    }
  };

  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      title={'공유하기'}
      snapPoints={['80%']}
      enableDynamicSizing
      contentContainerStyle={containerStyle}
      footerContentStyle={{ padding: 16 }}
      footer={
        <Button
          onPress={onShare}
          icon={<ShareIcon color={theme.colors.white.main}/>}
          style={{ margin: 16 }}
        >
          공유하기
          <Space size={10}/>
        </Button>}
    >
      <Typography variant={'subtitle1'}>
        페이지 선택
      </Typography>
      <Space size={12}/>
      <SelectCard
        style={selectStyle}
        onPress={useCallback(() => setExpand((it) => !it), [])}
      >
        <Typography variant={'body1'}>
          {selected.every(Boolean) ? '모든 페이지' : selected.filter(Boolean).length + '개 선택됨'}
        </Typography>
        <Animated.View style={animatedIconStyle}>
          <ExpandMore color={theme.colors.black.main}/>
        </Animated.View>
      </SelectCard>
      <Space size={24}/>
      {expand && <>
        <Card>
          <CheckBox
            value={selected.every(Boolean)}
            onValueChange={() => {
              const value = !selected.every(Boolean);
              setSelected(Array.from({ length: data.length }, () => value));
            }}
          >
            <Typography>
              모든 페이지
            </Typography>
          </CheckBox>
          {data.map((uri, index) => (
            <React.Fragment key={index}>
              <Space size={16}/>
              <CheckBox
                align={'right'}
                value={selected[index]}
                onValueChange={(value) => setSelected((it) => it.map((it, i) => i === index ? value : it))}
              >
                <Animated.View style={itemStyle}>
                  <Image source={{ uri }} style={imageStyle as ImageStyle}/>
                  <Space size={16}/>
                  <Typography>
                    {index + 1}페이지
                  </Typography>
                </Animated.View>
              </CheckBox>
            </React.Fragment>
          ))}
        </Card>
      </>}
    </BottomSheetModal>
  );
});
