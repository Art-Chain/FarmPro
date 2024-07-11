import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider } from '@/features/themes';
import { HomePage, DebugPage } from '@/pages';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack.Navigator initialRouteName={'home'}>
            <Stack.Screen name={'home'} component={HomePage}/>
            <Stack.Screen name={'debug'} component={DebugPage}/>
          </Stack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </ThemeProvider>
  );
};
