import { type ReactNode } from 'react';

type colorType = 'black' | 'gray' | 'red' | 'white';
type fontWeightType = 'Regular' | 'ExtraBold' | 'SemiBold';
type fontSizeType = '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'base' | 'sm' | 'xs';
export interface TitleTextProps {
  content?: ReactNode;
  children?: ReactNode;
  color?: colorType;
  fontSize?: fontSizeType;
  fontWeight?: fontWeightType;
  className?: string;
  onClick?: () => void;
}

export type getTextStyleType = Omit<TitleTextProps, 'content'>;
