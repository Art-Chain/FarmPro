import { Text, View } from 'react-native';
import { Button } from '@/ui';

export const DebugPage = () => {
  return (
    <View>
      <Text>Button</Text>
      <Button variant={'primary'}>
        Primary
      </Button>
      <Button variant={'secondary'}>
        Secondary
      </Button>
    </View>
  );
};
