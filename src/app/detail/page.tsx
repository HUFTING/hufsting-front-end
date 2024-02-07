'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import MainInfo from '@/components/common/modal/MainInfo';

interface Participant {
  id: number;
  name: string;
  major: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}

interface ListType {
  id: number;
  content: string;
  matchingStatus: boolean;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  participants: Participant[];
}

const Detail = () => {
  // 쿼리 받아오기
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // 더 보기
  const [isOpenModal, setOpenModal] = useState(false);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };

  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<ListType | null>(null);

  useEffect(() => {
    axios
      .get(`http://www.hufsting.com:8080/api/v1/matchingposts/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(error => {
        // 사용자에게 오류 메시지를 표시하는 대신 다른 작업을 수행할 수 있습니다.
        alert(
          `데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.${error}`,
        );
      });
  }, [search]);

  // 훕팅 신청 api
  const onApplyClick = () => {
    const RequestData = {
      matchingPostId: search,
      participantIds: [1], // 수정 필요
    };

    axios
      .post('http://www.hufsting.com:8080/api/v1/matchingrequests', RequestData)
      .then(res => {
        // console.log(res.data);
        window.location.href = 'http://localhost:3000/result';
      })
      .catch(error => {
        // 사용자에게 오류 메시지를 표시하는 대신 다른 작업을 수행할 수 있습니다.
        alert(
          `데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.${error}`,
        );
      });
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="훕팅 참여하기" />
      {postInfo !== null && (
        <>
          {isOpenModal && (
            <MainInfo
              desiredNumPeople={postInfo.desiredNumPeople}
              handleMore={handleMore}
              isModal={isOpenModal}
              userInfo={postInfo.participants}
            />
          )}

          <Title>{postInfo.title}</Title>
          <div className="otherInfo">
            <SubTitle>성별</SubTitle>
            <div className="genderbox">
              <p>{postInfo.gender}성</p>
            </div>
            <OtherInfo>
              <div className="top">
                <SubTitle>상대 정보</SubTitle>
                <More onClick={handleMore}>더 보기</More>
              </div>
              {postInfo.participants.map(info => (
                <div className="infobox" key={info.id}>
                  <p>
                    {info.name} _ {info.major}
                  </p>
                </div>
              ))}
            </OtherInfo>
          </div>
          <div className="listbox">
            <p className="essential">
              필수 참가 인원 {postInfo.desiredNumPeople}인
            </p>
            <NameList
              desiredNumPeople={postInfo.desiredNumPeople}
              participants={postInfo.participants}
              editable
            />
          </div>
          <BasicButtonWrapper>
            <BasicButton
              color="red"
              assetType="Primary"
              size="M"
              content="훕팅 신청"
              onClickEvent={onApplyClick}
              isActive
              buttonType="button"
              width="100%"
            />
          </BasicButtonWrapper>
        </>
      )}
    </Container>
  );
};

export default Detail;

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 50px;

  .titlebox {
    padding: 2px 22px;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .otherInfo {
    padding: 10px 22px 20px 22px;

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
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;
