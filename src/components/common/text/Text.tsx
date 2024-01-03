import React from 'react';

import type { TitleTextProps, getTextStyleType } from '@/types/common/TextType';

const colorList = {
  black: 'text-#000000',
  gray: 'text-#7A7A7A',
};
const getSize = {
  '3xl': 'text-3xl',
  '2xl': 'text-2xl',
  xl: 'text-xl',
  lg: 'text-lg',
  md: 'text-md',
  base: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
};
const getTextStyle = ({
  color,
  fontSize,
  fontWeight,
  className,
}: getTextStyleType) =>
  `${getSize[fontSize]} ${colorList[color]} h-fit whitespace-pre-wrap font-Pretendard-${fontWeight} ${className}`;

const Text = ({
  content,
  color,
  fontSize,
  fontWeight,
  className,
}: TitleTextProps) => (
  <div className={getTextStyle({ color, fontSize, fontWeight, className })}>
    {content}
  </div>
);

export default Text;
