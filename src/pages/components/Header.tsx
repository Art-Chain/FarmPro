import { Text, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { Space } from '@/ui/common';

import { useTheme } from '@/features/themes';
import { createStyle } from '@/features/utils';

import LogoIcon from '@/assets/logo.svg';
import SearchIcon from '@/assets/images/search.svg';
import BellIcon from '@/assets/images/bell.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';

const useHeaderSizeStyle = createStyle((_, top = 0) => ({
  width: '100%',
  height: 56 + top,
}));
const useHeaderStyle = createStyle((_, top = 0) => ({
  position: 'absolute',
  top: 0,
  width: '100%',
  height: 56 + top,

  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',

  paddingVertical: 16,
  paddingHorizontal: 20,
  paddingTop: 16 + top,
}));
const useTitleStyle = createStyle((theme) => ({
  ...theme.typography.subtitle1,
  textAlignVertical: 'center',
  color: theme.colors.primary.main,
  lineHeight: undefined,
}));

interface HeaderProps {
  showLogo?: boolean;
  children?: React.ReactNode;
}

export const Header = ({ showLogo = true, children }: HeaderProps) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const headerStyle = useHeaderStyle(insets.top);
  const headerSizeStyle = useHeaderSizeStyle(insets.top);
  const textStyle = useTitleStyle();

  return (
    <>
      <View style={headerSizeStyle}/>
      <BlurView style={headerStyle} blurType={'xlight'}/>
      <View style={headerStyle}>
        {showLogo && (
          <>
            <LogoIcon width={32} height={32} color={theme.colors.primary.main}/>
            <Text style={textStyle}>
              FarmPro
            </Text>
          </>
        )}
        <Space/>
        {!children && (
          <>
            <BorderlessButton>
              <SearchIcon color={theme.colors.palette.gray[950]}/>
            </BorderlessButton>
            <Space size={16}/>
            <BorderlessButton>
              <BellIcon color={theme.colors.palette.gray[950]}/>
            </BorderlessButton>
          </>
        )}
      </View>
    </>
  );
};
