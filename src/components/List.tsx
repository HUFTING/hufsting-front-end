import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

interface StyledButtonProps {
  backColor: number;
}

const lists = [
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
    gender: '남',
    username: '김**',
    upload: 1,
  },
  {
    huftingid: 3,
    matching: false,
    title: '모두 같이 훕팅해요~~',
    people: 3,
    gender: '남',
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
    people: 3,
    gender: '남',
    username: '김**',
    upload: 2,
  },
  {
    huftingid: 6,
    matching: true,
    title: '넌 누구니',
    people: 3,
    gender: '남',
    username: '김**',
    upload: 2,
  },
];

const List = () => (
  <Container>
    {lists.map(item => (
      <Wrapper key={item.huftingid} backColor={item.huftingid}>
        <Link
          key={item.huftingid}
          href={{
            pathname: '/detail',
            query: { huftingid: item.huftingid },
          }}
          style={{ width: '100%' }}
        >
          <div className="box">
            <div className="matching">
              <p className="matchingText">
                {item.matching ? '매칭 완료' : '매칭 대기중'}
              </p>
            </div>
          </div>
          <div className="box">
            <p className="title">{item.title}</p>
          </div>
          <div className="box">
            <div className="leftInfo">
              <p className="info">{item.people}명 |</p>
              <p className="info">{item.gender}</p>
              <p className="info">{item.username}</p>
            </div>
            <p className="info">{item.upload}분 전</p>
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
