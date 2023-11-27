import React, { useState } from 'react';
import { DropDownStyle } from '@/styles/common/input/dropdown/DropDownStyle';
import type { DropDownPropsType } from '@/types/common/dropdown';
import DownIcon from '../ui/DownIcon';
import DropDownList from './DropDownItems';

const DropDown = ({
  dropDownItems,
  defaultValue,
  isBorder = false,
}: DropDownPropsType) => {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [value, setValue] = useState(defaultValue);
  const handleOpenDropDown = () => {
    setOpenDropDown(prev => !prev);
  };
  const HandleCloseDropDown = () => {
    setOpenDropDown(false);
  };
  const onClickButton = (item: string) => {
    setValue(item);
    HandleCloseDropDown();
  };
  return (
    <DropDownStyle $isBorder={isBorder}>
      <button
        type="button"
        onClick={handleOpenDropDown}
        onBlur={HandleCloseDropDown}
      >
        {value}
        <DownIcon />
      </button>
      {openDropDown && (
        <DropDownList
          dropDownItems={dropDownItems}
          onClickButton={onClickButton}
        />
      )}
    </DropDownStyle>
  );
};

export default DropDown;
