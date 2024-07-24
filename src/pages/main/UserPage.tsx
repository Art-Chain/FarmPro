import { Space, Typography } from '@/ui/common';
import { RectButton } from 'react-native-gesture-handler';
import { AppShell } from '@/pages/components';
import { View } from 'react-native';
import { createStyle } from '@/features/utils';

import ChevronRight from '@/assets/images/chevron_right.svg';
import { useTheme } from '@/features/themes';
import { useNavigation } from '@react-navigation/native';

const itemStyle = createStyle({
  paddingVertical: 16,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
});

export const UserPage = () => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <AppShell footer={<Space size={62}/>}>
      <Space size={32}/>
      <Typography variant={'subtitle1'} style={{ paddingHorizontal: 20 }}>고객 지원</Typography>
      <Space size={8}/>
      <RectButton>
        <View accessible accessibilityRole={'button'} style={itemStyle}>
          <Typography>공지사항</Typography>
          <Space/>
          <ChevronRight width={16} height={16} color={theme.colors.black.main}/>
        </View>
      </RectButton>
      <RectButton onPress={() => navigation.navigate('debug')}>
        <View accessible accessibilityRole={'button'} style={itemStyle}>
          <Typography>Debug</Typography>
          <Space/>
          <ChevronRight width={16} height={16} color={theme.colors.black.main}/>
        </View>
      </RectButton>
    </AppShell>
  );
};
