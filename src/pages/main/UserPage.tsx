import { Card, Space, Typography } from '@/ui/common';
import { RectButton } from 'react-native-gesture-handler';
import { AppShell } from '@/pages/components';
import { View } from 'react-native';
import { createStyle } from '@/features/utils';

import { useTheme } from '@/features/themes';
import { useNavigation } from '@react-navigation/native';

import UserCircleIcon from '@/assets/images/user_circle.svg';
import DocumentsIcon from '@/assets/images/documents.svg';
import ClipboardIcon from '@/assets/images/clipboard.svg';
import AIIcon from '@/assets/images/ai_outline.svg';
import ProfileIcon from '@/assets/images/profile.svg';
import ChevronRight from '@/assets/images/chevron_right.svg';
import { CardButton } from '@/pages/main/components';

const itemStyle = createStyle({
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

const cardStyle = createStyle({
  marginHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-around',
});
const toolbarStyle = createStyle({
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginHorizontal: 20,
});
const useProfileStyle = createStyle((theme) => ({
  width: 48,
  height: 48,
  borderRadius: 16,
  justifyContent: 'center',
  alignItems: 'center',

  backgroundColor: theme.colors.primary.main,
}));

export const UserPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  const profileStyle = useProfileStyle();

  return (
    <AppShell footer={<Space size={62}/>}>
      <Space size={16}/>
      <View style={toolbarStyle}>
        <View style={profileStyle}>
          <ProfileIcon color={theme.colors.primary.text}/>
        </View>
        <Space size={12}/>
        <Typography variant={'subtitle1'}>
          게스트
        </Typography>
        <Space/>
        <Typography>
          @Guest
        </Typography>
      </View>
      <Space size={20}/>
      <Card style={cardStyle}>
        <CardButton
          icon={ClipboardIcon}
          name={'내 프로젝트'}
        />
        <CardButton
          icon={AIIcon}
          name={'생성 기록'}
        />
      </Card>
      <Space size={32}/>
      <Typography variant={'subtitle1'} style={{ paddingHorizontal: 20 }}>고객 지원</Typography>
      <Space size={8}/>
      <RectButton>
        <View accessible accessibilityRole={'button'} style={itemStyle}>
          <UserCircleIcon color={theme.colors.palette.gray[500]}/>
          <Space size={8}/>
          <Typography>개인정보 처리방침</Typography>
          <Space/>
          <ChevronRight width={16} height={16} color={theme.colors.black.main}/>
        </View>
      </RectButton>
      <RectButton>
        <View accessible accessibilityRole={'button'} style={itemStyle}>
          <DocumentsIcon color={theme.colors.palette.gray[500]}/>
          <Space size={8}/>
          <Typography>서비스 이용약관</Typography>
          <Space/>
          <ChevronRight width={16} height={16} color={theme.colors.black.main}/>
        </View>
      </RectButton>
      {__DEV__ && (
        <RectButton onPress={() => navigation.navigate('debug')}>
          <View accessible accessibilityRole={'button'} style={itemStyle}>
            <Typography>Debug Page</Typography>
            <Space/>
            <ChevronRight width={16} height={16} color={theme.colors.black.main}/>
          </View>
        </RectButton>
      )}
    </AppShell>
  );
};
