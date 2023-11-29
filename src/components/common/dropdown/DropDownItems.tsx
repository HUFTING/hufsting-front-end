import { type DropDownListType } from '@/types/common/profile';
import React from 'react';

const DropDownList = ({
  dropDownItems,
  dropDownName,
  onChange,
  handleCloseDropDown,
}: DropDownListType) => (
  <ul>
    {dropDownItems.map(item => (
      <li
        role="presentation"
        key={item}
        onMouseDown={() => {
          onChange({ name: dropDownName, value: item });
          handleCloseDropDown();
        }}
      >
        {item}
      </li>
    ))}
  </ul>
);

export default DropDownList;
