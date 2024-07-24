import React, { useEffect, useRef } from 'react';
import { AppState } from 'react-native';

import BootSplash from 'react-native-bootsplash';
import NetInfo from '@react-native-community/netinfo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { focusManager, onlineManager, QueryClientProvider } from '@tanstack/react-query';
import { DefaultTheme, NavigationContainer, NavigationContainerRef, StackActions } from '@react-navigation/native';

import { queryClient } from '@/features/config';
import { ThemeProvider, useTheme } from '@/features/themes';
import { DebugPage, MainPage, OnBoardingPage } from '@/pages';
import { ContentCreatePage, ContentLoadingPage, ContentSharePage } from '@/pages/content';

// import { LogBox } from 'react-native';
// LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
// LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

export const App = () => {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      focusManager.setFocused(status === 'active');
    });

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export const Route = () => {
  const theme = useTheme();
  const navigation = useRef<NavigationContainerRef<ReactNavigation.RootParamList>>(null);

  useEffect(() => {
    void AsyncStorage.getItem('onBoarding')
      .then((data) => {
        if (data === null) {
          navigation.current?.dispatch(StackActions.replace('onBoarding'));
        }
      }).finally(() => {
        setTimeout(() => {
          void BootSplash.hide({ fade: true });
        }, 500);
      });
  }, []);

  return (
    <NavigationContainer
      ref={navigation}
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
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          fullScreenGestureEnabled: false,
          animation: 'none',
        }}
      >
        <Stack.Screen
          name={'main'}
          component={MainPage}
        />
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
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name={'contentShare'}
          component={ContentSharePage}
        />
        <Stack.Screen
          name={'onBoarding'}
          component={OnBoardingPage}
        />
        <Stack.Screen
          name={'debug'}
          component={DebugPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
