import { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Chip } from '@/ui/Chip';
import { SelectCard } from '@/ui/SelectCard';
import { Space, Typography } from '@/ui/common';

export const ContentCreateInfoFragment = () => {
  const [selectedCrop, setSelectedCrop] = useState<string | null>(null);
  const [contentType, setContentType] = useState('instagram');
  const [contentPurpose, setContentPurpose] = useState('advertise');

  return (
    <>
      <Typography variant={'subtitle1'}>
        농작물 종류 선택
      </Typography>
      <Space size={12}/>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -16, flexGrow: 0 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Chip
          active={selectedCrop === 'strawberry'}
          onPress={() => setSelectedCrop('strawberry')}
        >
          딸기
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'cucumber'}
          onPress={() => setSelectedCrop('cucumber')}
        >
          오이
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'mandarin'}
          onPress={() => setSelectedCrop('mandarin')}
        >
          감귤
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'grape'}
          onPress={() => setSelectedCrop('grape')}
        >
          포도
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'pepper'}
          onPress={() => setSelectedCrop('pepper')}
        >
          고추
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'koreanMelon'}
          onPress={() => setSelectedCrop('koreanMelon')}
        >
          참외
        </Chip>
        <Space size={8}/>
        <Chip
          active={selectedCrop === 'watermelon'}
          onPress={() => setSelectedCrop('watermelon')}
        >
          수박
        </Chip>
      </ScrollView>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        콘텐츠 형식 선택
      </Typography>
      <Space size={8}/>
      <SelectCard selected={contentType === 'instagram'} onPress={() => setContentType('instagram')}>
        <Typography variant={'body1'}>
          인스타 게시글
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentType === 'blog'} onPress={() => setContentType('blog')}>
        <Typography variant={'body1'}>
          블로그 게시글
        </Typography>
      </SelectCard>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        콘텐츠 목적 선택
      </Typography>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'advertise'} onPress={() => setContentPurpose('advertise')}>
        <Typography variant={'body1'}>
          홍보 목적
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'selling'} onPress={() => setContentPurpose('selling')}>
        <Typography variant={'body1'}>
          판매 목적
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'information'} onPress={() => setContentPurpose('information')}>
        <Typography variant={'body1'}>
          안내 목적
        </Typography>
      </SelectCard>
    </>
  );
};