'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainInfo from '@/components/common/modal/MainInfo';
import { useRouter, useSearchParams } from 'next/navigation';
import axiosInstance from '@/api/axiosInstance';
import { type NewAlarmType } from '@/types/alarm';
import { getAlarmInfoAPI } from '@/api/alarm';
import isAuthError from '@/utils/isAuthError';
import { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

const NewRequestPage = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const from = searchParams.get('from');
  const router = useRouter();

  const [isOpenModal, setOpenModal] = useState(false);
  const [postInfo, setPostInfo] = useState<NewAlarmType | null>(null);

  const handleMore = () => {
    setOpenModal(!isOpenModal);
  };

  useEffect(() => {
    const getAlarmInfo = async () => {
      try {
        if (from === 'alarm') {
          const data = (await getAlarmInfoAPI(search ?? '')) as NewAlarmType;
          setPostInfo(data);
        } else {
          axiosInstance
            .get(`/apis/api/v1/come-matchingrequests/${search}`)
            .then(res => {
              const { data } = res;
              setPostInfo(data);
            })
            .catch(e => e);
        }
      } catch (e) {
        if (!isAuthError(e as AxiosError)) {
          toast.error('정보를 불러오는데 실패했습니다.');
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAlarmInfo();
  }, [search]);

  const handleReject = () => {
    axiosInstance
      .patch(
        `/apis/api/v1/matchingrequests/${postInfo?.matchingRequestId}/reject`,
      )
      .then(res => {
        toast.success('상대방의 매칭을 거절했습니다.');
        router.push(`/myhufting`);
      })
      .catch(e => {
        if (!isAuthError(e as AxiosError)) {
          toast.error('다시 시도해주세요.');
        }
      });
  };

  const handleAccept = () => {
    axiosInstance
      .patch(
        `/apis/api/v1/matchingrequests/${postInfo?.matchingRequestId}/accept`,
      )
      .then(res => {
        toast.success('수락되었습니다.');
        const id = res.data.alarmId;
        router.push(`/result?id=${id}`);
      })
      .catch(e => {
        if (!isAuthError(e as AxiosError)) {
          toast.error('다시 시도해주세요.');
        }
      });
  };

  return (
    <Container>
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
            <NameList
              desiredNumPeople={postInfo.hosts.length}
              participants={postInfo.hosts}
              editable={false}
            />
          </div>
          {postInfo.matchingAcceptance === '매칭 대기' && (
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
          )}
        </>
      )}
    </Container>
  );
};

export default NewRequestPage;

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
