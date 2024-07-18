import React, { useEffect, useMemo } from 'react';

import BootSplash from 'react-native-bootsplash';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeProvider, useTheme } from '@/features/themes';
import { DebugPage, MainPage, OnBoardingPage } from '@/pages';
import { ContentCreatePage, ContentLoadingPage, ContentSharePage } from '@/pages/content';
import { BaseHeader, Header } from '@/pages/components';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export const App = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true });
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <BottomSheetModalProvider>
              <Route/>
            </BottomSheetModalProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export const Route = () => {
  const theme = useTheme();
  const appHeader = useMemo(() => <Header/>, []);

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
        <Stack.Screen name={'main'} component={MainPage}/>
        <Stack.Screen
          name={'contentCreate'}
          component={ContentCreatePage}
          options={{
            title: '콘텐츠 만들기',
            headerBackVisible: true
          }}
        />
        <Stack.Screen
          name={'contentLoading'}
          component={ContentLoadingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={'contentShare'}
          component={ContentSharePage}
          options={{ title: '콘텐츠 생성 완료', headerBackVisible: false }}
        />
        <Stack.Screen
          name={'onBoarding'}
          component={OnBoardingPage}
          options={{ headerShown: false }}
        />
        <Stack.Screen name={'debug'} component={DebugPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
