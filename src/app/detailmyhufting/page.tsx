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
import useUserDataStore from '@/store/user';

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
  matchingStatus: string;
  title: string;
  desiredNumPeople: number;
  gender: string;
  authorName: string;
  openKakaoTalk: string;
  matchingHosts: Hosts[];
  matchingRequestsCount: number;
  matchingRequests: ApplyLists[];
  representativeEmail: string;
}

interface TextType {
  isEdit: boolean;
  subtitle: string;
  buttonleft: string;
  buttonright: string;
}

const MyDetail = () => {
  // 쿼리 받아오기
  const searchParams = useSearchParams();
  const search = searchParams.get('id');

  const userData = useUserDataStore(state => state.userData);

  // NameList 참여자 아이디
  const [returnId, setReturnId] = useState<number[]>([]);

  // router
  const router = useRouter();

  // 텍스트 설정
  const [text, setText] = useState<TextType>({
    isEdit: false,
    subtitle: '내가 올린 훕팅',
    buttonleft: '삭제하기',
    buttonright: '수정하기',
  });

  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<ListType | null>(null);
  const [openTalkLink, setOpenTalkLink] = useState(postInfo?.openKakaoTalk);

  useEffect(() => {
    axiosInstance
      .get(`/apis/api/v1/my-matchingposts/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(e => e);
  }, [search]);

  // 매칭 글 삭제
  const handleRemove = () => {
    axiosInstance
      .delete(`/apis/api/v1/matchingposts/${search}`)
      .then(res => res)
      .catch(e => e);
  };

  // 매칭 글 수정
  const handleEdit = () => {
    setOpenTalkLink(postInfo?.openKakaoTalk);
    setText({
      isEdit: true,
      subtitle: '훕팅 수정',
      buttonleft: '취소하기',
      buttonright: '수정완료',
    });
  };

  // 수정 저장
  const handleSave = () => {
    setText({
      isEdit: false,
      subtitle: '내가 올린 훕팅',
      buttonleft: '삭제하기',
      buttonright: '수정하기',
    });
    const requestData = {
      id: postInfo?.id,
      gender: postInfo?.gender,
      desiredNumPeople: postInfo?.desiredNumPeople,
      openTalkLink,
      participants: returnId,
    };

    axiosInstance
      .put(`/api/v1/matchingposts/${search}`, requestData)
      .then(res => res)
      .catch(e => e);
  };

  // 수정 취소
  const handleCancel = () => {
    setText({
      isEdit: false,
      subtitle: '내가 올린 훕팅',
      buttonleft: '삭제하기',
      buttonright: '수정하기',
    });
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader
        title={text.subtitle}
        rightButton={{
          content: '❮',
          clickEvent: () => {
            router.back();
          },
        }}
      />
      {postInfo !== null && (
        <div className="otherInfo">
          <SubTitle>희망 인원 수</SubTitle>
          <div className="desiredNumPeople">
            <p>{postInfo.desiredNumPeople}</p>
          </div>
          <OtherInfo>
            {text.isEdit ? (
              <div className="editTop">
                <SubTitle>오픈채팅방 링크</SubTitle>
                <input
                  type="text"
                  value={openTalkLink}
                  placeholder="카카오톡 오픈채팅방 링크 입력"
                  onChange={e => {
                    setOpenTalkLink(e.target.value);
                  }}
                />
              </div>
            ) : (
              <>
                <div className="top">
                  <SubTitle>오픈채팅방 링크</SubTitle>
                  <ClipboardCopy text={postInfo.openKakaoTalk} />
                </div>
                <p>{postInfo.openKakaoTalk}</p>
              </>
            )}
            {!text.isEdit && (
              <div className="bottom">
                <SubTitle>
                  훕팅 신청 {postInfo.matchingRequestsCount}건
                </SubTitle>
                <ApplyList
                  lists={postInfo.matchingRequests}
                  pathnameProp="/accept"
                  representativeEmail={postInfo.representativeEmail}
                  matchingStatus={postInfo.matchingStatus}
                />
              </div>
            )}
          </OtherInfo>
        </div>
      )}
      {postInfo !== null && (
        <div className="listbox">
          <NameList
            desiredNumPeople={postInfo.desiredNumPeople}
            participants={postInfo.matchingHosts}
            editable={text.isEdit}
            setReturnId={setReturnId}
            onEditButton
          />
        </div>
      )}
      {postInfo !== null &&
        postInfo.representativeEmail === userData.email &&
        postInfo?.matchingStatus === '매칭 대기' && (
          <BasicButtonWrapper>
            <BasicButton
              color="gray"
              assetType="Primary"
              size="M"
              content={text.buttonleft}
              onClickEvent={() => {
                if (text.isEdit) {
                  handleCancel();
                } else {
                  handleRemove();
                }
              }}
              isActive
              width="48%"
            />
            <BasicButton
              color="red"
              assetType="Primary"
              size="M"
              content={text.buttonright}
              onClickEvent={() => {
                if (text.isEdit) {
                  handleSave();
                } else {
                  handleEdit();
                }
              }}
              isActive
              width="48%"
            />
          </BasicButtonWrapper>
        )}
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
  .editTop {
    width: 80%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid black;
  }
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
