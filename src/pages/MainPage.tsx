import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ArticlePage, HomePage, UserPage } from '@/pages/main';
import { useTheme } from '@/features/themes';

import HomeIcon from '@/assets/images/home.svg';
import ArticleIcon from '@/assets/images/article.svg';
import UserIcon from '@/assets/images/user.svg';

import { Header } from './components';
import { useMemo } from 'react';

const Tab = createBottomTabNavigator();

export const MainPage = () => {
  const theme = useTheme();
  const header = useMemo(() => <Header />, []);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => header,
        tabBarStyle: {
          height: 62,
          padding: 8,
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
      })}
    >
      <Tab.Screen name={'home'} component={HomePage}/>
      <Tab.Screen name={'article'} component={ArticlePage}/>
      <Tab.Screen name={'user'} component={UserPage}/>
    </Tab.Navigator>
  );
};
