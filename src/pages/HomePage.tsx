import { Text, View } from 'react-native';
import { Button } from '@/ui';

export const HomePage = () => {
  return (
    <View>
      <Text>Home Page</Text>
      <Button variant={'primary'}>
        Test
      </Button>
    </View>
  );
};
