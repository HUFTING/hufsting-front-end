import { type DropDownListType } from '@/types/common/profile';
import React from 'react';

const DropDownList = ({
  dropDownItems,
  dropDownName,
  onChange,
  handleCloseDropDown,
}: DropDownListType) => (
  <ul>
    {dropDownItems?.map(item => (
      <li
        role="presentation"
        key={item}
        onMouseDown={() => {
          if (onChange !== undefined) {
            onChange({ name: dropDownName, value: item });
          }
          handleCloseDropDown();
        }}
      >
        {item} {dropDownName === 'age' && item === '1996' && '이하'}
      </li>
    ))}
  </ul>
);

export default DropDownList;
