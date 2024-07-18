import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  main: NavigatorScreenParams<MainTabParamList> | undefined;
  onBoarding: undefined;
  contentCreate: undefined;
  contentLoading: undefined;
  contentShare: undefined;
  debug: undefined;
};
export type MainTabParamList = {
  home: undefined;
  article: undefined;
  user: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
