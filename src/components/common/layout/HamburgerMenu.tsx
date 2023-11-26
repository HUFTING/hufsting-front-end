'use client';

import { HamburgerMenuStyle } from '@/styles/common/layout/layoutStyles';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UserIcon from '../ui/UserIcon';
import SecretIcon from '../ui/SecretIcon';
import BasicButton from '../button/Button';
import ManageFollowIcon from '../ui/ManageFollowIcon';
import ListIcon from '../ui/ListIcon';

const menuList = [
  {
    title: '프로필',
    link: '/sdlfjslad;fdf',
    icon: <UserIcon />,
    pickedIcon: <UserIcon color="white" />,
  },
  {
    title: '나의 훕팅',
    link: '/dfsdkflsadlfa',
    icon: <ListIcon />,
    pickedIcon: <ListIcon color="white" />,
  },
  {
    title: '친구 관리',
    link: '/follow/list',
    icon: <ManageFollowIcon />,
    pickedIcon: <ManageFollowIcon color="white" />,
  },
  {
    title: '설정',
    link: '/fslkdajflsda;fl',
    icon: <SecretIcon />,
    pickedIcon: <SecretIcon color="white" />,
  },
];
interface props {
  closeHamburgerEvent: () => void;
}

const HamburgerMenu = ({ closeHamburgerEvent }: props) => {
  const pathname = usePathname();
  const router = useRouter();
  const [picked, setPicked] = useState<string | null>(null);

  useEffect(() => {
    const i = menuList.findIndex(menu => pathname.includes(menu.link));
    setPicked(menuList[i].title);
  }, [pathname]);

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
                role="presentation"
                onClick={() => {
                  router.push(menu.link);
                  closeHamburgerEvent();
                }}
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
