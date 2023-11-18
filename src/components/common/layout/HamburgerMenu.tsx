'use client';

import { HamburgerMenuStyle } from '@/styles/common/layout/layoutStyles';
import React, { useState } from 'react';
import UserIcon from '../ui/UserIcon';
import SecretIcon from '../ui/SecretIcon';
import BasicButton from '../button/Button';

const menuList = [
  {
    title: '프로필',
    link: '',
    icon: <UserIcon />,
    pickedIcon: <UserIcon color="white" />,
  },
  {
    title: '나의 훕팅',
    link: '',
    icon: <UserIcon />,
    pickedIcon: <UserIcon color="white" />,
  },
  {
    title: '친구 관리',
    link: '',
    icon: <UserIcon />,
    pickedIcon: <UserIcon color="white" />,
  },
  {
    title: '설정',
    link: '',
    icon: <SecretIcon />,
    pickedIcon: <SecretIcon color="white" />,
  },
];
interface props {
  closeHamburgerEvent: () => void;
}

const HamburgerMenu = ({ closeHamburgerEvent }: props) => {
  const [picked] = useState<string | null>('프로필');

  return (
    <HamburgerMenuStyle>
      <div role="presentation" onClick={closeHamburgerEvent} />
      <div className="body">
        <div>
          <div className="user-info">
            <div>img</div>
            <div>
              <div>이름</div>
              <div>학과</div>
            </div>
          </div>
          <ul>
            {menuList.map(menu => (
              <li
                key={menu.title}
                className={`${picked === menu.title ? 'picked' : ''}`}
              >
                {picked === menu.title ? menu.pickedIcon : menu.icon}
                <div>{menu.title}</div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <BasicButton
            color="red"
            assetType="Secondary"
            size="S"
            content="로그아웃"
            onClickEvent={null}
            isActive
          />
        </div>
      </div>
    </HamburgerMenuStyle>
  );
};

export default HamburgerMenu;
