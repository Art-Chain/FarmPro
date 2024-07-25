import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { ScrollView } from 'react-native-gesture-handler';

import { Button, Card, Space, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { useTheme } from '@/features/themes';

import { ContentCard, ImageCard } from './components';

import AddIcon from '@/assets/images/add.svg';
import StrawberryImage from '@/assets/images/strawberry.png';
import CucumberImage from '@/assets/images/cucumber.png';
import PaprikaImage from '@/assets/images/paprika.png';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AppShell, BottomSheetModal } from '@/pages/components';
import { View } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { contentPurposeToString, contentTypeToString, fetchContentFeeds } from '@/api';

import ProjectFullIcon from '@/assets/images/project_full.svg';
import ArrowRightIcon from '@/assets/images/arrow_right.svg';
import { Tap } from '@/ui/Tap.tsx';
import { ProjectCreatedFragment } from '@/pages/project/fragments';
import { useAtom } from 'jotai';
import { ProjectAtom } from '@/features/store';
import { updateProject } from '@/api/local';
import React from 'react';

const gradientStyle = createStyle({
  position: 'absolute',
});

export const HomePage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const modalRef = useRef<BottomSheetModal>(null);
  const [project, setProject] = useAtom(ProjectAtom);
  const [name, setName] = useState('');

  const { data } = useQuery({
    queryKey: ['feeds'],
    queryFn: fetchContentFeeds,
  });

  const { mutate } = useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string; }) => updateProject(id, { name }),
  });

  const onAddProject = useCallback(() => {
    navigation.navigate('projectEdit');
  }, [navigation]);
  const onSubmitProject = useCallback(() => {
    setProject(null);
    modalRef.current?.dismiss();
    navigation.navigate('contentCreate', { projectId: project?.id });
  }, [navigation, project?.id, setProject]);
  const onNameChange = useCallback((value: string) => {
    if (!project) return;

    setName(value);
    mutate({ id: project.id, name: value });
  }, [mutate, project]);

  useEffect(() => {
    if (project) {
      setName(project.name);
      modalRef.current?.present();
    }
  }, [project]);

  return (
    <AppShell footer={<Space size={62}/>}>
      <View style={{ paddingVertical: 16, paddingHorizontal: 20 }}>
        <Card round={16} padding={0}>
          <Space size={8}/>
          <Svg width={'100%'} height={'100%'} style={gradientStyle}>
            <Defs>
              <LinearGradient id={'gradient'} x1={'0'} y1={'0'} x2={'0'} y2={'1'}>
                <Stop offset={'0'} stopColor={theme.colors.primary.main} stopOpacity={'0.1'}/>
                <Stop offset={'1'} stopColor={theme.colors.primary.main} stopOpacity={'0'}/>
              </LinearGradient>
            </Defs>
            <Rect x={'0'} y={'0'} width={'100%'} height={'100%'} fill={'url(#gradient)'}/>
          </Svg>
          <Space size={20}/>
          <Typography variant={'head3'} align={'center'}>
            1분 만에 만드는{'\n'}
            SNS 마케팅 콘텐츠
          </Typography>
          <Space size={8}/>
          <Typography variant={'body2'} align={'center'} color={(colors) => colors.palette.gray[500]}>
            어려웠던 콘텐츠 제작, 이제는 AI가 글과 이미지를{'\n'}
            원하는 대로 만들어드립니다!
          </Typography>
          <Space size={20}/>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
          >
            <ImageCard
              source={StrawberryImage}
              subtitle={'당도 200% 딸기의 계절,'}
              title={'그린팜으로 놀러오세요!'}
              color={'#FF7272'}
            />
            <Space size={12}/>
            <ImageCard
              source={CucumberImage}
              subtitle={'아삭아삭 신선하고 건강한'}
              title={'오이만 파는 오이가게'}
              color={'#8FB852'}
            />
            <Space size={12}/>
            <ImageCard
              source={PaprikaImage}
              subtitle={'알록달록 아삭아삭'}
              title={'파프리카의 왕, 파프리카링'}
              color={'#AB90F8'}
            />
          </ScrollView>
          <Space size={4}/>
          <Button
            style={{ margin: 16, borderRadius: 12 }}
            icon={<AddIcon width={16} height={16} color={theme.colors.primary.text}/>}
            onPress={useCallback(() => {
              navigation.navigate('contentCreate');
            }, [navigation])}
          >
            콘텐츠 만들기
          </Button>
        </Card>
        <Space size={16}/>
        <Tap onPress={onAddProject}>
          <Card style={{ flexDirection: 'row' }}>
            <ProjectFullIcon color={theme.colors.primary.main}/>
            <Space size={12}/>
            <View style={{ flexDirection: 'column' }}>
              <Typography variant={'subtitle2'}>내 프로젝트 등록하기</Typography>
              <Space size={6}/>
              <Typography variant={'body2'} color={(colors) => colors.palette.gray[500]}>내 농작물 프로젝트를 생성하여{'\n'}더 맞춤형으로
                콘텐츠를 만들어 보세요!</Typography>
            </View>
            <Space/>
            <ArrowRightIcon
              width={28}
              height={28}
              color={theme.colors.primary.main}
              style={{ backgroundColor: theme.colors.white.surface, borderRadius: 14, overflow: 'hidden' }}
            />
          </Card>
        </Tap>
        <Space size={24}/>
        <Typography variant={'subtitle1'}>
          효과 좋은 인스타 콘텐츠 만드는 법
        </Typography>
        <Space size={12}/>
        {data?.contents?.map((content) => <React.Fragment key={content.id}>
          <ContentCard
            tags={[contentPurposeToString(content.contentPurpose), contentTypeToString(content.contentType)]}
            title={content.title}
            description={content.mainText ?? '내용 없음'}
            source={content.images.images[0] ? { uri: content.images.images[0].imageUrl } : undefined}
            onPress={() => navigation.navigate('contentView', { content: content })}
          />
          <Space size={12}/>
        </React.Fragment>)}
        <Space size={12}/>
        <Button
          variant={'secondary'}
          onPress={() => navigation.navigate('main', { screen: 'contentList' })}
        >
          더보기
        </Button>
      </View>
      <BottomSheetModal
        enableDynamicSizing
        ref={modalRef}
        index={0}
      >
        <ProjectCreatedFragment
          name={name}
          onNameChange={onNameChange}
          onSkip={() => modalRef.current?.dismiss()}
          onSubmit={onSubmitProject}
        />
      </BottomSheetModal>
    </AppShell>
  );
};
