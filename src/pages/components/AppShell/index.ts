import { AppShellAndroid } from './android';
import { AppShellIOS } from './ios';
import { Platform } from 'react-native';

export const AppShell = Platform.OS === 'android' ? AppShellAndroid : AppShellIOS;
export * from './types';
