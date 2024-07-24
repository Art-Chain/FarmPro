import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  main: NavigatorScreenParams<MainTabParamList> | undefined;
  onBoarding: undefined;
  contentCreate: undefined;
  contentLoading: undefined;
  contentShare: undefined;
  projectList: undefined;
  project: { project?: Record<string, string> } | undefined;
  projectEdit: { project?: Record<string, string> } | undefined;
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
