'use client';

import { MainHeaderStyle } from '@/styles/common/layout/layoutStyles';
import React, { useState } from 'react';
import Logo from '../ui/LogoIcon';
import SearchIcon from '../ui/SearchIcon';
import HamburgerIcon from '../ui/HamburgerIcon';

const MainHeader = () => {
  const [openHamburger, setOpenHamburger] = useState<boolean>(false);

  const openHamburgerHandler = () => {
    setOpenHamburger(true);
  };

  return (
    <MainHeaderStyle>
      <div>
        <Logo width={118} height={30} />
      </div>
      <div>
        <div>
          <SearchIcon />
        </div>
        <div
          onClick={() => {}}
          onKeyDown={openHamburgerHandler}
          role="presentation"
        >
          <HamburgerIcon />
        </div>
      </div>
      {openHamburger && <section>hamburger</section>}
    </MainHeaderStyle>
  );
};

export default MainHeader;
