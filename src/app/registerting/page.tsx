'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SmallButtonPlus from '@/components/common/button/SmallButtonPlus';
import SmallButtonMinus from '@/components/common/button/SmallButtonMinus';
import axiosInstance from '@/api/axiosInstance';
import useUserDataStore from '@/store/user';
import { useRouter } from 'next/navigation';
import EffectivenessAlert from '@/components/common/modal/EffectivenessAlert';
import SubHeader from '@/components/common/layout/SubHeader';

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
    margin-bottom: 100px;
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
    gap: 10px;
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
  z-index: 10;
`;

const total = {
  huftingid: 1,
  gender: '남',
  num: 1,
};

const text = {
  subtitle: '훕팅 등록하기',
};

const Registerting = () => {
  const router = useRouter();
  // const [gender, setGender] = useState<string | null>(null);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1);
  const [title, setTitle] = useState<string>(''); // title 상태 추가
  const [kakaoLink, setKakaoLink] = useState<string>('');
  const [returnId, setReturnId] = useState<number[]>([]);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showAlertNumMatch, setShowAlertNumMatch] = useState<boolean>(false);
  const [titleAlert, setTitleAlert] = useState<boolean>(false);
  // const [linkCopyAlert, setLinkCopyAlert] = useState<boolean>(false);
  // 텍스트 설정

  /* const handleCopyLink = () => {
    navigator.clipboard
      .writeText(kakaoLink)
      .then(() => {
        // alert('링크가 클립보드에 복사되었습니다.');
        setLinkCopyAlert(true);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error('링크 복사에 실패했습니다.', error);
      });
  }; */

  const alertModal = () => {
    setShowAlert(true);
  };

  const alertModalNumMatch = () => {
    setShowAlertNumMatch(true);
  };

  const alertTitle = () => {
    setTitleAlert(true);
  };

  const userData = useUserDataStore(state => state.userData);
  const genderData = userData.gender;

  const handleClick = () => {
    // eslint-disable-next-line no-console
    router.push('/myhufting');
  };

  const handleSubmit = async () => {
    try {
      // 제목 유효성 검사
      if (title.trim() === '') {
        // eslint-disable-next-line no-console
        alertTitle();
        return;
      }

      // Gender 유효성 검사
      /* if (genderData !== '남' && genderData !== '여') {
        console.log('성별은 남 또는 여 중 하나여야 합니다.');
        return;
      } */

      // DesiredNumPeople 유효성 검사
      if (numberOfPeople < 1 || numberOfPeople > 4) {
        // eslint-disable-next-line no-console
        return;
      }

      // OpenTalkLink 유효성 검사
      const kakaoLinkRegex = /^https:\/\/open\.kakao\.com\//;
      if (!kakaoLinkRegex.test(kakaoLink)) {
        // eslint-disable-next-line no-console
        alertModal();
        return;
      }

      // ReturnId와 DesiredNumPeople 유효성 검사
      if (returnId.length !== numberOfPeople) {
        // eslint-disable-next-line no-console
        alertModalNumMatch();
        return;
      }

      if (returnId.length === numberOfPeople) {
        const data = {
          title,
          gender: genderData, // 적절한 방식으로 gender 값 설정
          desiredNumPeople: numberOfPeople,
          openTalkLink: kakaoLink,
          participants: returnId,
        };

        const response = await axiosInstance.post(
          '/apis/api/v1/matchingposts',
          data,
        );
        // eslint-disable-next-line no-console
        // console.log(response);

        const roomId = response.data.matchingPostId;
        localStorage.setItem('roomId', roomId);
        // eslint-disable-next-line no-console
        // console.log('훕팅 등록 포스트 요청 성공');
        handleClick(); // myhufting으로의 페이지 이동은 post 요청이 성공했을때 작동
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      // console.log('훕팅 등록 버튼 에러', error);
    }
  };

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

  return (
    <Container>
      <SubHeader
        title={text.subtitle}
        rightButton={{
          content: '❮',
          clickEvent: () => {
            router.back();
          },
        }}
      />
      <div className="otherInfo">
        <input
          type="text"
          placeholder=" 제목을 입력해주세요."
          value={title} // title에 입력된 값이 표시되어야 함
          onChange={e => {
            setTitle(e.target.value);
            return undefined;
          }}
          style={{
            border: '2px solid #8D8D8D',
            borderRadius: '11px',
            width: '100%',
            height: '45px',
            marginBottom: '20px',
            paddingLeft: '8px',
            fontWeight: 'bold',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
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
          placeholder="카카오톡 오픈채팅방 링크 입력"
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
            paddingLeft: '8px',
            marginBottom: '11px',
          }}
        />
        {/* <button type="button" onClick={handleCopyLink}>
          주소 복사
        </button> */}
      </div>

      <div className="listbox">
        <NameList
          desiredNumPeople={total.num}
          participants={test} // 이렇게 놔두기 (건드리지 말것))
          // eslint-disable-next-line react/jsx-boolean-value
          editable={true}
          setReturnId={setReturnId}
        />
      </div>
      <BasicButtonWrapper>
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="훕팅 등록"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClickEvent={handleSubmit}
          isActive
          buttonType="button"
          width="100%"
        />
      </BasicButtonWrapper>
      {/* 모달 렌더링 */}
      {showAlert && (
        <EffectivenessAlert
          message={
            <>
              올바른 오픈 카톡 링크를
              <br />
              입력해주세요.
            </>
          }
          onClose={() => {
            setShowAlert(false);
          }}
        />
      )}
      {/* 모달 렌더링 */}
      {showAlertNumMatch && (
        <EffectivenessAlert
          message={
            <>
              희망 인원 수와
              <br />
              참가자의 수가
              <br />
              일치하지 않습니다.
            </>
          }
          onClose={() => {
            setShowAlertNumMatch(false);
          }}
        />
      )}
      {titleAlert && (
        <EffectivenessAlert
          message={<>제목을 입력해주세요!</>}
          onClose={() => {
            setTitleAlert(false);
          }}
        />
      )}
      {/* {linkCopyAlert && (
        <EffectivenessAlert
          message={
            <>
              링크가 클립보드에
              <br />
              복사되었습니다.
            </>
          }
          onClose={() => {
            setLinkCopyAlert(false);
          }}
        />
      )} */}
    </Container>
  );
};

export default Registerting;
