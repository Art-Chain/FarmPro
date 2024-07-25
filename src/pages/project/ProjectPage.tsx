import { useNavigation, useRoute } from '@react-navigation/native';
import { AppShell, EmptyView } from '@/pages/components';
import { useTheme } from '@/features/themes';
import { Button, Space, Typography } from '@/ui/common';

import AddIcon from '@/assets/images/add.svg';
import { ContentCard } from '@/pages/main/components';
import { Tap } from '@/ui/Tap';
import { RootStackParamList } from '@/pages/types';
import { useQuery } from '@tanstack/react-query';
import { fetchProject } from '@/api/local';
import { useCallback, useEffect } from 'react';
import { fetchLocalContentsByProjectId } from '@/api/local/content.ts';
import React from 'react';
import { contentPurposeToString, contentTypeToString } from '@/api';
import { Content } from '@/features/scheme';

export const ProjectPage = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const projectId = (route.params as RootStackParamList['project'])?.projectId;
  const { data: project, status } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: async () => typeof projectId === 'number' ? await fetchProject(projectId) : null,
  });
  const { data: contents } = useQuery({
    queryKey: ['contents', 'project', projectId],
    queryFn: async () => typeof projectId === 'number' ? await fetchLocalContentsByProjectId(projectId) : null,
  });

  const onEdit = useCallback(() => {
    if (!project) return;

    navigation.navigate('projectEdit', { project });
  }, [navigation, project]);

  useEffect(() => {
    if (status === 'success' && projectId && !project) {
      navigation.goBack();
    }
  }, [projectId, project, status, navigation]);

  return (
    <AppShell
      showBorder
      showBack
      showLogo={false}
      align={'center'}
      title={project?.name ?? '프로젝트 이름'}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}
      icons={[
        <Tap onPress={onEdit}>
          <Typography color={(colors) => colors.primary.main}>
            수정
          </Typography>
        </Tap>
      ]}
      footer={(
        <Button
          icon={<AddIcon width={24} height={24} color={theme.colors.primary.text}/>}
          style={{ marginHorizontal: 20, marginVertical: 8 }}
        >
          콘텐츠 만들기
        </Button>
      )}
    >
      {contents?.map((content) => (<React.Fragment key={content.id}>
        <ContentCard
          tags={[contentPurposeToString(content.contentPurpose), contentTypeToString(content.contentType)]}
          title={content.title}
          description={content.mainText ?? '내용 없음'}
          onPress={() => navigation.navigate('contentView', { content: content as unknown as Content })}
        />
        <Space size={16}/>
      </React.Fragment>))}
      <EmptyView data={contents} />
    </AppShell>
  );
};
