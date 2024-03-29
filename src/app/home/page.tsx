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
import SubHeader from '@/components/common/layout/SubHeader';
import BasicInput from '@/components/common/BasicInput';
import axiosInstance from '@/api/axiosInstance';
import RegisterButton from '@/components/common/button/RegisterButton';
import List from '../../components/list/HomeList';

interface ListType {
  id: number;
  matchingStatus: string;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  createdAt: Date;
  totalNum: number;
}

const Home = () => {
  const [initialLists, setInitialLists] = useState<ListType[]>([]);
  const [filteredLists, setFilteredLists] = useState(initialLists);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 5;

  useEffect(() => {
    setIsLoading(true);
    axiosInstance
      .get(
        `/apis/api/v1/matchingposts?page=${currentPage}&size=${itemsPerPage}`,
      )
      .then(res => {
        const { data } = res.data;
        setInitialLists(prevData => [...prevData, ...data]);
        setFilteredLists(prevData => [...prevData, ...data]);
      })
      .catch(e => e);
    setIsLoading(false);
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById('observer');
    if (observerTarget !== null) {
      observer.observe(observerTarget);
    }
  }, []);

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
      // setTotalPages(Math.ceil(updatedLists.totalNum / itemsPerPage));
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
    // setTotalPages(Math.ceil(updatedLists.totalNum / itemsPerPage));
  };

  // 무한스크롤
  const handleObserver = (entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <Container>
      <RegisterButton />
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
      {isLoading && <p>Loading...</p>}
      <div id="observer" style={{ height: '10px' }} />
    </Container>
  );
};
export default Home;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .searchbox {
    padding: 14px 18px;
  }
`;

const NoDataMessage = styled.div`
  height: 100vh;
  display: flex;
  padding-top: 20vh;
  align-items: flex-start;
  justify-content: center;
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: lightgray;
`;
