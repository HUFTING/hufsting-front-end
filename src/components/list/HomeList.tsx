'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import relativeDate from '@/utils/relativeDate';

interface HomeListProps {
  lists: Array<{
    id: number;
    matchingStatus: string;
    title: string;
    desiredNumPeople: number;
    gender: string;
    authorName: string;
    createdAt: Date;
  }>;
  pathnameProp?: string;
}

const List = ({ lists, pathnameProp }: HomeListProps) => (
  <Container>
    {lists.map((item, index) => (
      <React.Fragment key={item.id}>
        {item.matchingStatus === '매칭 대기' ? (
          <Link
            className="link"
            key={item.id}
            href={{
              pathname: pathnameProp,
              query: { id: item.id },
            }}
          >
            <Wrapper
              $backgroundColor={item.id}
              $matchingStatus={item.matchingStatus}
            >
              <div className="box">
                <div className="matching">
                  <p className="matchingText">{item.matchingStatus}</p>
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
                <p className="info">{relativeDate(item.createdAt)}</p>
              </div>
            </Wrapper>
          </Link>
        ) : (
          <Wrapper
            key={item.id}
            $backgroundColor={item.id}
            $matchingStatus={item.matchingStatus}
          >
            <div className="box">
              <div className="matching">
                <p className="matchingText">{item.matchingStatus}</p>
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
              <p className="info">{relativeDate(item.createdAt)}</p>
            </div>
          </Wrapper>
        )}
      </React.Fragment>
    ))}
  </Container>
);

export default List;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div<{
  $backgroundColor: number;
  $matchingStatus: string;
}>`
  display: flex;
  flex-direction: column;
  padding: 12px 18px 12px 18px;
  background-color: ${props =>
    props.$matchingStatus === '매칭 완료'
      ? '#F9F9FB' // 매칭 완료일 경우
      : 'white'}; // 매칭 대기

  &:active {
    background-color: ${props =>
      props.$matchingStatus === '매칭 완료' ? 'none' : '#ff696933'};
  }

  &:hover {
    background-color: ${props =>
      props.$matchingStatus === '매칭 완료' ? 'none' : '#ff696933'};
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
    background-color: ${props =>
      props.$matchingStatus === '매칭 완료'
        ? '#7A7A7A'
        : 'rgba(255, 105, 105, 0.2)'};
  }

  .matchingText {
    font-size: 12px;
    color: ${props =>
      props.$matchingStatus === '매칭 완료' ? 'white' : '#FF0000'};
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
`;
