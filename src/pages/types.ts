import { NavigatorScreenParams } from '@react-navigation/native';
import { Project } from '@/features/scheme';

export type RootStackParamList = {
  main: NavigatorScreenParams<MainTabParamList> | undefined;
  onBoarding: undefined;
  contentCreate: { projectId?: number } | undefined;
  contentLoading: undefined;
  contentShare: undefined;
  projectList: undefined;
  project: { projectId?: number } | undefined;
  projectEdit: { project?: Project } | undefined;
  debug: undefined;
};
export type MainTabParamList = {
  home: undefined;
  contentList: undefined;
  user: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
