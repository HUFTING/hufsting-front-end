'use client';

import { MainHeaderStyle } from '@/styles/common/layout/layoutStyles';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useUserDataStore from '@/store/user';
import Logo from '../ui/LogoIcon';
import HamburgerIcon from '../ui/HamburgerIcon';
import HamburgerMenu from './HamburgerMenu';
import NotificationIcon from '../ui/BasicNotificationIcon';
import LoginIcon from '../ui/LoginIcon';

const MainHeader = () => {
  const navigation = useRouter();
  const pathname = usePathname();
  const { userData } = useUserDataStore();
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);
  const handleOnClickAlarm = () => {
    navigation.push('/alarm');
  };

  return (
    <>
      {' '}
      {pathname !== '/register' && !pathname.startsWith('/login') ? (
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
            {userData.email !== null ? (
              <>
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
              </>
            ) : (
              <button
                type="button"
                onClick={() => {
                  navigation.push('/login');
                }}
                tabIndex={0}
              >
                <LoginIcon />
              </button>
            )}
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
