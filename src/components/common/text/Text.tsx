import React from 'react';

import type { TitleTextProps } from '@/types/common/TextType';

const colorList = {
  black: 'text-[#000000]',
  gray: 'text-[#7A7A7A]',
  red: 'text-[#FF6869]',
  white: 'text-[#FFFFFF]',
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

const getFontWeight = {
  Regular: 'font-Pretendard-Regular',
  Medium: 'font-Pretendard-Medium',
  Bold: 'font-Pretendard-Bold',
  SemiBold: 'font-Pretendard-SemiBold',
  ExtraBold: 'font-Pretendard-ExtraBold',
};

const Text = ({
  content,
  children,
  color = 'black',
  fontSize = 'lg',
  fontWeight = 'Regular',
  className,
  onClick,
}: TitleTextProps) => {
  const getTextStyle = () =>
    `${getSize[fontSize]} ${colorList[color]} h-fit whitespace-pre-wrap ${getFontWeight[fontWeight]} ${className}`;

  return (
    <div
      role="presentation"
      className={getTextStyle()}
      onClick={() => {
        if (onClick !== undefined) {
          onClick();
        }
      }}
    >
      {children}
      {content}
    </div>
  );
};

export default Text;
