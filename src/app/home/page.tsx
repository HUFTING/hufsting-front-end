'use client';

import Filter from '@/components/Filter';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import SearchIcon from '@/components/common/ui/SearchIcon';
import React from 'react';
import styled from 'styled-components';
import List from '../../components/List';

const Home = () => {
  const handleFilterChange = (selectedFilters: unknown) => {
    alert(selectedFilters);
  };

  return (
    <Container>
      <Header>
        <LogoIcon width={118} height={30} />
        <div>
          <SearchIcon />
          <HamburgerIcon />
        </div>
      </Header>
      <Title>훕팅 목록</Title>
      <Filter onFilterChange={handleFilterChange} />
      <List />
    </Container>
  );
};
export default Home;

const Container = styled.div`
  padding: 33px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.div`
  width: 100%;
  padding: 0px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 23px;

  div {
    width: 73px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const Title = styled.p`
  margin-bottom: 23px;
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  font-size: 25px;
  font-weight: bold;
`;
