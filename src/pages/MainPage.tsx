import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ArticlePage, HomePage, UserPage } from '@/pages/main';
import { useTheme } from '@/features/themes';

import HomeIcon from '@/assets/images/home.svg';
import ArticleIcon from '@/assets/images/article.svg';
import UserIcon from '@/assets/images/user.svg';
import HomeFillIcon from '@/assets/images/home_fill.svg';
import ArticleFillIcon from '@/assets/images/article_fill.svg';
import UserFillIcon from '@/assets/images/user_fill.svg';

const Tab = createBottomTabNavigator();

export const MainPage = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          height: 62 + insets.bottom,
          padding: 8,
          paddingBottom: 8 + insets.bottom,
        },
        tabBarItemStyle: {
          height: 44,
        },
        tabBarIcon: ({ color, size, focused }) => {
          if (focused) {
            if (route.name === 'home') return <HomeFillIcon width={size} height={size} color={color}/>;
            else if (route.name === 'article') return <ArticleFillIcon width={size} height={size} color={color}/>;
            else if (route.name === 'user') return <UserFillIcon width={size} height={size} color={color}/>;
          }

          if (route.name === 'home') return <HomeIcon width={size} height={size} color={color}/>;
          else if (route.name === 'article') return <ArticleIcon width={size} height={size} color={color}/>;
          else if (route.name === 'user') return <UserIcon width={size} height={size} color={color}/>;
        },
        tabBarActiveTintColor: theme.colors.black.main,
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: route.name === 'home' ? '홈' : route.name === 'article' ? '기록' : '마이팜프로',
        headerShown: false,
      })}
    >
      <Tab.Screen name={'home'} component={HomePage}/>
      <Tab.Screen name={'article'} component={ArticlePage}/>
      <Tab.Screen name={'user'} component={UserPage}/>
    </Tab.Navigator>
  );
};
