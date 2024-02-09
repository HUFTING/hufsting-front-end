'use client';

import Filter, {
  type SelectedFilters,
} from '@/components/common/dropdown/HomeFilter';
import React, {
  useState,
  useEffect,
  useCallback,
  type ChangeEvent,
} from 'react';
import styled from 'styled-components';
import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import BasicInput from '@/components/common/BasicInput';
import axiosInstance from '@/api/axiosInstance';
import RegisterButton from '@/components/common/button/RegisterButton';
import List from '../../components/list/HomeList';

interface ListType {
  id: number;
  matchingStatus: boolean;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  createdAt: string;
}

const Home = () => {
  const [initialLists, setInitialLists] = useState<ListType[]>([]);
  const [filteredLists, setFilteredLists] = useState(initialLists);

  // 리스트 받아오기
  useEffect(() => {
    axiosInstance
      .get('/apis/api/v1/matchingposts')
      .then(res => {
        const { data } = res.data;
        setInitialLists(data);
        setFilteredLists(data);
      })
      .catch(e => e);
  }, []);

  // 선택된 필터에 따라 리스트를 필터링하는 함수
  const filterLists = useCallback(
    (filters: SelectedFilters, lists: ListType[]) => {
      const filteredByGender =
        filters.gender !== ''
          ? lists.filter(item => item.gender === filters.gender)
          : lists;

      const filteredByCount =
        filters.count !== ''
          ? filteredByGender.filter(
              item => `${item.desiredNumPeople.toString()}명` === filters.count,
            )
          : filteredByGender;

      return filteredByCount;
    },
    [],
  );

  // 필터 선택 감지
  const handleFilterChange = useCallback(
    (selectedFilters: SelectedFilters) => {
      const updatedLists = filterLists(selectedFilters, initialLists);
      setFilteredLists(updatedLists);
    },
    [filterLists, initialLists],
  );

  // 검색 필터링
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const updatedLists = initialLists.filter(item =>
      item.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredLists(updatedLists);
  };

  return (
    <Container>
      <RegisterButton />
      <MainHeader />
      <SubHeader title="훕팅 목록" />
      <div className="searchbox">
        <BasicInput placeholder="제목 검색" changeHandler={handleInputChange} />
      </div>
      {initialLists.length === 0 ? (
        <NoDataMessage>훕팅 리스트가 없습니다.</NoDataMessage>
      ) : (
        <>
          <Filter onFilterChange={handleFilterChange} />
          <List lists={filteredLists} pathnameProp="/detail" />
        </>
      )}
    </Container>
  );
};
export default Home;

const Container = styled.div`
  padding: 33px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .searchbox {
    padding: 14px 18px;
  }
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
