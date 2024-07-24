import { Button, Space, TextInput, Typography } from '@/ui/common';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from '@/ui/Chip.tsx';
import { AppShell } from '@/pages/components';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchCrops } from '@/api';
import React, { useCallback, useEffect, useState } from 'react';

import NoticeIcon from '@/assets/images/notice.svg';
import { View } from 'react-native';
import { useTheme } from '@/features/themes';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSetAtom } from 'jotai';
import { ProjectAtom } from '@/features/store';
import { Crop, ProjectForm } from '@/features/scheme';
import { createProject, deleteProject, updateProject } from '@/api/local';
import { RootStackParamList } from '@/pages/types';
import { Tap } from '@/ui/Tap.tsx';

export const ProjectEditPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const queryClient = useQueryClient();
  const project = (route.params as RootStackParamList['projectEdit'])?.project;

  const setProject = useSetAtom(ProjectAtom);
  const [name, setName] = useState(project?.name ?? '');
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(project?.crop ?? null);
  const [variety, setVariety] = useState(project?.variety ?? '');
  const [method, setMethod] = useState(project?.method ?? '');
  const [description, setDescription] = useState(project?.description ?? '');
  const [price, setPrice] = useState(project?.price ?? '');
  const [outlink, setOutlink] = useState(project?.outlink ?? '');

  const { mutate, data } = useMutation({
    mutationFn: project ? async (form: ProjectForm) => updateProject(project.id, form) : createProject,
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      if (project) await deleteProject(project.id);
    },
  });

  const { data: crops } = useQuery({
    queryKey: ['crops'],
    queryFn: fetchCrops,
  });

  const onSubmit = useCallback(() => {
    if (!selectedCrop) return;

    mutate({
      name,
      crop: selectedCrop,
      variety,
      method,
      description,
      price,
      outlink,
    });
  }, [description, method, mutate, name, outlink, price, selectedCrop, variety]);
  const onDelete = useCallback(async () => {
    if (!project) return;

    await deleteMutation.mutateAsync();
    await queryClient.invalidateQueries({
      queryKey: ['projects'],
    });
    setProject(null);
    navigation.goBack();
  }, [deleteMutation, navigation, project, queryClient, setProject]);

  useEffect(() => {
    if (data) {
      if (!project) setProject(data);
      void queryClient.invalidateQueries({
        queryKey: ['projects'],
      }).then(() => {
        navigation.goBack();
      });
    }
  }, [project, data, navigation, setProject, queryClient]);

  return (
    <AppShell
      showBorder
      showBack
      showLogo={false}
      align={'center'}
      title={project ? `"${name}" 수정하기` : '내 프로젝트 등록하기'}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}
      footer={(
        <Button
          style={{ marginHorizontal: 20, marginVertical: 8 }}
          onPress={onSubmit}
        >
          {project ? '수정하기' : '등록하기'}
        </Button>
      )}
      icons={project ? [
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        <Tap key={0} onPress={onDelete}>
          <Typography color={(colors) => colors.white.text}>
            삭제
          </Typography>
        </Tap>
      ] : []}
    >
      <Typography variant={'subtitle1'}>
        프로젝트의 이름이 뭔가요?
      </Typography>
      <Space size={8}/>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={'예) 설향 딸기, 대추 토마토 등'}
      />
      <Space size={26}/>
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
        {crops?.crops?.map((crop) => (<React.Fragment key={crop.id}>
            <Chip
              active={selectedCrop?.id === crop.id}
              onPress={() => setSelectedCrop(crop)}
            >
              {crop.name}
            </Chip>
            <Space size={8}/>
          </React.Fragment>
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
      <TextInput
        value={variety}
        onChangeText={setVariety}
        placeholder={'예) 설향 딸기, 대추 토마토 등'}
      />
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        농산물의 재배 방식은 무엇인가요?
      </Typography>
      <Space size={8}/>
      <TextInput
        value={method}
        onChangeText={setMethod}
        placeholder={'예) 유기농, 수경재배, 노지재배 등'}
      />
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        농장의 특징을 소개해주세요
      </Typography>
      <Space size={8}/>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder={'예) 스마트팜, 친환경 농장, 체험 농장 등'}
      />
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        상품의 판매 가격은 어떻게 되나요?
      </Typography>
      <Space size={8}/>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder={'예) 딸기 1kg 당 10,000원, 딸기 주스 체험 10,000원 등'}
      />
      <Space size={26}/>
      <Typography variant={'subtitle1'}>
        판매 링크나 연락처를 입력해주세요
      </Typography>
      <Space size={8}/>
      <TextInput
        value={outlink}
        onChangeText={setOutlink}
        placeholder={'예) 010-1234-5678'}
      />
    </AppShell>
  );
};
