import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomePage } from '@/pages/HomePage';
import { ThemeProvider } from '@/features/theme';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName={'home'}>
            <Stack.Screen name={'home'} component={HomePage}/>
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
};
