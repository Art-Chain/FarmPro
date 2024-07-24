import { Card, Space, Typography } from '@/ui/common';
import { Tap } from '@/ui/Tap.tsx';
import { View } from 'react-native';
import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';

import ArrowRightIcon from '@/assets/images/arrow_right.svg';
import ClipboardIcon from '@/assets/images/clipboard.svg';
import { useMemo } from 'react';
import Color from 'color';

const cardStyle = createStyle({
  flexDirection: 'row',
});
const useIconWrapperStyle = createStyle((_, color = '') => ({
  width: 40,
  height: 40,
  borderRadius: 20,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color,
}));

export interface ProjectCardProps {
  title: string;
  color?: string;
  description?: string;
  onPress?: () => void;
}
export const ProjectCard = ({ title, description, color, onPress }: ProjectCardProps) => {
  const theme = useTheme();

  const dimmedColor = useMemo(() => Color(color).alpha(0.1).toString(), [color]);
  const iconWrapperStyle = useIconWrapperStyle(dimmedColor);

  return (
    <Tap onPress={onPress}>
      <Card style={cardStyle}>
        <View style={iconWrapperStyle}>
          <ClipboardIcon color={color} />
        </View>
        <Space size={12}/>
        <View style={{ flexDirection: 'column' }}>
          <Typography variant={'subtitle1'}>{title}</Typography>
          <Space size={4}/>
          <Typography variant={'body1'} color={(colors) => colors.palette.gray[500]}>{description}</Typography>
        </View>
        <Space/>
        <ArrowRightIcon
          width={28}
          height={28}
          color={theme.colors.white.text}
          style={{ backgroundColor: theme.colors.white.surface, borderRadius: 14, overflow: 'hidden' }}
        />
      </Card>
    </Tap>
  )
};
