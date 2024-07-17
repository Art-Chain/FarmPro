
import { Space, TextInput, Typography } from '@/ui/common';
import { useTheme } from '@/features/themes';

import AIIcon from '@/assets/images/ai.svg';
import { View } from 'react-native';
import { createStyle } from '@/features/utils';

import { ContentPagination, ContentPromptCard } from '../components';

const titleContainer = createStyle({
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const ContentCreateFragment = () => {
  const theme = useTheme();

  return (
    <>
      <View style={titleContainer}>
        <Typography variant={'subtitle1'}>
          카드뉴스 이미지 생성
        </Typography>
        <AIIcon color={theme.colors.primary.main} />
      </View>
      <Space size={16} />
      <ContentPromptCard />
      <Space size={16} />
      <ContentPagination length={2} />
      <Space size={26} />
      <Typography variant={'subtitle1'}>
        본문 입력
        <Typography variant={'subtitle1'} style={{ color: '#FF1F1F'}}>
          *
        </Typography>
      </Typography>
      <Space size={8} />
      <TextInput
        variant={'body1'}
        placeholder={'본문의 키워드나 문장를 입력하세요.\n' +
          '예) 새로 수확한 딸기, 당일 수확 딸기, 구매 원하시면 연락'}
        multiline
        style={{ flex: 1, }}
      />
    </>
  );
};
