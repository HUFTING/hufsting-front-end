'use client';

import styled from 'styled-components';
import SubHeader from '@/components/common/layout/SubHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { type AgreedAlarmType } from '@/types/alarm';
import { getAlarmInfoAPI } from '@/api/alarm';
import { toast } from 'react-toastify';
import isAuthError from '@/utils/isAuthError';
import { type AxiosError } from 'axios';
import BasicButton from '@/components/common/button/Button';
// import axiosInstance from '@/api/axiosInstance';

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-image: url('../result.svg');
  background-repeat: no-repeat;
  background-position: 20% 10%;

  .buttonWapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .completeMsg {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .subMsg {
    font-size: 20px;
    margin-bottom: 30px;
  }
`;

const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get('id');
  const [info, setInfo] = useState('');

  useEffect(() => {
    const getAlarmInfo = async () => {
      try {
        const data = (await getAlarmInfoAPI(search ?? '')) as AgreedAlarmType;
        setInfo(data.openTalkLink);
      } catch (e) {
        if (!isAuthError(e as AxiosError)) {
          toast.error('정보를 불러오는데 실패했습니다.');
        }
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    getAlarmInfo();
  }, [search]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(info)
      .then(() => {
        toast.success('링크가 클립보드에 복사되었습니다.');
      })
      .catch(e => toast.error('링크 복사에 실패했습니다.'));
  };

  return (
    <Container>
      <SubHeader
        title="훕팅 완료"
        leftButton={{
          content: '완료',
          clickEvent: () => {
            router.push('/');
          },
        }}
      />
      <Content>
        <p className="completeMsg">❤훕팅완료❤</p>
        <p className="subMsg">아래링크로 접속해 인사를 건네보세요!</p>
        <div className="buttonWapper">
          <BasicButton
            color="red"
            assetType="Primary"
            size="M"
            content="오픈채팅방 링크 복사"
            onClickEvent={handleCopyLink}
            isActive
            width="100%"
          />
          <div style={{ height: '10px' }} />
          <BasicButton
            color="red"
            assetType="Primary"
            size="M"
            content="채팅방 이동"
            onClickEvent={handleCopyLink}
            isActive
            width="100%"
          />
        </div>
      </Content>
    </Container>
  );
};

export default Result;
