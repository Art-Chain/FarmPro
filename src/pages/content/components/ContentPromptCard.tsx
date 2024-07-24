import { useCallback, useState } from 'react';
import { Image, ImageStyle, View } from 'react-native';
import Svg, { Defs, Pattern, Rect } from 'react-native-svg';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { Asset, launchImageLibrary } from 'react-native-image-picker';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Easing,
  FadeInDown,
  FadeOutDown,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  ZoomIn,
  ZoomOut
} from 'react-native-reanimated';

import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';
import { Space, TextInput, Typography } from '@/ui/common';

import Photo from '@/assets/images/photo.svg';
import ReloadIcon from '@/assets/images/reload.svg';
import DeleteIcon from '@/assets/images/delete.svg';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const useContainerStyle = createStyle((theme) => ({
  position: 'relative',
  width: '100%',
  padding: 16,
  borderRadius: 16,
  aspectRatio: 1,

  overflow: 'hidden',
  borderColor: theme.colors.palette.gray[300],
  borderWidth: 2,
}));
const useCheckPatternStyle = createStyle((_, size = 1000) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: size,
  height: size,
}));
const useImageContainerStyle = createStyle((theme, menuOpen = false) => ({
  width: 'auto',
  margin: 'auto',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'stretch',
  paddingHorizontal: menuOpen ? 4 : 16,
  paddingVertical: menuOpen ? 8 : 12,
  borderRadius: menuOpen ? 12 : 8,
  borderColor: theme.colors.palette.gray[300],
  borderWidth: menuOpen ? 0 : 2,
  overflow: 'hidden',
}));
const blurStyle = createStyle({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 6,
});
const imageStyle = createStyle({
  width: '100%',
  height: '100%',
});
const menuItemStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: 12,
});
const titleStyle = createStyle({
  height: 24,
});
const keywordStyle = createStyle({
  height: 60,
});
const captionStyle = createStyle({
  position: 'absolute',
  right: 8,
  bottom: 8,
});
const useRemoveButtonStyle = createStyle((theme) => ({
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: theme.colors.black.main,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'flex-end',
}));

export interface PromptData {
  title?: string;
  keywords: string[];
  image?: Asset;
}

export interface ContentPromptCardProps {
  showTitle?: boolean;
  onChange?: (data: PromptData) => void;
  onRemove?: () => void;
}

