import { useMemo } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticlePage, HomePage } from '@/pages/main';
import { useTheme } from '@/features/themes';

import { BaseHeader, Header } from './components';
import { DebugPage } from './DebugPage';

import HomeIcon from '@/assets/images/home.svg';
import ArticleIcon from '@/assets/images/article.svg';
import UserIcon from '@/assets/images/user.svg';
import BackIcon from '@/assets/images/back.svg';

const Tab = createBottomTabNavigator();

export const MainPage = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const header = useMemo(() => <Header />, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: (props) => route.name === 'home' ? header : <BaseHeader {...props}/>,
        tabBarStyle: {
          height: 62 + insets.bottom,
          padding: 8,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarItemStyle: {
          height: 44,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'home') return <HomeIcon width={size} height={size} color={color}/>;
          else if (route.name === 'article') return <ArticleIcon width={size} height={size} color={color}/>;
          else if (route.name === 'user') return <UserIcon width={size} height={size} color={color}/>;
        },
        tabBarActiveTintColor: theme.colors.primary.main,
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: route.name === 'home' ? '홈' : route.name === 'article' ? '기록' : '마이팜프로',
        headerLeft: () => <BackIcon />,
      })}
    >
      <Tab.Screen name={'home'} component={HomePage}/>
      <Tab.Screen name={'article'} component={ArticlePage}/>
      <Tab.Screen name={'user'} component={DebugPage}/>
    </Tab.Navigator>
  );
};
