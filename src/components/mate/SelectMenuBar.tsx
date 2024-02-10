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

const SelectMenuBar = ({ menuList, pickedMenuId }: props) => (
  <section className="w-full flex">
    {menuList.map(menu => (
      <div
        key={menu.id}
        role="presentation"
        className={`${
          pickedMenuId === menu.id
            ? 'text-[#FF6969] underline'
            : 'text-[#7A7A7A]'
        } flex justify-center items-center py-2 cursor-pointer`}
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

export default SelectMenuBar;
