'use client';

// import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import MainInfo from '@/components/common/modal/MainInfo';
// import axiosInstance from '@/api/axiosInstance';

const postInfo = {
  id: 1,
  content: '야호',
  matchingStatus: '매칭 대기 중',
  title: 'string',
  desiredNumPeople: 3,
  gender: '남',
  authorName: 'string',
};

const userInfo = [
  {
    id: 1,
    name: '김**',
    major: 'GBT학부',
    studentNumber: '202100000',
    age: '2002',
    mbti: 'ESFJ',
    content: '디테일에서 보내는 메시지~',
  },
  {
    id: 2,
    name: '원**',
    major: 'GBT학부',
    studentNumber: '202100000',
    age: '2002',
    mbti: 'ESFJ',
    content: '즐거운 훕팅 많이 많이 이용해주세요~',
  },
  {
    id: 3,
    name: '밍**',
    major: '묘묘',
    studentNumber: '2323',
    age: '2002',
    mbti: 'ESFJ',
    content: '세 번째 데이터~',
  },
];

const Accept = () => {
  // 쿼리 받아오기
  // const searchParams = useSearchParams();
  // const search = searchParams.get('id');

  // 더 보기
  const [isOpenModal, setOpenModal] = useState(false);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };

  // 리스트 받아오기
  //   const [postInfo, setPostInfo] = useState<ListType | null>(null);

  //   useEffect(() => {
  // axiosInstance
  //       .get(`http://www.hufsting.com:8080/api/v1/matchingposts/${search}`)
  //       .then(res => {
  //         const data = res.data;
  //         setPostInfo(data);
  //       });
  //     // .catch(error => {
  //     //   console.error('Error fetching data:', error);
  //     // });
  //   }, [search]);

  return (
    <Container>
      <MainHeader />
      <SubHeader title="훕팅 신청 목록" />
      {/* {postInfo && ( */}
      <>
        {isOpenModal && (
          <MainInfo
            desiredNumPeople={postInfo.desiredNumPeople}
            handleMore={handleMore}
            isModal={isOpenModal}
            userInfo={userInfo}
          />
        )}

        <Title>{postInfo.title}</Title>
        <div className="otherInfo">
          <OtherInfo>
            <div className="top">
              <SubTitle>상대 정보</SubTitle>
              <More onClick={handleMore}>더 보기</More>
            </div>
            {userInfo.map(info => (
              <div className="infobox" key={info.id}>
                <p>
                  {info.name} _ {info.major}
                </p>
              </div>
            ))}
          </OtherInfo>
        </div>
        <div className="listbox">
          <NameList
            desiredNumPeople={userInfo.length}
            participants={userInfo}
            editable={false}
          />
        </div>
        <BasicButtonWrapper>
          <BasicButton
            color="gray"
            assetType="Primary"
            size="M"
            content="거절하기"
            onClickEvent={() => {}}
            isActive
            width="48%"
          />
          {/* <Link
            href={{
              pathname: '/result',
              // query: { id:  },
            }}
          > */}
          <BasicButton
            color="red"
            assetType="Primary"
            size="M"
            content="수락하기"
            onClickEvent={() => {}}
            isActive
            width="48%"
          />
          {/* </Link> */}
        </BasicButtonWrapper>
      </>
      {/* )} */}
    </Container>
  );
};

export default Accept;

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  .otherInfo {
    padding: 10px 22px 20px 22px;
  }

  .listbox {
    padding: 30px 30px;
    background-color: #f3f5f7;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const Title = styled.p`
  padding: 10px 22px;
  font-size: 20px;
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
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;
