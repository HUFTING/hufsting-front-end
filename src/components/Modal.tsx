import React, { type PropsWithChildren } from 'react';
import styled from 'styled-components';

interface ModalDefaultType {
  handleMore: () => void;
}

const userInfo = [
  {
    id: 1,
    gender: '여',
    username: '김**',
    major: 'GBT학부',
    stID: 202100000,
    age: 2002,
    mbti: 'ESFJ',
    introduce: '즐거운 훕팅 많이 많이 이용해주세요~',
    public: true,
  },
  {
    id: 2,
    gender: '남',
    username: '원**',
    major: 'GBT학부',
    stID: 202100000,
    age: 2002,
    mbti: 'ESFJ',
    introduce: '즐거운 훕팅 많이 많이 이용해주세요~',
    public: true,
  },
  {
    id: 3,
    gender: '남',
    username: '원**',
    major: 'GBT학부',
    stID: 202100000,
    age: 2002,
    mbti: 'ESFJ',
    introduce: '즐거운 훕팅 많이 많이 이용해주세요~',
    public: true,
  },
];

function Modal({ handleMore }: PropsWithChildren<ModalDefaultType>) {
  return (
    <ModalContainer>
      <Header>
        <span>상대방 정보</span>를 확인해보세요
      </Header>
      <List>
        {userInfo.map((info, index) => (
          <Wrapper key={info.id}>
            <ListBox>
              <Top>
                <div className="name">
                  <p>{info.username}</p>
                </div>
              </Top>
              <Bottom>
                <div className="content">
                  <p className="category">학과*</p>
                  <p className="value">{info.major}</p>
                </div>
                <div className="content">
                  <p className="category">학번</p>
                  <p className="value">{info.stID}</p>
                </div>
                <div className="content">
                  <p className="category">나이</p>
                  <p className="value">{info.age}</p>
                </div>
                <div className="content">
                  <p className="category">MBTI</p>
                  <p className="value">{info.mbti}</p>
                </div>
                <div className="content">
                  <p className="category">소개 글(30자 제한)</p>
                  <p className="value">{info.introduce}</p>
                </div>
              </Bottom>
            </ListBox>
          </Wrapper>
        ))}
      </List>
      <Backdrop
        onClick={(e: React.MouseEvent) => {
          e.preventDefault();
          handleMore();
        }}
      />
    </ModalContainer>
  );
}
export default Modal;

const ModalContainer = styled.div`
  width: 390px;
  height: 83vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 9998;
  background-color: white;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 9999;
`;

const Header = styled.div`
  margin: 40px;
  font-size: 20px;
  font-weight: bold;
  span {
    color: #ff324b;
  }
`;

const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 390px;
  width: 100%;
  overflow: scroll;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 80%;
`;

const ListBox = styled.div`
  margin-bottom: 20px;
  padding: 25px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  .name {
    padding: 0px 8px;
    border-bottom: 1px solid #ff6869;
  }
  .name p {
    font-size: 18px;
  }
`;

const Bottom = styled.form`
  .content {
    display: flex;
  }
  .content:last-child {
    flex-direction: column;
    .category {
      width: 100%;
    }
  }
  .category {
    width: 40px;
    font-size: 16px;
    color: #ff6869;
    margin-right: 11px;
  }
  .value {
    flex: 1;
    font-size: 16px;
  }
`;
