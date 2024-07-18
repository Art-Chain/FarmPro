import { BottomSheetView } from '@gorhom/bottom-sheet';

import { Button, Card, Space, Typography } from '@/ui/common';
import { SelectCard } from '@/ui/SelectCard';

import ExpandMore from '@/assets/images/expand_more.svg';
import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';
import ShareIcon from '@/assets/images/share.svg';
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CheckBox from '@/ui/common/CheckBox.tsx';
import { Image, ImageStyle } from 'react-native';
import { ImageSourcePropType } from 'react-native/Libraries/Image/Image';
import Animated, {
  Easing, FadeInUp, FadeOutUp,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

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
  data?: ImageSourcePropType[];
  onExpand?: (expand?: boolean) => void;
}

export const ExportConfigFragment = ({ data = [], onExpand }: ExportConfigFragmentProps) => {
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

  return (
    <BottomSheetView style={containerStyle}>
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
        <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
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
            {data.map((source, index) => (
              <React.Fragment key={index}>
                <Space size={16}/>
                <CheckBox
                  align={'right'}
                  value={selected[index]}
                  onValueChange={(value) => setSelected((it) => it.map((it, i) => i === index ? value : it))}
                >
                  <Animated.View style={itemStyle}>
                    <Image source={source} style={imageStyle as ImageStyle}/>
                    <Space size={16}/>
                    <Typography>
                      {index + 1}페이지
                    </Typography>
                  </Animated.View>
                </CheckBox>
              </React.Fragment>
            ))}
          </Card>
        </Animated.View>
        <Space/>
      </>}
      <Button layout={LinearTransition.duration(300).easing(Easing.elastic(0.5))}>
        공유하기
        <Space size={10}/>
        <ShareIcon color={theme.colors.white.main}/>
      </Button>
    </BottomSheetView>
  );
};
