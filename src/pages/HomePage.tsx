import { Text, View } from 'react-native';
import { Button } from '@/ui';
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
    </View>
  );
};