export const ContentPromptCard = ({ showTitle, onChange, onRemove }: ContentPromptCardProps) => {
  const theme = useTheme();
  const frames = useSafeAreaFrame();

  const pressed = useSharedValue(0);

  const [title, setTitle] = useState('');
  const [keywords, setKeywords] = useState('');
  const [image, setImage] = useState<Asset | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const checkPatternStyle = useCheckPatternStyle(frames.width);
  const containerStyle = useContainerStyle();
  const imageContainerStyle = useImageContainerStyle(menuOpen);
  const removeButtonStyle = useRemoveButtonStyle();

  const notifyChange = useCallback(() => {
    setTimeout(() => {
      if (onChange) {
        onChange({
          title,
          keywords: keywords.split(/,\s*/),
          image: image ?? undefined,
        });
      }
    }, 0);
  }, [image, keywords, onChange, title]);
  const onImage = useCallback(async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (result.assets?.[0]) {
      setImage(result.assets[0]);
    }
    notifyChange();
  }, [notifyChange]);

  const tap = Gesture.Tap()
    .onEnd(() => {
      if (image) {
        runOnJS(setMenuOpen)(true);
      } else {
        runOnJS(onImage)();
      }
    });
  const outsideTap = Gesture.Tap()
    .onEnd(() => {
      if (menuOpen) {
        runOnJS(setMenuOpen)(false);
      }
    });
  const restartTap = Gesture.Tap()
    .onEnd(() => {
      runOnJS(onImage)();
      runOnJS(setMenuOpen)(false);
    });
  const deleteTap = Gesture.Tap()
    .onEnd(() => {
      runOnJS(setImage)(null);
      runOnJS(setMenuOpen)(false);
      runOnJS(notifyChange)();
    });
  const removeTap = Gesture.Tap()
    .onBegin(() => {
      pressed.value = withTiming(1, { easing: Easing.elastic(1) });
    })
    .onEnd(() => {
      if (onRemove) runOnJS(onRemove)();
    })
    .onFinalize(() => {
      pressed.value = withTiming(0, { easing: Easing.elastic(1) });
    });

  const animatedRemoveButtonStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: 1 - pressed.value * 0.1,
      },
    ],
  }));

  return (
    <GestureDetector gesture={outsideTap}>
      <Animated.View
        entering={ZoomIn}
        exiting={ZoomOut}
        layout={LinearTransition.duration(300).easing(Easing.elastic(0.5))}
        style={containerStyle}
      >
        <Svg style={checkPatternStyle}>
          <Defs>
            <Pattern
              id={'pattern'}
              patternUnits={'userSpaceOnUse'}
              x={'0'}
              y={'0'}
              width={'50'}
              height={'50'}
              viewBox={'0 0 100 100'}
            >
              <Rect x={'0'} y={'0'} width={'50'} height={'50'} fill={theme.colors.palette.gray[100]}/>
              <Rect x={'50'} y={'0'} width={'50'} height={'50'} fill={theme.colors.palette.gray[200]}/>
              <Rect x={'0'} y={'50'} width={'50'} height={'50'} fill={theme.colors.palette.gray[200]}/>
              <Rect x={'50'} y={'50'} width={'50'} height={'50'} fill={theme.colors.palette.gray[100]}/>
            </Pattern>
          </Defs>
          <Rect fill={'url(#pattern)'} x={'0'} y={'0'} width={'100%'} height={'100%'}/>
        </Svg>
        {image && (
          <View style={blurStyle}>
            <Image source={image} style={imageStyle as ImageStyle}/>
          </View>
        )}
        {showTitle && (
          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder={'제목의 키워드나 문장을 입력하세요.'}
            variant={'body1'}
            textStyle={titleStyle}
            onBlur={notifyChange}
          >
            <BlurView
              style={blurStyle}
              overlayColor={'white'}
              blurType={'xlight'}
              blurAmount={24}
              reducedTransparencyFallbackColor={'white'}
            />
            <Typography variant={'caption'} color={(colors) => colors.palette.gray[400]} style={captionStyle}>
              {title.length} / 50
            </Typography>
          </TextInput>
        )}
        {!showTitle && (
          <GestureDetector gesture={removeTap}>
            <Animated.View style={[removeButtonStyle, animatedRemoveButtonStyle]}>
              <DeleteIcon color={theme.colors.black.text}/>
            </Animated.View>
          </GestureDetector>
        )}
        <Space/>
        <GestureDetector gesture={tap}>
          <Animated.View
            layout={LinearTransition.duration(300).easing(Easing.elastic(0.5))}
            style={imageContainerStyle}
          >
            <AnimatedBlurView
              layout={LinearTransition.duration(300).easing(Easing.elastic(0.5))}
              style={blurStyle}
              blurType={'xlight'}
              blurAmount={24}
            />
            {!menuOpen && image && (
              <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
                <Photo color={theme.colors.palette.gray[400]}/>
              </Animated.View>
            )}
            {menuOpen && <>
              <GestureDetector gesture={restartTap}>
                <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={menuItemStyle}>
                  <ReloadIcon width={20} height={20} color={theme.colors.black.main}/>
                  <Space size={8}/>
                  <Typography>
                    이미지 다시 선택
                  </Typography>
                </Animated.View>
              </GestureDetector>
              <GestureDetector gesture={deleteTap}>
                <Animated.View entering={FadeInDown} exiting={FadeOutDown} style={menuItemStyle}>
                  <DeleteIcon width={20} height={20} color={theme.colors.black.main}/>
                  <Space size={8}/>
                  <Typography>
                    이미지 삭제
                  </Typography>
                </Animated.View>
              </GestureDetector>
            </>}
            {!image && <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <Animated.View entering={FadeInDown} exiting={FadeOutDown}>
                <Photo color={theme.colors.palette.gray[400]}/>
              </Animated.View>
              <Space size={10}/>
              <Typography variant={'subtitle1'} color={(colors) => colors.palette.gray[400]}>
                이미지 업로드
              </Typography>
            </View>}
            {!image && (<>
                <Space size={10}/>
                <Typography variant={'caption'} align={'center'} color={(colors) => colors.palette.gray[400]}>
                  이미지를 업로드 하지 않은 장표만{'\n'}
                  AI 이미지가 생성됩니다.
                </Typography>
              </>
            )}
          </Animated.View>
        </GestureDetector>
        <Space/>
        <TextInput
          multiline
          variant={'body1'}
          placeholder={'카드뉴스 내용의 키워드나 문장을 입력하세요.\n' +
            '예) 1200평, 최첨단, 스마트팜, 고품질, 고당도 딸기, 과즙 팡팡'}
          textStyle={keywordStyle}
          value={keywords}
          onChangeText={setKeywords}
          onBlur={notifyChange}
        >
          <BlurView
            style={blurStyle}
            overlayColor={'white'}
            blurType={'xlight'}
            blurAmount={24}
            reducedTransparencyFallbackColor={'white'}
          />
          <Typography variant={'caption'} color={(colors) => colors.palette.gray[400]} style={captionStyle}>
            {keywords.length} / 200
          </Typography>
        </TextInput>
      </Animated.View>
    </GestureDetector>
  );
};
