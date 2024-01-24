import React from 'react';

import type { TitleTextProps, getTextStyleType } from '@/types/common/TextType';

const colorList = {
  black: 'text-[#000000]',
  gray: 'text-[#7A7A7A]',
  red: 'text-[#FF6869]',
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
  `${getSize[fontSize]} ${colorList[color]} h-fit whitespace-pre-wrap ${getFontWeight[fontWeight]} ${className}`;

const getFontWeight = {
  Regular: 'font-Pretendard-Regular',
  Medium: 'font-Pretendard-Medium',
  Bold: 'font-Pretendard-Bold',
  SemiBold: 'font-Pretendard-SemiBold',
  ExtraBold: 'font-Pretendard-ExtraBold',
};

const Text = ({
  content,
  color,
  fontSize,
  fontWeight,
  className,
  onClick,
}: TitleTextProps) => (
  <div
    role="presentation"
    className={getTextStyle({ color, fontSize, fontWeight, className })}
    onClick={() => {
      if (onClick !== undefined) {
        onClick();
      }
    }}
  >
    {content}
  </div>
);

export default Text;
