'use client';

import { MainHeaderStyle } from '@/styles/common/layout/layoutStyles';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Logo from '../ui/LogoIcon';
import HamburgerIcon from '../ui/HamburgerIcon';
import HamburgerMenu from './HamburgerMenu';
import NotificationIcon from '../ui/BasicNotificationIcon';

const MainHeader = () => {
  const navigation = useRouter();
  const pathname = usePathname();
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);
  const handleOnClickAlarm = () => {
    navigation.push('/alarm');
  };

  return (
    <>
      {' '}
      {!pathname.startsWith('/register') && !pathname.startsWith('/login') ? (
        <MainHeaderStyle>
          <div
            role="presentation"
            onClick={() => {
              navigation.push('/');
            }}
          >
            <Logo width={118} height={30} />
          </div>
          <div>
            <button type="button" onClick={handleOnClickAlarm} tabIndex={0}>
              <NotificationIcon />
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenHamburger(true);
              }}
              tabIndex={0}
            >
              <HamburgerIcon />
            </button>
          </div>
          {openHamburger && (
            <HamburgerMenu
              closeHamburgerEvent={() => {
                setOpenHamburger(false);
              }}
            />
          )}
        </MainHeaderStyle>
      ) : (
        ''
      )}
    </>
  );
};

export default MainHeader;
