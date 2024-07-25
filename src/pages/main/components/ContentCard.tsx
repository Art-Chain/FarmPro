import { Image, ImageSourcePropType, ImageStyle, View } from 'react-native';

import { Card, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { Tap } from '@/ui/Tap.tsx';

const containerStyle = createStyle({
  flexDirection: 'row',
});
const contentStyle = createStyle({
  marginRight: 8,
});
const tagContainerStyle = createStyle({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 8,
});
const tagStyle = createStyle({
  borderRadius: 6,
  paddingVertical: 2,
  paddingHorizontal: 6,
});
const useDescriptionStyle = createStyle((theme) => ({
  color: theme.colors.palette.gray[600],
  marginTop: 8,
}));
const imageStyle = createStyle({
  width: 80,
  height: 80,
  borderRadius: 8,
  alignSelf: 'flex-end',
});

export interface ContentCardProps {
  tags?: string[];
  title?: string;
  description?: string;
  source?: ImageSourcePropType;
  timestamp?: Date;

  onPress?: () => void;
}

const colorList = ['#F3F6FC', '#E1F1E9', '#ECE4F6'];
export const ContentCard = ({ tags, title, description, source, timestamp, onPress }: ContentCardProps) => {
  const descriptionStyle = useDescriptionStyle();

  return (
    <Tap onPress={onPress}>
      <Card style={containerStyle}>
        <View style={contentStyle}>
          <View style={tagContainerStyle}>
            {tags?.map((tag) => (
              <View key={tag} style={[tagStyle, { marginRight: 4, backgroundColor: colorList[tag.length % 3] }]}>
                <Typography variant={'caption'}>
                  {tag}
                </Typography>
              </View>
            ))}
            {timestamp && (
              <Typography>
                {timestamp.toTimeString()}
              </Typography>
            )}
          </View>
          <Typography variant={'subtitle2'}>
            {title}
          </Typography>
          <Typography variant={'caption'} style={descriptionStyle}>
            {description}
          </Typography>
        </View>
        <Image source={source} style={imageStyle as ImageStyle}/>
      </Card>
    </Tap>
  );
};
