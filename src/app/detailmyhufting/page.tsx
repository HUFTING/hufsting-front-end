'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styled from 'styled-components';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import ClipboardCopy from '@/components/copy/Copy';
import NameList from '@/components/list/NameList';
import axiosInstance from '@/api/axiosInstance';
import ApplyList from '@/components/list/ApplyList';
// import useUserDataStore from '@/store/user';
// import LoginAlert from '@/components/common/modal/LoginAlert';

interface Hosts {
  id: number;
  name: string;
  major: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}

interface ApplyLists {
  matchingRequestId: number;
  matchingRequestTitle: string;
}

interface ListType {
  id: number;
  content: string;
  matchingStatus: string; //
  title: string;
  desiredNumPeople: number; //
  gender: string; //
  authorName: string;
  openKakaoTalk: string; //
  matchingHosts: Hosts[]; //
  matchingRequestsCount: number;
  matchingRequests: ApplyLists[]; //
}

const MyDetail = () => {
  // 쿼리 받아오기
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  // const userData = useUserDataStore(state => state.userData);

  // router
  const router = useRouter();

  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<ListType | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`/apis/api/v1/my-matchingposts/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(error => {
        alert(
          `데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.${error}`,
        );
      });
  }, [search]);

  // 매칭 글 삭제
  const handleRemove = () => {
    axiosInstance
      .delete(`/apis/api/v1/matchingposts/${search}`)
      .then(res => res)
      .catch(e => e);
  };

  const handleEdit = () => {
    postInfo !== null &&
      router.push(`/editing?id=${search}?count=${postInfo.desiredNumPeople}`);
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="내가 올린 훕팅" />
      {postInfo !== null && (
        <div className="otherInfo">
          <SubTitle>희망 인원 수</SubTitle>
          <div className="desiredNumPeople">
            <p>{postInfo.desiredNumPeople}</p>
          </div>
          <OtherInfo>
            <div className="top">
              <SubTitle>오픈채팅방 링크</SubTitle>
              <ClipboardCopy text={postInfo.openKakaoTalk} />
            </div>
            <p>{postInfo.openKakaoTalk}</p>
            <div className="bottom">
              <SubTitle>훕팅 신청 {postInfo.matchingRequestsCount}건</SubTitle>
              <ApplyList
                lists={postInfo.matchingRequests}
                pathnameProp="/accept"
              />
            </div>
          </OtherInfo>
        </div>
      )}
      {postInfo !== null && (
        <div className="listbox">
          <NameList
            desiredNumPeople={postInfo.desiredNumPeople}
            participants={postInfo.matchingHosts}
            editable={false}
          />
        </div>
      )}
      <BasicButtonWrapper>
        <BasicButton
          color="gray"
          assetType="Primary"
          size="M"
          content="삭제하기"
          onClickEvent={handleRemove}
          isActive
          width="48%"
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="수정하기"
          onClickEvent={handleEdit}
          isActive
          width="48%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};

export default MyDetail;

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .otherInfo {
    padding: 25px 22px;

    .desiredNumPeople {
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
    align-items: center;
  }

  .bottom {
    margin-top: 15px;
  }
`;

const BasicButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;
