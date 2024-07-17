declare module '*.png' {
  import { ImageRequireSource } from 'react-native';

  const source: ImageRequireSource = {};
  export default source;
}

declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
