import { Text, View } from 'react-native';
import { Button } from '@/ui/common';
import { useNavigation } from '@react-navigation/native';

export const HomePage = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>Home Page</Text>
      <Button variant={'primary'} onPress={() => {
        navigation.navigate('debug');
      }}>
        Go to DebugPage
      </Button>
      <Button variant={'primary'} onPress={() => {
        navigation.navigate('onBoarding');
      }}>
        Go to OnBoardingPage
      </Button>
    </View>
  );
};
