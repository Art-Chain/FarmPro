import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Image, ImageSourcePropType, Text, View, ViewProps } from 'react-native';
import ViewShot from 'react-native-view-shot';
import ImageColors from 'react-native-image-colors';

import { createStyle } from '@/features/utils';

import TemplateCalm from '@/assets/images/template/template_calm.svg';
import TemplateFancy from '@/assets/images/template/template_fancy.svg';
import TemplateModern from '@/assets/images/template/template_modern.svg';
import TemplateEmotional from '@/assets/images/template/template_emotional.svg';
import TemplateHumorous from '@/assets/images/template/template_humorous.svg';
import { useTheme } from '@/features/themes';
import Color from 'color';

export const containerStyle = createStyle({
  position: 'relative',
  aspectRatio: 1,
});
const templateStyle = createStyle({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
});
const useTextStyle = createStyle((_, height: number, color: string, fontFamily?: string) => ({
  position: 'absolute',
  left: '20%',
  width: '60%',
  height: 'auto',

  color,
  fontSize: 80,
  fontFamily,
  textAlign: 'center',

  transform: [
    {
      translateY: -1 * height,
    },
  ],
}));

export interface ImageRendererMethods {
  getImage: () => Promise<string>;
}

export interface ImageRendererProps extends ViewProps {
  source?: ImageSourcePropType;
  templateType?: 'calm' | 'fancy' | 'modern' | 'emotional' | 'humorous';
  fontFamily?: string;
  content?: string;
}

export const ImageRenderer = React.forwardRef<ImageRendererMethods, ImageRendererProps>(({
  source,
  templateType,
  fontFamily,
  content,
  ...props
}, fRef) => {
  const theme = useTheme();

  const ref = useRef<ViewShot>(null);
  const [color, setColor] = useState(theme.colors.primary.main);
  const [height, setHeight] = useState(0);

  const textColor = useMemo(() => Color(color).isLight() ? theme.colors.white.text : theme.colors.black.text, [color, theme.colors.black.text, theme.colors.white.text]);
  const TemplateComponent = useMemo(() => {
    if (templateType === 'calm') return TemplateCalm;
    if (templateType === 'fancy') return TemplateFancy;
    if (templateType === 'modern') return TemplateModern;
    if (templateType === 'emotional') return TemplateEmotional;
    if (templateType === 'humorous') return TemplateHumorous;

    return View;
  }, [templateType]);
  const templateTop = useMemo(() => {
    if (templateType === 'calm') return '82%';
    if (templateType === 'fancy') return '25%';
    if (templateType === 'modern') return '36%';
    if (templateType === 'emotional') return '37%';
    if (templateType === 'humorous') return '85%';

    return undefined;
  }, [templateType]);

  const textStyle = useTextStyle(height / 2, textColor, fontFamily);

  useEffect(() => {
    void ImageColors.getColors(source as string, {
      fallback: theme.colors.primary.main,
      cache: true,
      key: source as string,
    }).then((result) => {
      if (result.platform === 'ios') setColor(result.detail);
      if (result.platform === 'android') setColor(result.dominant ?? theme.colors.primary.main);
    });
  }, [source, theme.colors.primary.main]);

  useImperativeHandle(fRef, () => ({
    getImage: () => ref.current?.capture?.() ?? Promise.reject('Cannot capture image.'),
  }), [ref]);

  return (
    <ViewShot ref={ref}>
      <View {...props} style={[props.style, containerStyle]}>
        <Image
          source={source}
          resizeMode={'cover'}
          style={{ width: '100%', height: '100%' }}
        />
        <TemplateComponent width={'100%'} height={'100%'} style={templateStyle} color={color}/>
        <Text
          adjustsFontSizeToFit
          numberOfLines={2}
          style={[textStyle, { fontFamily, top: templateTop }]}
          onLayout={(event) => setHeight(event.nativeEvent.layout.height)}
        >
          {content}
        </Text>
      </View>
    </ViewShot>
  );
});
