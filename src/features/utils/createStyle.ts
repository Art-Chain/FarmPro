import { StyleSheet } from 'react-native';
import { useMemo } from 'react';

import { Theme, useTheme } from '@/features/themes';

import { ReactNativeStyle } from './types';

type StyleFactory<Style extends ReactNativeStyle = ReactNativeStyle> = (theme: Theme, ...args: never[]) => Style;
type StyleFactoryArguments<Factory extends StyleFactory<Style>, Style extends ReactNativeStyle = ReactNativeStyle> = Factory extends (theme: Theme, ...args: infer Arguments) => Style ? Arguments : never;
type ExtractStyle<InputStyles extends (ReactNativeStyle | StyleFactory)[]> = (
  InputStyles extends [infer T, ...infer R]
    ? T extends StyleFactory
      ? [T, ...ExtractStyle<R extends (ReactNativeStyle | StyleFactory)[] ? R : []>]
      : ExtractStyle<R extends (ReactNativeStyle | StyleFactory)[] ? R : []>
    : InputStyles
  );
type CreateStyleResult<Styles extends (ReactNativeStyle | StyleFactory)[]> = Styles extends ReactNativeStyle[] ? ReactNativeStyle : (...args: StyleFactoryArguments<ExtractStyle<Styles>[number] extends StyleFactory ? ExtractStyle<Styles>[number] : never>) => ReactNativeStyle;

export const createStyle = <Styles extends (ReactNativeStyle | StyleFactory)[]>(...styles: Styles): CreateStyleResult<Styles> => {
  const baseStyle = StyleSheet.flatten(styles.filter((it) => typeof it !== 'function'));
  const factories = styles.filter((it) => typeof it === 'function') as StyleFactory[];

  if (factories.length === 0) return baseStyle as CreateStyleResult<Styles>;

  return ((...args: StyleFactoryArguments<ExtractStyle<Styles>[number] extends StyleFactory ? ExtractStyle<Styles>[number] : never>) => {
    const theme = useTheme();

    return useMemo(() => {
      const factoryStyles = factories.map((factory) => factory(theme, ...args));

      return StyleSheet.flatten([baseStyle, ...factoryStyles]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, args]);
  }) as CreateStyleResult<Styles>;
};
