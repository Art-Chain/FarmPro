export type RootStackParamList = {
  home: undefined;
  debug: undefined;
  onBoarding: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
