import { View } from 'react-native';
import { Space, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';

const containerStyle = createStyle({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export interface EmptyViewProps {
  data?: unknown[] | null;
}
export const EmptyView = ({ data }: EmptyViewProps) => {
  if ((data?.length ?? 0) > 0) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <Typography align={'center'} variant={'head3'} color={(colors) => colors.palette.gray[300]}>
        아무것도 없어요.
      </Typography>
      <Space size={4}/>
      <Typography align={'center'} variant={'body1'} color={(colors) => colors.palette.gray[300]}>
        여기엔 아무것도 없어요. 여러분들이 채워주실래요?
      </Typography>
    </View>
  );
};
