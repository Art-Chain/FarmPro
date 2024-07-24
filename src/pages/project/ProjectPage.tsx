import { useNavigation, useRoute } from '@react-navigation/native';
import { AppShell } from '@/pages/components';
import { useTheme } from '@/features/themes';
import { Button, Typography } from '@/ui/common';

import AddIcon from '@/assets/images/add.svg';
import { ContentCard } from '@/pages/main/components';
import { Tap } from '@/ui/Tap';

export const ProjectPage = () => {
  const theme = useTheme();
  const route = useRoute();
  const navigation = useNavigation();

  const project = (route.params as { project?: Record<string, string> })?.project;

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
        <Tap onPress={() => navigation.navigate('projectEdit', { project })}>
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
      <ContentCard
        tags={['딸기', '프로젝트']}
        title={'딸기 프로젝트'}
        description={'딸기'}
      />
    </AppShell>
  );
};
