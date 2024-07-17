import React from 'react';
import { Image, ImageStyle, View } from 'react-native';

import { createStyle } from '@/features/utils';
import { Typography } from '@/ui/common';

import type { ImageSourcePropType } from 'react-native';

const containerStyle = createStyle({
  position: 'relative',
  borderRadius: 8,
  aspectRatio: 1,
  overflow: 'hidden',

  justifyContent: 'flex-end',
});
const imageStyle = createStyle({
  position: 'absolute',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});
const useTextContainerStyle = createStyle((_, color?: string) => ({
  padding: 12,
  paddingTop: 8,
  backgroundColor: color,
}));
const useBorderStyle = createStyle((theme) => ({
  position: 'absolute',
  top: 4,
  left: 4,
  right: 4,
  bottom: 4,

  borderRadius: 8,
  borderWidth: 1,
  borderColor: theme.colors.white.main,
  zIndex: 1,
}));

export interface ImageCardProps {
  source?: ImageSourcePropType;
  title?: string;
  subtitle?: string;
  color?: string;
}
export const ImageCard = ({ source, title, subtitle, color }: ImageCardProps) => {
  const textContainerStyle = useTextContainerStyle(color);
  const borderStyle = useBorderStyle();

  return (
    <View style={containerStyle}>
      <Image source={source} style={imageStyle as ImageStyle} />
      <View style={textContainerStyle}>
        <Typography variant={'caption'} color={(theme) => theme.white.main} weight={'bold'}>{subtitle}</Typography>
        <Typography variant={'body2'} color={(theme) => theme.white.main} weight={'bold'}>{title}</Typography>
      </View>
      <View style={borderStyle} />
    </View>
  )
};
