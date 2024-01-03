import { ButtonStyle } from '@/styles/common/button/ButtonStyle';
import type {
  BasicButtonAssetType,
  BasicButtonColor,
  BasicButtonProps,
  SizeAssetType,
} from '@/types/common/buttonType';
import React from 'react';

export const getBasicButtonColorAsset = (
  color: BasicButtonColor,
  type: BasicButtonAssetType,
) => {
  const colorAsset = {
    'red-Primary': {
      backgroundColor: '#FF6869',
      borderColor: 'transparent',
      contentColor: '#FFFFFF',
      disabledBackgroundColor: 'gray',
      disabledBorderColor: 'transparent',
      disabledContentColor: '#FFFFFF',
    },
    'red-Secondary': {
      backgroundColor: '#FFFFFF',
      borderColor: '#FF6869',
      contentColor: '#000000',
      disabledBackgroundColor: 'gray',
      disabledBorderColor: 'transparent',
      disabledContentColor: '#FFFFFF',
    },
    'gray-Primary': {
      backgroundColor: '#8D8D8D',
      borderColor: 'transparent',
      contentColor: '#FFFFFF',
      disabledBackgroundColor: 'gray',
      disabledBorderColor: 'transparent',
      disabledContentColor: '#FFFFFF',
    },
    'gray-Secondary': {
      backgroundColor: '#FFFFFF',
      borderColor: '#8D8D8D',
      contentColor: '#000000',
      disabledBackgroundColor: 'gray',
      disabledBorderColor: 'transparent',
      disabledContentColor: '#FFFFFF',
    },
  };

  return colorAsset[`${color}-${type}`];
};

export const basicButtonSizeAssetGroup = {
  S: {
    height: '2.375rem',
    paddingX: '1rem',
    paddingY: '0.75rem',
    fontSize: '0.75rem',
    fontWeight: '700',
  },
  M: {
    height: '3.6875rem',
    paddingX: '1.5rem',
    paddingY: '1rem',
    fontSize: '1.5rem',
    fontWeight: '700',
  },
};

const BasicButton = ({
  color,
  assetType,
  size,
  content,
  onClickEvent,
  isActive,
  buttonType = 'button',
  width = '100%',
}: BasicButtonProps) => {
  const colorAsset = getBasicButtonColorAsset(color, assetType);
  const sizeAsset = basicButtonSizeAssetGroup[size];

  return (
    <ButtonStyle
      $sizeAsset={sizeAsset as SizeAssetType}
      $colorAsset={colorAsset}
      $isActive={isActive}
      onClick={() => {
        if (onClickEvent !== null) {
          isActive && onClickEvent();
        }
      }}
      type={buttonType}
      width={width}
    >
      {content}
    </ButtonStyle>
  );
};

export default BasicButton;
