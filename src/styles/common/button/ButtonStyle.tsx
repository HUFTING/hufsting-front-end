import type { SizeAssetType } from '@/types/common/buttonType';
import styled from 'styled-components';

export interface BasicButtonStyleType {
  $sizeAsset: SizeAssetType;
  $colorAsset: {
    backgroundColor: string;
    borderColor: string;
    contentColor: string;
    disabledBackgroundColor: string;
    disabledBorderColor: string;
    disabledContentColor: string;
  };
  $isActive: boolean;
  width: string;
}

export const ButtonStyle = styled.button<BasicButtonStyleType>`
  & {
    display: flex;
    justify-content: center;
    align-items: center;

    width: ${props => props.width};
    height: ${props => props.$sizeAsset.height};

    padding-top: ${props => props.$sizeAsset.paddingY};
    padding-bottom: ${props => props.$sizeAsset.paddingY};
    padding-left: ${props => props.$sizeAsset.paddingX};
    padding-right: ${props => props.$sizeAsset.paddingX};

    font-size: ${props => props.$sizeAsset.fontSize};
    font-weight: ${props => props.$sizeAsset.fontWeight};
    color: ${props =>
      props.$isActive
        ? props.$colorAsset.contentColor
        : props.$colorAsset.disabledContentColor};

    border-radius: 0.5rem;
    border: 1px solid
      ${props =>
        props.$isActive
          ? props.$colorAsset.borderColor
          : props.$colorAsset.disabledBorderColor};
    background: ${props =>
      props.$isActive
        ? props.$colorAsset.backgroundColor
        : props.$colorAsset.disabledBackgroundColor};
    cursor: ${props => (props.$isActive ? 'pointer' : 'unset')};
  }
`;
