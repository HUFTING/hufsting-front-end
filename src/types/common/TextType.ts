type colorType = 'black' | 'gray';
type fontWeightType = 'Regular' | 'ExtraBold' | 'SemiBold';
type fontSizeType = '3xl' | '2xl' | 'xl' | 'lg' | 'md' | 'base' | 'sm' | 'xs';
export interface TitleTextProps {
  content: string;
  color: colorType;
  fontSize: fontSizeType;
  fontWeight: fontWeightType;
  className?: string;
}

export type getTextStyleType = Omit<TitleTextProps, 'content'>;
