import { useEvent, useHandler } from 'react-native-reanimated';
import { PagerViewOnPageScrollEvent } from 'react-native-pager-view';
import type { OnPageScrollEventData } from 'react-native-pager-view/src/specs/PagerViewNativeComponent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface HandlerProps<Context extends Record<string, unknown>> extends Record<string, any> {
  onPageScroll?: (event: OnPageScrollEventData, context?: Context) => void;
}

export const usePageScrollHandler = <Context extends Record<string, unknown>>(handlers: HandlerProps<Context>, dependencies: unknown[] = []) => {
  const {
    context,
    doDependenciesDiffer
  } = useHandler<PagerViewOnPageScrollEvent, Context>(handlers, dependencies);

  return useEvent<PagerViewOnPageScrollEvent>(
    (event) => {
      'worklet';
      const { onPageScroll } = handlers;
      if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
        onPageScroll(event, context);
      }
    },
    ['onPageScroll'],
    doDependenciesDiffer
  );
};