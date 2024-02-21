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
// import axiosInstance from '@/api/axiosInstance';

const Container = styled.div`
  padding: 33px 0 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    text-align: center;
  }
  .titlebox {
    padding: 2px 22px;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .otherInfo {
    padding: 40px 30px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .top {
      display: flex;
      justify-content: space-between;
    }

    a {
      text-decoration: underline;
    }
  }
  .HuftingComplete {
    margin-top: 28px;
    margin-bottom: 10px;
    color: #ff6869;
    text-align: center;
    font-family: Inter;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
  .SayHi {
    color: #000;
    font-family: Inter;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }
`;

const SubTitle = styled.p`
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
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
      <p className="HuftingComplete">❤훕팅완료❤</p>
      <p className="SayHi">아래링크로 접속해 인사를 건네보세요!</p>
      <div className="otherInfo">
        <div className="top">
          <SubTitle>오픈채팅방 링크</SubTitle>
          <button type="button" onClick={handleCopyLink}>
            주소 복사
          </button>
        </div>
        {/* 복사 버튼 추가 */}
        <a href={info} target="_blank" rel="noopener noreferrer">
          {info}
        </a>
      </div>
    </Container>
  );
};

export default Result;
