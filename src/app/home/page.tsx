'use client';

import Filter, {
  type SelectedFilters,
} from '@/components/common/dropdown/HomeFilter';
import React, { useState } from 'react';
import styled from 'styled-components';
import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import List from '../../components/list/HomeList';

// YourListType을 정의
interface ListType {
  huftingid: number;
  matching: boolean;
  title: string;
  people: number;
  gender: string;
  username: string;
  upload: number;
}

const initialLists: ListType[] = [
  {
    huftingid: 1,
    matching: false,
    title: '모두 같이 훕팅해요~~',
    people: 3,
    gender: '남',
    username: '김**',
    upload: 1,
  },
  {
    huftingid: 2,
    matching: false,
    title: '모두 같이',
    people: 3,
    gender: '여',
    username: '김**',
    upload: 1,
  },
  {
    huftingid: 3,
    matching: false,
    title: '모두 같이 훕팅해요~~',
    people: 2,
    gender: '여',
    username: '김**',
    upload: 1,
  },
  {
    huftingid: 4,
    matching: false,
    title: '안녕하세요',
    people: 3,
    gender: '남',
    username: '김**',
    upload: 1,
  },
  {
    huftingid: 5,
    matching: false,
    title: 'Hello! How are you',
    people: 4,
    gender: '남',
    username: '김**',
    upload: 2,
  },
  {
    huftingid: 6,
    matching: true,
    title: '넌 누구니',
    people: 1,
    gender: '남',
    username: '김**',
    upload: 2,
  },
];

const Home = () => {
  const [filteredLists, setFilteredLists] = useState(initialLists);

  const handleFilterChange = (selectedFilters: SelectedFilters) => {
    const updatedLists = filterLists(selectedFilters, initialLists);
    setFilteredLists(updatedLists);
  };

  // 선택된 필터에 따라 리스트를 필터링하는 함수
  const filterLists = (filters: SelectedFilters, lists: ListType[]) => {
    const filteredByGender =
      filters.gender !== ''
        ? lists.filter(item => item.gender === filters.gender)
        : lists;

    const filteredByCount =
      filters.count !== ''
        ? filteredByGender.filter(
            item => `${item.people.toString()}명` === filters.count,
          )
        : filteredByGender;

    return filteredByCount;
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="훕팅 목록" />
      <Filter onFilterChange={handleFilterChange} />
      <List lists={filteredLists} pathnameProp="/detail" />
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
