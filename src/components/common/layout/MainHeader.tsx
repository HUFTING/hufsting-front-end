'use client';

import { MainHeaderStyle } from '@/styles/common/layout/layoutStyles';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '../ui/LogoIcon';
import HamburgerIcon from '../ui/HamburgerIcon';
import HamburgerMenu from './HamburgerMenu';
import NotificationIcon from '../ui/BasicNotificationIcon';

const MainHeader = () => {
  const router = useRouter();
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);

  return (
    <MainHeaderStyle>
      <div
        role="presentation"
        onClick={() => {
          router.push('/home');
        }}
      >
        <Logo width={118} height={30} />
      </div>
      <div>
        <div>
          <NotificationIcon />
        </div>
        <div
          onClick={() => {
            setOpenHamburger(true);
          }}
          role="presentation"
        >
          <HamburgerIcon />
        </div>
      </div>
      {openHamburger && (
        <HamburgerMenu
          closeHamburgerEvent={() => {
            setOpenHamburger(false);
          }}
        />
      )}
    </MainHeaderStyle>
  );
};

export default MainHeader;
