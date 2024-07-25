import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

import { Chip } from '@/ui/Chip';
import { SelectCard } from '@/ui/SelectCard';
import { Space, Typography } from '@/ui/common';
import { useQuery } from '@tanstack/react-query';
import { fetchCrops } from '@/api';
import { ContentPurpose, ContentType, Crop } from '@/features/scheme';
import { View } from 'react-native';
import NoticeIcon from '@/assets/images/notice.svg';
import { useTheme } from '@/features/themes';
import { fetchProject, fetchProjects } from '@/api/local';
import { RootStackParamList } from '@/pages/types.ts';
import { useRoute } from '@react-navigation/native';
import React from 'react';

export interface ContentCreateInfoFragmentProps {
  onChange?: (projectId: number | null, crop: Crop, contentType: ContentType, contentPurpose: ContentPurpose) => void;
}
export const ContentCreateInfoFragment = ({ onChange }: ContentCreateInfoFragmentProps) => {
  const theme = useTheme();
  const route = useRoute();
  const defaultProjectId = (route.params as RootStackParamList['contentCreate'])?.projectId;

  const [projectId, setProjectId] = useState<number | null>(defaultProjectId ?? null);
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [contentType, setContentType] = useState<ContentType>('INSTAGRAM');
  const [contentPurpose, setContentPurpose] = useState<ContentPurpose>('PROMOTION');

  const { data: crops } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });
  const { data: projects } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  const { data: defaultProject } = useQuery({
    queryKey: ['projects', defaultProjectId],
    queryFn: async () => typeof defaultProjectId === 'number' ? await fetchProject(defaultProjectId) : null,
  });

  useEffect(() => {
    if (defaultProject) {
      setSelectedCrop(defaultProject.crop);
    }
  }, [defaultProject]);

  useEffect(() => {
    if (!selectedCrop) return;

    onChange?.(projectId, selectedCrop, contentType, contentPurpose);
  }, [contentPurpose, contentType, onChange, projectId, selectedCrop]);

  return (
    <>
      <Typography variant={'subtitle1'}>
        프로젝트 선택
      </Typography>
      <Space size={12}/>
      {projects?.map((project) => <React.Fragment key={project.id}>
        <SelectCard
          selected={project.id === projectId}
          onPress={() => setProjectId(project.id === projectId ? null : project.id)}
        >
          <Typography variant={'body1'}>
            {project.name}
          </Typography>
        </SelectCard>
        <Space size={8}/>
      </React.Fragment>)}
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        농작물 종류 선택
      </Typography>
      <Space size={12}/>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginHorizontal: -16, flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {crops?.crops?.map((crop) => <React.Fragment key={crop.id}>
          <Chip
            active={selectedCrop?.id === crop.id}
            onPress={() => setSelectedCrop(crop)}
          >
            {crop.name}
          </Chip>
          <Space size={8}/>
        </React.Fragment>)}
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
        콘텐츠 형식 선택
      </Typography>
      <Space size={8}/>
      <SelectCard selected={contentType === 'INSTAGRAM'} onPress={() => setContentType('INSTAGRAM')}>
        <Typography variant={'body1'}>
          인스타 게시글
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentType === 'BLOG'} onPress={() => setContentType('BLOG')}>
        <Typography variant={'body1'}>
          블로그 게시글
        </Typography>
      </SelectCard>
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        콘텐츠 목적 선택
      </Typography>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'PROMOTION'} onPress={() => setContentPurpose('PROMOTION')}>
        <Typography variant={'body1'}>
          홍보 목적
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'SALE'} onPress={() => setContentPurpose('SALE')}>
        <Typography variant={'body1'}>
          판매 목적
        </Typography>
      </SelectCard>
      <Space size={8}/>
      <SelectCard selected={contentPurpose === 'INFORMATION'} onPress={() => setContentPurpose('INFORMATION')}>
        <Typography variant={'body1'}>
          안내 목적
        </Typography>
      </SelectCard>
    </>
  );
};