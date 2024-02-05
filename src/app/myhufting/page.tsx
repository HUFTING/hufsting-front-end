'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import List from '../../components/list/HomeList';

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
  const lists = [
    {
      id: 1,
      matchingStatus: false,
      title: '모두 같이 훕팅해요~~',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
    {
      id: 2,
      matchingStatus: false,
      title: '모두 같이',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
    {
      id: 3,
      matchingStatus: false,
      title: '모두 같이 훕팅해요~~',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
    {
      id: 4,
      matchingStatus: false,
      title: '안녕하세요',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
    {
      id: 5,
      matchingStatus: false,
      title: 'Hello! How are you',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
    {
      id: 6,
      matchingStatus: true,
      title: '넌 누구니',
      desiredNumPeople: 3,
      gender: '남',
      authorName: '김**',
      createdAt: '2024-02-06T12:00:00Z',
    },
  ];

  // 필터링
  const [filter, setFilter] = useState('all'); // 'all', 'waiting', 'completed'

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredLists = lists.filter(item => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'waiting') {
      return !item.matchingStatus; // 매칭 대기중인 경우
    }
    if (filter === 'completed') {
      return item.matchingStatus; // 매칭 완료된 경우
    }
    return true;
  });

  return (
    <Container>
      <MainHeader />
      <SubHeader title="내가 올린 훕팅" />
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
      <List lists={filteredLists} pathnameProp="/detailmyhufting" />
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
    padding: 10px 18px;
  }
`;

const FilterBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
