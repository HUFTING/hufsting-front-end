'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import SearchIcon from '@/components/common/ui/SearchIcon';
import NameList from '@/components/NameList';
import BackIcon from '@/components/common/ui/BackIcon';
/* import BasicButton from '@/components/common/button/Button'; */
import Modal from '@/components/Modal';

// 오픈 채팅방 링크
const otherInfo = 'https://open.kakao.com/o/gto74LSf';

const total = {
  huftingid: 1,
  gender: '남',
  num: 2,
};

const Detail = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  /* const handleClick = () => {
    alert('clicked!');
  }; */

  const handleMore = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <Container>
      <Header>
        <LogoIcon width={118} height={30} />
        <div>
          <SearchIcon />
          <HamburgerIcon />
        </div>
      </Header>
      <div className="titlebox">
        <BackIcon />
        <Title>훕팅 완료</Title>
      </div>
      <p>
        ❤️훕팅완료❤️
        <br />
        아래링크로 접속해 인사를 나눠보세요
      </p>
      {isOpenModal && (
        <Modal handleMore={handleMore}>이곳에 children이 들어갑니다.</Modal>
      )}
      <div className="otherInfo">
        {/* <SubTitle>성별</SubTitle>
        <div className="genderbox">
          <p>{total.gender}성</p>
      </div> */}
        <OtherInfo>
          <div className="top">
            <SubTitle>오픈채팅방 링크</SubTitle>
            <a href={otherInfo} target="_blank" rel="noopener noreferrer">
              {otherInfo}
            </a>
            <More onClick={handleMore}>더 보기</More>
          </div>
        </OtherInfo>
      </div>
      <div className="listbox">
        <p className="essential">필수 참가 인원 {total.num}인</p>
        <NameList total={total} />
      </div>
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center; // 텍스트를 가운데 정렬
    margin-bottom: 20px; // 아래에 여백 추가
  }
  .titlebox {
    padding: 2px 22px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .otherInfo {
    padding: 25px 22px;
    display: flex;
    flex-direction: column;
    align-items: flex-start; // align-items를 flex-start로 변경
    .genderbox {
      margin-bottom: 20px;
      width: 70px;
      height: 30px;
      background-color: #f3f5f7;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .top {
      margin-top: 20px; // 링크와 버튼 사이의 간격 조절
      display: flex;
      flex-direction: column;
      align-items: flex-start; // align-items를 flex-start로 변경
    }
    .infobox p {
      font-size: 18px;
    }
  }
  .listbox {
    padding: 30px 30px;
    background-color: #f3f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .essential {
      font-size: 22px;
      font-weight: bold;
      color: #ff324b;
      margin-bottom: 30px;
    }
  }
`;

const Header = styled.div`
  width: 100%;
  padding: 0px 18px;
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
  width: 100%;
  display: flex;
  justify-content: center;
  color: black;
  font-size: 25px;
  font-weight: bold;
`;

const SubTitle = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const OtherInfo = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .infobox p {
    font-size: 18px;
  }
`;

const More = styled.button`
  font-size: 15px;
  color: #8d8d8d;
`;

/* const BasicButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`; */
