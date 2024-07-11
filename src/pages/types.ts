export type RootStackParamList = {
  home: undefined;
  debug: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
