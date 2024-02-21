'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainInfo from '@/components/common/modal/MainInfo';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'react-toastify';
import useUserDataStore from '@/store/user';

interface Participant {
  id: number;
  name: string;
  major: string;
  studentNumber: string;
  gender: string;
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
  const userData = useUserDataStore(state => state.userData);

  // 쿼리 받아오기
  const searchParam = useSearchParams();
  const search = parseInt(searchParam.get('id') ?? '', 10);

  // router
  const router = useRouter();

  // NameList 참여자 아이디
  const [returnId, setReturnId] = useState<number[]>([]);

  // 타이틀 입력
  const [title, setTitle] = useState('');
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // 더 보기
  const [isOpenModal, setOpenModal] = useState(false);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };

  // 리스트 받아오기
  const [postInfo, setPostInfo] = useState<ListType | null>(null);

  useEffect(() => {
    axiosInstance
      .get(`apis/api/v1/matchingposts/${search}`)
      .then(res => {
        const { data } = res;
        setPostInfo(data);
      })
      .catch(e => e);
  }, [search]);

  // 훕팅 신청 api
  const onApplyClick = () => {
    if (title.trim() === '') {
      toast.warning('제목을 입력해주세요.');
      return;
    }
    if (postInfo !== null && returnId.length < postInfo.desiredNumPeople) {
      toast.warning('참여자의 정보를 모두 입력해주세요.');
      return;
    }
    if (postInfo !== null && postInfo.gender === userData.gender) {
      toast.error('매칭글과 참여자의 성별이 같아 신청할 수 없습니다.');
      return;
    }
    const RequestData = {
      matchingPostId: search,
      participantIds: returnId,
      title,
    };

    axiosInstance
      .post('/apis/api/v1/matchingrequests', RequestData)
      .then(res => {
        toast.success('훕팅 신청이 완료되었습니다.');
        router.push('/');
      })
      .catch(e => {
        const errorMsg = e.response.data.errorMessages.matchingPost;
        toast.error(errorMsg);
      });
  };

  return (
    <Container>
      <SubHeader
        title="훕팅 참여하기"
        rightButton={{
          content: '❮',
          clickEvent: () => {
            router.back();
          },
        }}
      />
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
          <div className="titlebox">
            <Title
              placeholder="한 줄 소개를 작성해주세요."
              value={title}
              onChange={handleTitleChange}
            />
          </div>
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
              setReturnId={setReturnId}
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
    margin: 10px 0px;
    padding: 0px 22px;
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

const Title = styled.input`
  width: 100%;
  padding: 10px 17px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 10px;
  border: 1px solid #8d8d8d;
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
