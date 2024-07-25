import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';

import { Button, CheckBox, Space, TextInput, Typography } from '@/ui/common';
import { useNavigation } from '@react-navigation/native';
import { AppShell } from '@/pages/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const DebugPage = () => {
  const navigation = useNavigation();

  return (
    <AppShell showBack>
      <View style={{ padding: 8 }}>
        <Typography variant={'head1'}>Page</Typography>
        <Button onPress={() => navigation.navigate('onBoarding')}>
          OnBoardPage
        </Button>
        <Space size={4}/>
        <Button onPress={() => navigation.navigate('contentCreate')}>
          ContentCreatePage
        </Button>
        <Space size={4}/>
        <Button onPress={() => navigation.navigate('contentLoading')}>
          ContentLoadingPage
        </Button>
        <Space size={4}/>
        <Button onPress={() => navigation.navigate('contentShare')}>
          ContentSharePage
        </Button>

        <Space size={16}/>
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

        <Space size={16}/>
        <Typography variant={'head1'}>Button</Typography>
        <Button variant={'primary'}>
          Primary
        </Button>
        <Space size={4}/>
        <Button variant={'secondary'}>
          Secondary
        </Button>

        <Space size={16}/>
        <Typography variant={'head1'}>TextInput</Typography>
        <TextInput/>
        <Space size={4}/>
        <TextInput icon={<Icon name={'search'} size={18}/>}/>

        <Space size={16}/>
        <Typography variant={'head1'}>CheckBox</Typography>
        <CheckBox/>
        <CheckBox>
          <Typography>Checkbox</Typography>
        </CheckBox>
        <CheckBox align={'right'}>
          <Typography>align right</Typography>
        </CheckBox>

        <Space size={16}/>
        <Typography variant={'head1'}>Reset Config</Typography>
        <Button onPress={() => void AsyncStorage.removeItem('onBoarding')}>
          Reset All Config
        </Button>
      </View>
    </AppShell>
  );
};
