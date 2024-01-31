'use client';

import React from 'react';

interface Menu {
  id: number | string;
  title: string;
  onClick?: (type: Menu) => void;
}

interface props {
  menuList: Menu[];
  pickedMenuId: number | string;
}

const SelectMenuBar = ({ menuList, pickedMenuId }: props) => {
  console.log(pickedMenuId);
  return (
    <section className="w-full flex">
      {menuList.map(menu => (
        <div
          key={menu.id}
          role="presentation"
          className={`${pickedMenuId === menu.id ? 'text-pink-500 underline' : 'text-gray-500'} flex justify-center items-center py-2 cursor-pointer`}
          style={{ width: `${100 / menuList.length}%` }}
          onClick={() => {
            if (menu.onClick !== undefined) {
              menu.onClick(menu);
            }
          }}
        >
          {menu.title}
        </div>
      ))}
    </section>
  );
};

export default SelectMenuBar;
