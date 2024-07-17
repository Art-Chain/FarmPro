import { View } from 'react-native';

import { Card, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';

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

export interface ContentCardProps {
  tags?: string[];
  title?: string;
  description?: string;
}

export const ContentCard = ({ tags, title, description }: ContentCardProps) => {
  const descriptionStyle = useDescriptionStyle();

  return (
    <Card>
      <View style={tagContainerStyle}>
        {tags?.map((tag) => (
          <View key={tag} style={[tagStyle, { marginRight: 4 }]}>
            <Typography variant={'caption'}>
              {tag}
            </Typography>
          </View>
        ))}
      </View>
      <Typography variant={'subtitle2'}>
        {title}
      </Typography>
      <Typography variant={'caption'} style={descriptionStyle}>
        {description}
      </Typography>
    </Card>
  );
};
