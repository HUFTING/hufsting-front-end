'use client';

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import NotificationIcon from '@/components/common/ui/NotificationIcon';
import NameList from '@/components/list/NameList';
import BackIcon from '@/components/common/ui/BackIcon';
import BasicButton from '@/components/common/button/Button';
import Modal from '@/components/common/modal/MainInfo';
import SmallButtonPlus from '@/components/common/button/SmallButtonPlus';
import SmallButtonMinus from '@/components/common/button/SmallButtonMinus';

// const otherInfo = 'https://open.kakao.com/o/gto74LSf';

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

  .flex {
    display: flex;
    gap: 10px; /* 요소들 사이의 간격 설정 */
    .numberContainer {
      width: 74px;
      height: 30px;
      flex-shrink: 0;
      border-radius: 10px;
      background: #f3f5f7;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .SmallButtonContainer {
      width: 300px;
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
    margin-top: 20px; // 링크와 버튼 사이의 간격 조절
    display: flex;
    flex-direction: column;
    align-items: flex-start; // align-items를 flex-start로 변경
  }
  .top > * {
    margin-bottom: 2px; // SubTitle과 링크 사이의 간격을 조절
  }

  .infobox p {
    font-size: 18px;
  }
`;

/* const More = styled.button`
  font-size: 15px;
  color: #8d8d8d;
`; */

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

const total = {
  huftingid: 1,
  gender: '남',
  num: 1,
};

const Editing = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  /* const [gender, setGender] = useState<string | null>(null); */
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [address, setAddress] = useState<string>('');
  /* const handleGenderSelection = (selectedGender: string) => {
    setGender(selectedGender);
  }; */

  const handleIncrement = () => {
    if (numberOfPeople < 4) {
      setNumberOfPeople(prev => {
        const incrementedValue = prev + 1;
        // total.num을 numberOfPeople과 동일하게 업데이트
        total.num = incrementedValue;
        return incrementedValue;
      });
    }
  };

  const handleDecrement = () => {
    if (numberOfPeople > 1) {
      setNumberOfPeople(prev => {
        const decrementedValue = prev - 1;
        // total.num을 numberOfPeople과 동일하게 업데이트
        total.num = decrementedValue;
        return decrementedValue;
      });
    }
  };

  const handleClick = () => {
    alert('clicked!');
  };
  const handleMore = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(address)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다.');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('링크 복사에 실패했습니다.', error);
      });
  };

  // const [kakaoLink, setKakaoLink] = useState('');

  /* const handleKakaoLinkChange = newLink => {
    setKakaoLink(newLink);
  }; */

  return (
    <Container>
      <Header>
        <LogoIcon width={118} height={30} />
        <div>
          <NotificationIcon />
          <HamburgerIcon />
        </div>
      </Header>
      <div className="titlebox">
        <BackIcon />
        <Title>훕팅 수정</Title>
      </div>
      {isOpenModal && (
        <Modal handleMore={handleMore}>이곳에 children이 들어갑니다.</Modal>
      )}
      <div className="otherInfo">
        <SubTitle>희망 인원 수</SubTitle>
        <div className="flex">
          <div className="numberContainer">
            <span>{numberOfPeople}</span>
          </div>
          <div className="SmallButtonContainer">
            <SmallButtonMinus
              content="-"
              onClickEvent={() => {
                handleDecrement();
              }}
              isActive={false}
            />
            <SmallButtonPlus
              content="+"
              onClickEvent={() => {
                handleIncrement();
              }}
              isActive
            />
          </div>
        </div>

        <OtherInfo>
          <div className="top">
            <SubTitle>오픈채팅방 링크</SubTitle>
            {/* 주소 입력을 위한 input 요소 추가 */}
            <input
              type="text"
              placeholder="  주소를 입력하세요"
              value={address}
              onChange={e => {
                setAddress(e.target.value);
                return undefined; // 명시적으로 void를 반환합니다.
              }}
              style={{
                border: '2px solid #8D8D8D',
                borderRadius: '5px',
                width: '100%',
                height: '35px',
                marginBottom: '20px',
              }}
            />

            {/* <More onClick={handleMore}>더보기</More> */}
          </div>
          {/* 복사 버튼 추가 */}
          <button type="button" onClick={handleCopyLink}>
            주소 복사
          </button>
        </OtherInfo>
      </div>
      <div className="listbox">
        <NameList total={total} />
      </div>
      <BasicButtonWrapper
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <BasicButton
          color="red"
          assetType="Primary"
          size="S"
          content="삭제하기"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="40"
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="S"
          content="수정완료"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="40%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};
export default Editing;
