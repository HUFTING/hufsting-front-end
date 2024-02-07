'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface StyledButtonProps {
  backColor: number;
}

interface HomeListProps {
  lists: Array<{
    id: number;
    matchingStatus: boolean;
    title: string;
    desiredNumPeople: number;
    gender: string;
    authorName: string;
    createdAt: string;
  }>;
  pathnameProp?: string;
}

// 시간 변환
const calculateTimeAgo = (createdAt: string): string => {
  const createdDate = new Date(createdAt);
  const currentDate = new Date();
  const difference = Math.round(
    (currentDate.getTime() - createdDate.getTime()) / 1000,
  );

  if (difference < 60) {
    return `${difference}초 전`;
  }
  if (difference < 3600) {
    const minutes = Math.floor(difference / 60);
    return `${minutes}분 전`;
  }
  if (difference < 86400) {
    const hours = Math.floor(difference / 3600);
    return `${hours}시간 전`;
  }
  if (difference < 604800) {
    const days = Math.floor(difference / 86400);
    return `${days}일 전`;
  }
  const weeks = Math.floor(difference / 604800);
  return `${weeks}주 전`;
};

const List = ({ lists, pathnameProp }: HomeListProps) => (
  <Container>
    {lists.map((item, index) => (
      <Wrapper key={item.id} backColor={item.id}>
        <Link
          href={{
            pathname: pathnameProp,
            query: { id: item.id },
          }}
          style={{ width: '100%' }}
        >
          <div className="box">
            <div className="matching">
              <p className="matchingText">
                {item.matchingStatus ? '매칭 완료' : '매칭 대기중'}
              </p>
            </div>
          </div>
          <div className="box">
            <p className="title">{item.title}</p>
          </div>
          <div className="box">
            <div className="leftInfo">
              <p className="info">{item.desiredNumPeople}명 |</p>
              <p className="info">{item.gender}</p>
              <p className="info">{item.authorName}</p>
            </div>
            <p className="info">{calculateTimeAgo(item.createdAt)}</p>
          </div>
        </Link>
      </Wrapper>
    ))}
  </Container>
);

export default List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.button<StyledButtonProps>`
  display: flex;
  flex-direction: column;
  padding: 12px 18px 12px 18px;
  background-color: ${props =>
    props.backColor % 2 === 0 ? '#F9F9FB' : 'white'};

  &:active {
    background-color: rgba(255, 105, 105, 0.2);
  }

  &:hover {
    background-color: rgba(255, 105, 105, 0.2);
  }

  .box {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .matching {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 15px 5px 15px;
    margin-bottom: 10px;
    width: 90px;
    height: 23px;
    border-radius: 0 8px 0 8px;
    background-color: rgba(255, 105, 105, 0.2);
  }

  .matchingText {
    font-size: 12px;
    color: #ff6969;
  }

  .title {
    font-size: 18px;
    margin-bottom: 5px;
  }

  .leftInfo {
    display: flex;
  }

  .info {
    padding: 3px;
    color: #8d8d8d;
  }

  background-color: ${props =>
    props.backColor % 2 === 0 ? '#F9F9FB' : 'white'};
`;
