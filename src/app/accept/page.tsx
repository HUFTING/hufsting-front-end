'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import MainInfo from '@/components/common/modal/MainInfo';
// import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';

interface ParticipantInfo {
  id: number;
  name: string;
  major: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}

interface PostInfo {
  matchingRequestId: number;
  matchingRequestTitle: string;
  participants: ParticipantInfo[];
  hosts: ParticipantInfo[];
}

const Accept = () => {
  // 쿼리 받아오기
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // const router = useRouter();

  // 더 보기
  const [isOpenModal, setOpenModal] = useState(false);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };
  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/apis/api/v1/come-matchingrequests/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(e => e);
  }, [search]);

  // 거절하기
  const handleReject = () => {
    // axiosInstance.patch(`/api/v1/matchingrequests/${search}/reject`).then(res => {router.push(`/myhufting`);})
  };

  // 수락하기
  const handleAccept = () => {
    // axiosInstance.patch(`/api/v1/matchingrequests/${search}/accept`).then(res => {router.push(`/result?id=${search}`);})
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="훕팅 신청 목록" />
      {postInfo !== null && (
        <>
          {isOpenModal && (
            <MainInfo
              desiredNumPeople={postInfo.participants.length}
              handleMore={handleMore}
              isModal={isOpenModal}
              userInfo={postInfo.participants}
            />
          )}
          <Title>{postInfo.matchingRequestTitle}</Title>
          <div className="otherInfo">
            <OtherInfo>
              <div className="top">
                <SubTitle>상대 정보</SubTitle>
                <More onClick={handleMore}>더 보기</More>
              </div>
              {postInfo.hosts.map(info => (
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
              desiredNumPeople={postInfo.hosts.length}
              participants={postInfo.hosts}
              editable={false}
            />
          </div>
          <BasicButtonWrapper>
            <BasicButton
              color="gray"
              assetType="Primary"
              size="M"
              content="거절하기"
              onClickEvent={handleReject}
              isActive
              width="48%"
            />
            <BasicButton
              color="red"
              assetType="Primary"
              size="M"
              content="수락하기"
              onClickEvent={handleAccept}
              isActive
              width="48%"
            />
          </BasicButtonWrapper>
        </>
      )}
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
