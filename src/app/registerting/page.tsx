'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import SearchIcon from '@/components/common/ui/SearchIcon';
import NameList from '@/components/NameList';
import BackIcon from '@/components/common/ui/BackIcon';
import BasicButton from '@/components/common/button/Button';
import Modal from '@/components/Modal';
import SmallButton from '@/components/common/button/SmallButton';

/* const otherInfo = [
  {
    id: 1,
    username: '김**',
    major: 'Global Business%Technology 학부',
  },
  {
    id: 2,
    username: '원**',
    major: '수학과',
  },
]; */

const total = {
  huftingid: 1,
  gender: '남',
  num: 2,
};

const Registerting = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [gender, setGender] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);

  const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleIncrement = () => {
    setNumberOfPeople(prev => prev + 1);
  };

  const handleDecrement = () => {
    setNumberOfPeople(prev => prev - 1);
  };

  const handleClick = () => {
    alert('clicked!');
  };
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
        <Title>훕팅 등록</Title>
      </div>
      {isOpenModal && (
        <Modal handleMore={handleMore}>이곳에 children이 들어갑니다.</Modal>
      )}
      <div className="otherInfo">
        <SubTitle>성별</SubTitle>

        <div className="flex">
          <SmallButton
            content="남성"
            onClickEvent={() => {
              handleGenderSelection('남성');
            }}
            isActive={gender === '남성'}
          />

          <SmallButton
            content="여성"
            onClickEvent={() => {
              handleGenderSelection('여성');
            }}
            isActive={gender === '여성'}
          />
        </div>
        {/* <div className="genderbox"><p>{total.gender}성</p></div> */}
        <SubTitle>희망 인원 수</SubTitle>
        <div className="flex">
          <span>{numberOfPeople}</span>
          <SmallButton
            content="+"
            onClickEvent={() => {
              handleIncrement();
            }}
            isActive // isActive={true}를 isActive로 변경
          />

          <SmallButton
            content="-"
            onClickEvent={() => {
              handleDecrement();
            }}
            isActive={false}
          />
        </div>

        {/* <OtherInfo>
          <div className="top">
            <SubTitle>상대 정보</SubTitle>
            <More onClick={handleMore}>더 보기</More>
          </div>
          {otherInfo.map(info => (
            <div className="infobox" key={info.id}>
              <p>
                {info.username} _ {info.major}
              </p>
            </div>
          ))}
          </OtherInfo> */}
      </div>
      <div className="listbox">
        <p className="essential">필수 참가 인원 {total.num}인</p>
        <NameList total={total} />
      </div>
      <BasicButtonWrapper>
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="등록하기"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="100%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .titlebox {
    padding: 2px 22px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .otherInfo {
    padding: 25px 22px;
    .genderbox {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70px;
      height: 30px;
      background-color: #f3f5f7;
      border-radius: 10px;
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

/*
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
*/

const BasicButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;

export default Registerting;
