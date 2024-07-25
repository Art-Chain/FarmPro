import { AppShell, EmptyView } from '@/pages/components';
import { useTheme } from '@/features/themes';
import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';

import AddIcon from '@/assets/images/add.svg';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProjectCard } from './components';
import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '@/api/local';
import React from 'react';

const buttonStyle = createStyle({
  position: 'absolute',
  right: 20,
  bottom: 24,

  width: 46,
  height: 46,
  borderRadius: 23,
  padding: 0,
  justifyContent: 'center',
  alignItems: 'center',
});

export const ProjectListPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const { data: projects, error } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });
  console.log(error);

  return (
    <AppShell
      showBorder
      showBack
      showLogo={false}
      align={'center'}
      title={'내 프로젝트'}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 24,
      }}
      footer={(
        <View>
          <Button
            style={buttonStyle}
            icon={<AddIcon width={24} height={24} color={theme.colors.primary.text}/>}
            onPress={() => navigation.navigate('projectEdit')}
          />
          <Space size={24}/>
        </View>
      )}
    >
      {projects?.map((project) => (<React.Fragment key={project.id}>
        <ProjectCard
          color={theme.colors.primary.main}
          title={project.name}
          description={project.crop.name}
          onPress={() => navigation.navigate('project', { projectId: project.id })}
        />
        <Space size={16}/>
      </React.Fragment>))}
      <EmptyView data={projects} />
    </AppShell>
  );
};
