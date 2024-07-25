import { NavigatorScreenParams } from '@react-navigation/native';
import { Content, ContentForm, Project } from '@/features/scheme';

export type RootStackParamList = {
  main: NavigatorScreenParams<MainTabParamList> | undefined;
  onBoarding: undefined;
  contentCreate: { projectId?: number; } | undefined;
  contentLoading: { form: ContentForm; fontFamily: string; projectId?: number; } | undefined;
  contentShare: { content: Content; fontFamily: string; } | undefined;
  contentView: { content: Content; } | undefined;
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
    interface RootParamList extends RootStackParamList {
    }
  }
}
