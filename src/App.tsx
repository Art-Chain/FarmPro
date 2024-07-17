import React, { useEffect, useMemo } from 'react';

import BootSplash from 'react-native-bootsplash';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeProvider, useTheme } from '@/features/themes';
import { DebugPage, MainPage, OnBoardingPage } from '@/pages';
import { ContentCreatePage } from '@/pages/content';
import { BaseHeader, Header } from '@/pages/components';

const Stack = createNativeStackNavigator();

export const App = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true });
  }, []);

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <Route />
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
};

export const Route = () => {
  const theme = useTheme();
  const appHeader = useMemo(() => <Header />, []);

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.colors.palette.gray[50],
        },
      }}
    >
      <Stack.Navigator
        initialRouteName={'home'}
        screenOptions={({ route }) => ({
          header: (props) => route.name === 'main' ? appHeader : <BaseHeader {...props} />,
          statusBarTranslucent: true,
          // navigationBarColor: '#3FC685',
        })}
      >
        <Stack.Screen name={'main'} component={MainPage} />
        <Stack.Screen
          name={'contentCreate'}
          component={ContentCreatePage}
          options={{
            title: '콘텐츠 만들기'
          }}
        />
        <Stack.Screen
          name={'onBoarding'}
          component={OnBoardingPage}
        />
        <Stack.Screen name={'debug'} component={DebugPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
