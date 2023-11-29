'use client';

import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import SearchIcon from '@/components/common/ui/SearchIcon';
import React, { useState } from 'react';
import styled from 'styled-components';
import List from '../../components/List';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  active,
  onClick,
  children,
}) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      padding: '2px 15px',
      marginRight: '10px',
      backgroundColor: active ? '#FF6969' : 'white',
      color: active ? 'white' : 'black',
      border: '1px solid #ff6969',
      borderRadius: '0 8px 0 8px',
      fontSize: '12px',
      cursor: 'pointer',
    }}
  >
    {children}
  </button>
);

const MyList = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'waiting', 'completed'

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
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
      <Title>내가 올린 훕팅</Title>
      <div className="filterwrapper">
        <FilterBox>
          <FilterButton
            active={filter === 'all'}
            onClick={() => {
              handleFilterChange('all');
            }}
          >
            전체
          </FilterButton>
          <FilterButton
            active={filter === 'waiting'}
            onClick={() => {
              handleFilterChange('waiting');
            }}
          >
            매칭 대기중
          </FilterButton>
          <FilterButton
            active={filter === 'completed'}
            onClick={() => {
              handleFilterChange('completed');
            }}
          >
            매칭 완료
          </FilterButton>
        </FilterBox>
      </div>
      <List />
    </Container>
  );
};
export default MyList;

const Container = styled.div`
  padding: 33px 0 33px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .filterwrapper {
    padding: 0 18px 0 18px;
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 0 18px 0 18px;
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

const FilterBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
