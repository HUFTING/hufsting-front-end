'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import NotificationIcon from '@/components/common/ui/NotificationIcon';
import NameList from '@/components/list/NameList';
import BackIcon from '@/components/common/ui/BackIcon';
import BasicButton from '@/components/common/button/Button';
import SmallButtonPlus from '@/components/common/button/SmallButtonPlus';
import SmallButtonMinus from '@/components/common/button/SmallButtonMinus';

const test = [
  {
    id: 100,
    name: '김재우',
    major: '일단 테스트',
    studentNumber: '21학번',
    age: '2002',
    mbti: 'ESFJ',
    content: 'namelist 내 정보 보내는 메시지~',
  },
];

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
  }
  .listbox {
    padding: 30px 30px;
    background-color: #f3f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
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
  .flex {
    display: flex;
    gap: 10px; /* 요소들 사이의 간격 설정 */
    margin-bottom: 20px;
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

const Registerting = () => {
  // const [gender, setGender] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [title, setTitle] = useState<string>(''); // title 상태 추가
  const [kakaoLink, setKakaoLink] = useState<string>('');

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

  // 리스트 받아오기
  /*  useEffect(() => {
    axios
      .get('http://www.hufsting.com:8080/api/v1/matchingposts')
      .then(res => {
        const { data } = res.data;
        setInitialLists(data);
        setFilteredLists(data);
      })
      .catch(e => e);
  }, []); */
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
        <Title>훕팅 등록하기</Title>
      </div>

      <div className="otherInfo">
        <input
          type="text"
          placeholder="  제목을 입력하세요"
          value={title} // title에 입력된 값이 표시되어야 함
          onChange={e => {
            setTitle(e.target.value);
            return undefined;
          }}
          style={{
            border: '2px solid #8D8D8D',
            borderRadius: '5px',
            width: '100%',
            height: '35px',
            marginBottom: '20px',
          }}
        />
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
              isActive // isActive={true}를 isActive로 변경
            />
          </div>
        </div>

        <SubTitle>오픈채팅방 링크 등록</SubTitle>
        <input
          type="text"
          placeholder=" 카카오톡 오픈채팅방 링크 입력"
          value={kakaoLink} // kakaoLink에 입력된 값이 표시되어야 함
          onChange={e => {
            setKakaoLink(e.target.value);
            return undefined;
          }}
          style={{
            border: 'none',
            borderBottom: '2px solid #8D8D8D', // 밑줄 설정
            borderRadius: '0',
            width: '100%',
            height: '35px',
          }}
        />
      </div>

      <div className="listbox">
        <NameList
          desiredNumPeople={total.num}
          participants={test}
          // eslint-disable-next-line react/jsx-boolean-value
          editable={true}
        />
      </div>
      <BasicButtonWrapper>
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="매칭하기"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="100%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};

export default Registerting;
