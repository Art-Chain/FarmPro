import { AppShell } from '@/pages/components';
import { useTheme } from '@/features/themes';
import { Button, Space } from '@/ui/common';
import { createStyle } from '@/features/utils';

import AddIcon from '@/assets/images/add.svg';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ProjectCard } from './components';

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
          />
          <Space size={24}/>
        </View>
      )}
    >
      <ProjectCard
        color={theme.colors.primary.main}
        title={'딸기 프로젝트'}
        description={'딸기'}
        onPress={() => navigation.navigate('project', {
          project: { name: '딸기 프로젝트' },
        })}
      />
    </AppShell>
  );
};
