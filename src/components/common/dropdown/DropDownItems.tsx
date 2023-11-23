import React from 'react';

const DropDownList = ({
  dropDownItems,
  onClickButton,
}: {
  dropDownItems: string[];
  onClickButton: (item: string) => void;
}) => (
  <ul>
    {dropDownItems.map(item => (
      <li
        role="presentation"
        key={item}
        onMouseDown={() => {
          onClickButton(item);
        }}
      >
        {item}
      </li>
    ))}
  </ul>
);

export default DropDownList;
