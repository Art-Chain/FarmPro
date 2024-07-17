import React, { useEffect } from 'react';

import BootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { ThemeProvider } from '@/features/themes';
import { DebugPage, MainPage, OnBoardingPage } from '@/pages';

const Stack = createNativeStackNavigator();

export const App = () => {
  useEffect(() => {
    void BootSplash.hide({ fade: true });
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <Stack.Navigator
              initialRouteName={'home'}
              screenOptions={{
                headerShown: false,
                statusBarTranslucent: true,
                // navigationBarColor: '#3FC685',
              }}
            >
              <Stack.Screen name={'main'} component={MainPage}/>
              <Stack.Screen
                name={'onBoarding'}
                component={OnBoardingPage}
              />
              <Stack.Screen name={'debug'} component={DebugPage}/>
            </Stack.Navigator>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
};
