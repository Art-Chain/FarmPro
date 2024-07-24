import { BottomSheetView } from '@gorhom/bottom-sheet';
import ProjectFullIcon from '@/assets/images/project_full.svg';
import { useTheme } from '@/features/themes';
import { Button, Space, TextInput, Typography } from '@/ui/common';
import { createStyle } from '@/features/utils';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const containerStyle = createStyle({
  paddingHorizontal: 20,
  alignItems: 'center',
});
const toolbarStyle = createStyle({
  flexDirection: 'row',
  paddingVertical: 8,
});

export interface ProjectCreatedFragmentProps {
  name?: string;
  onNameChange?: (name: string) => void;
  onSubmit?: () => void;
  onSkip?: () => void;
}

export const ProjectCreatedFragment = ({ name, onNameChange, onSkip, onSubmit }: ProjectCreatedFragmentProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetView style={containerStyle}>
      <Space size={24}/>
      <ProjectFullIcon color={theme.colors.primary.main}/>
      <Space size={16}/>
      <Typography variant={'subtitle1'} align={'center'}>
        프로젝트가 등록되었어요!{'\n'}바로 마케팅 콘텐츠를 생성해보세요!
      </Typography>
      <Space size={16}/>
      <Typography variant={'body1'} color={(colors) => colors.palette.gray[500]}>
        등록한 프로젝트를 바탕으로 맞춤형 콘텐츠가 생성돼요!
      </Typography>
      <Space size={16}/>
      <TextInput
        value={name}
        onChangeText={onNameChange}
        placeholder={'프로젝트 이름을 입력해주세요'}
      />
      <Space size={24}/>
      <View style={toolbarStyle}>
        <Button variant={'secondary'} style={{ flex: 1 }} onPress={onSkip}>
          나중에 만들기
        </Button>
        <Space size={10}/>
        <Button style={{ flex: 1 }} onPress={onSubmit}>
          콘텐츠 만들기
        </Button>
      </View>
      <Space size={insets.bottom}/>
    </BottomSheetView>
  );
};