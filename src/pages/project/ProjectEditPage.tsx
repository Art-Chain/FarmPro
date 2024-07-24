import { Button, Space, TextInput, Typography } from '@/ui/common';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from '@/ui/Chip.tsx';
import { AppShell } from '@/pages/components';
import { useQuery } from '@tanstack/react-query';
import { fetchCrops } from '@/api';
import { useState } from 'react';

import NoticeIcon from '@/assets/images/notice.svg';
import { View } from 'react-native';
import { useTheme } from '@/features/themes';

export const ProjectEditPage = () => {
  const theme = useTheme();
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  const { data: crops } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });

  return (
    <AppShell
      showBorder
      showBack
      showLogo={false}
      align={'center'}
      title={'프로젝트 수정하기'}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}
      footer={(
        <Button
          style={{ marginHorizontal: 20, marginVertical: 8 }}
        >
          수정하기
        </Button>
      )}
    >
      <Typography variant={'subtitle1'}>
        재배하시는 농산물 종류가 무엇인가요?
      </Typography>
      <Space size={12}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -16, flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {crops?.crops?.map((crop) => (
          <Chip
            key={crop.id}
            active={selectedCrop === crop.id}
            onPress={() => setSelectedCrop(crop.id)}
          >
            {crop.name}
          </Chip>
        ))}
      </ScrollView>
      <Space size={8}/>
      <View style={{ flexDirection: 'row' }}>
        <NoticeIcon color={theme.colors.palette.gray[500]}/>
        <Space size={4}/>
        <Typography variant={'caption'} color={(colors) => colors.palette.gray[500]}>
          다른 과일은 아직 준비중이에요 :)
        </Typography>
      </View>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        재배하는 농산물의 품종은 무엇인가요?
      </Typography>
      <Space size={8}/>
      <TextInput placeholder={'예) 설향 딸기, 대추 토마토 등'}/>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        농산물의 재배 방식은 무엇인가요?
      </Typography>
      <Space size={8}/>
      <TextInput placeholder={'예) 유기농, 수경재배, 노지재배 등'}/>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        농장의 특징을 소개해주세요
      </Typography>
      <Space size={8}/>
      <TextInput placeholder={'예) 스마트팜, 친환경 농장, 체험 농장 등'}/>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        상품의 판매 가격은 어떻게 되나요?
      </Typography>
      <Space size={8}/>
      <TextInput placeholder={'예) 딸기 1kg 당 10,000원, 딸기 주스 체험 10,000원 등'}/>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        판매 링크나 연락처를 입력해주세요
      </Typography>
      <Space size={8}/>
      <TextInput placeholder={'예) 010-1234-5678'}/>
    </AppShell>
  );
};
