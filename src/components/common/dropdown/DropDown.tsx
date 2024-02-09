import React, { useState } from 'react';
import { DropDownStyle } from '@/styles/common/input/dropdown/DropDownStyle';
import type { DropDownType } from '@/types/common/profile';
import DownIcon from '../ui/DownIcon';
import DropDownList from './DropDownItems';

const DropDown = ({
  dropDownState,
  dropDownItems,
  dropDownName,
  onChange,
  disabled = false,
  isBorder = false,
}: DropDownType) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const handleOpenDropDown = () => {
    setOpenDropDown(prev => !prev);
  };
  const handleCloseDropDown = () => {
    setOpenDropDown(false);
  };

  return (
    <DropDownStyle $isBorder={isBorder}>
      <button
        type="button"
        name={dropDownName}
        onClick={handleOpenDropDown}
        onBlur={handleCloseDropDown}
      >
        {dropDownState ?? '미선택'}
        {!disabled && <DownIcon />}
      </button>
      {openDropDown && !disabled && (
        <DropDownList
          dropDownItems={dropDownItems}
          onChange={onChange}
          dropDownName={dropDownName}
          handleCloseDropDown={handleCloseDropDown}
        />
      )}
    </DropDownStyle>
  );
};

export default DropDown;
