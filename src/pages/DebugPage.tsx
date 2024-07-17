import { View } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import Icon from 'react-native-vector-icons/Octicons';

import { Button, TextInput, Typography } from '@/ui/common';
import { useNavigation } from '@react-navigation/native';

export const DebugPage = () => {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      behavior={'position'}
      style={{ flex: 1 }}
    >
      <View style={{ padding: 8 }}>
        <Typography variant={'head1'}>Button</Typography>
        <Button onPress={() => navigation.navigate('onBoarding')}>
          go OnBoardPage
        </Button>

        <Typography variant={'head1'}>Typography</Typography>
        <Typography variant={'head1'}>head1</Typography>
        <Typography variant={'head2'}>head2</Typography>
        <Typography variant={'head3'}>head3</Typography>
        <Typography variant={'subtitle1'}>subtitle1</Typography>
        <Typography variant={'subtitle2'}>subtitle2</Typography>
        <Typography variant={'body1'}>body1</Typography>
        <Typography variant={'body2'}>body2</Typography>
        <Typography variant={'caption'}>caption</Typography>
        <Typography variant={'button'}>button</Typography>

        <Typography variant={'head1'}>Button</Typography>
        <Button variant={'primary'}>
          Primary
        </Button>
        <Button variant={'secondary'}>
          Secondary
        </Button>

        <Typography variant={'head1'}>TextInput</Typography>
        <TextInput/>
        <TextInput icon={<Icon name={'search'} size={18}/>}/>
      </View>
    </KeyboardAvoidingView>
  );
};
