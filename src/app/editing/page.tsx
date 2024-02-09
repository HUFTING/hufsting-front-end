'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import HamburgerIcon from '@/components/common/ui/HamburgerIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import NotificationIcon from '@/components/common/ui/NotificationIcon';
import NameList from '@/components/list/NameList';
import BackIcon from '@/components/common/ui/BackIcon';
import BasicButton from '@/components/common/button/Button';
// import SmallButtonPlus from '@/components/common/button/SmallButtonPlus';
// import SmallButtonMinus from '@/components/common/button/SmallButtonMinus';
import axiosInstance from '@/api/axiosInstance';
import useUserDataStore from '@/store/user';
// git add

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

const Editing = () => {
  /* const [gender, setGender] = useState<string | null>(null); */
  // const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [kakaoLink, setKakaoLink] = useState<string>('');
  const [returnId, setReturnId] = useState<number[]>([]);

  const userData = useUserDataStore(state => state.userData);
  const genderData = userData.gender;

  const searchParams = useSearchParams();

  const matchingPostId = searchParams.get('id'); // 방의 아이디

  const countNumPeople = searchParams.get('count');
  // eslint-disable-next-line no-console
  console.log(countNumPeople);

  const numberOfPeople = returnId.length;

  const handleSubmit = async () => {
    try {
      if (returnId.length === numberOfPeople) {
        const data = {
          id: matchingPostId,
          gender: genderData, // @/store/user에서 로그인 했을때 저장된 gender값을 가져옴
          desiredNumPeople: countNumPeople,
          openTalkLink: kakaoLink,
          participants: returnId,
        };
        // eslint-disable-next-line no-console
        console.log(data);

        const response = await axiosInstance.patch(
          `/api/v1/matchingposts/${matchingPostId}`,
          data,
        );
        // eslint-disable-next-line no-console
        console.log(response);

        const roomId = response.data.matchingPostId;
        localStorage.setItem('roomId', roomId);
        // eslint-disable-next-line no-console
        console.log('Post request successful');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in handleSubmit:', error);
    }
  };

  const handleDelete = async () => {
    try {
      if (returnId.length === numberOfPeople) {
        const response = await axiosInstance.delete(
          `/apis/api/v1/matchingposts/${matchingPostId}`,
        );
        // eslint-disable-next-line no-console
        console.log(response);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Error in handleSubmit:', error);
    }
  };

  /* const handleIncrement = () => {
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
  }; */

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(kakaoLink)
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
      <div className="otherInfo">
        <SubTitle>희망 인원 수</SubTitle>
        <div className="flex">
          <div className="numberContainer">
            <span>{countNumPeople}</span>
          </div>
          <div className="SmallButtonContainer">
            {/* <SmallButtonMinus
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
            /> */}
          </div>
        </div>

        <OtherInfo>
          <div className="top">
            <SubTitle>오픈채팅방 링크</SubTitle>
            {/* 주소 입력을 위한 input 요소 추가 */}
            <input
              type="text"
              placeholder="  주소를 입력하세요"
              value={kakaoLink}
              onChange={e => {
                setKakaoLink(e.target.value);
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
        <NameList
          desiredNumPeople={
            countNumPeople !== null ? parseInt(countNumPeople, 10) : 0
          }
          participants={test}
          // eslint-disable-next-line react/jsx-boolean-value
          editable={true}
          setReturnId={setReturnId}
        />
      </div>
      <BasicButtonWrapper
        style={{ display: 'flex', justifyContent: 'space-evenly' }}
      >
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="삭제하기"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClickEvent={handleDelete}
          isActive
          buttonType="button"
          width="45"
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="수정완료"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClickEvent={handleSubmit}
          isActive
          buttonType="button"
          width="45"
        />
      </BasicButtonWrapper>
    </Container>
  );
};
export default Editing;
