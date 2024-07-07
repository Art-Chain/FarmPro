import React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={ { flex: 1 } }>
        <View>
          <Text>
            Hello World
          </Text>
        </View>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};
