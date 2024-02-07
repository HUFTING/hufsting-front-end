'use client';

// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import MainInfo from '@/components/common/modal/MainInfo';

const otherInfo = [
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
];

const total = {
  huftingid: 1,
  gender: '남',
  num: 2,
};

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
];

const Detail = () => {
  // const router = useRouter();
  // const { query } = router;
  // const matchingPostId = query.matchingPostId;
  // console.log(matchingPostId);

  // 더 보기
  const [isOpenModal, setOpenModal] = useState(false);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };

  // 리스트 받아오기
  // useEffect(() => {
  //   // get
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://www.hufsting.com:8080/api/v1/matchingposts/${matchingPostId}`,
  //         {
  //           method: 'GET',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //         },
  //       );
  //       if (!response.ok) {
  //         throw new Error('error');
  //       }

  //       const data = await response.json();

  //     } catch (error) {
  //       console.error('데이터를 가져오는 동안 오류 발생:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <Container>
      <MainHeader />
      <SubHeader title="훕팅 참여하기" />
      {isOpenModal && (
        <MainInfo
          handleMore={handleMore}
          isModal={isOpenModal}
          userInfo={userInfo}
        />
      )}
      <div className="otherInfo">
        <SubTitle>성별</SubTitle>
        <div className="genderbox">
          <p>{total.gender}성</p>
        </div>
        <OtherInfo>
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
        </OtherInfo>
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
          content="매칭하기"
          onClickEvent={null}
          isActive
          buttonType="button"
          width="100%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};

export default Detail;

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

const SubTitle = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const OtherInfo = styled.div`
  .top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .infobox p {
    font-size: 18px;
  }
`;

const More = styled.button`
  font-size: 15px;
  color: #8d8d8d;
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
