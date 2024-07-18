export type RootStackParamList = {
  main: undefined;
  home: undefined;
  debug: undefined;
  onBoarding: undefined;
  contentCreate: undefined;
  contentLoading: undefined;
  contentShare: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
