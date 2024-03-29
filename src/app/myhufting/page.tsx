'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SubHeader from '@/components/common/layout/SubHeader';
import axiosInstance from '@/api/axiosInstance';
import RegisterButton from '@/components/common/button/RegisterButton';
import List from '../../components/list/HomeList';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

interface ListType {
  id: number;
  matchingStatus: string;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  createdAt: Date;
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
  const [lists, setLists] = useState<ListType[]>([]);
  const [filter, setFilter] = useState('all'); // 'all', 'waiting', 'completed'

  useEffect(() => {
    axiosInstance
      .get('/apis/api/v1/my-matchingposts')
      .then(res => {
        const { data } = res.data;
        setLists(data);
      })
      .catch(e => e);
  }, []);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  const filteredLists = lists.filter(item => {
    if (filter === 'all') {
      return true;
    }
    if (filter === 'waiting') {
      return item.matchingStatus === '매칭 대기';
    }
    if (filter === 'completed') {
      return item.matchingStatus === '매칭 완료';
    }
    return true;
  });

  return (
    <Container>
      <RegisterButton />
      <SubHeader title="내가 올린 훕팅" />
      {lists.length === 0 ? (
        <NoDataMessage>훕팅 목록이 존재하지 않습니다.</NoDataMessage>
      ) : (
        <>
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
        </>
      )}
    </Container>
  );
};
export default MyList;

const Container = styled.div`
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

const NoDataMessage = styled.div`
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: lightgray;
`;
