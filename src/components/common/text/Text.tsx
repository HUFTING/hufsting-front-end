import React from 'react';

import type { TitleTextProps, getTextStyleType } from '@/types/common/TextType';

const getTextStyle = ({
  color,
  fontSize,
  fontWeight,
  className,
}: getTextStyleType) => {
  const colorList = {
    black: '#000000',
    gray: '#7A7A7A',
  };
  return `text-${colorList[color]} font-Pretendard-${fontWeight} text-${fontSize}} ${className}`;
};

const Text = ({
  content,
  color,
  fontSize,
  fontWeight,
  className,
}: TitleTextProps) => (
  <div
    className={`h-fit w-fit ${getTextStyle({
      color,
      fontSize,
      fontWeight,
      className,
    })} `}
  >
    {content}
  </div>
);

export default Text;
