'use client';

import MainHeader from '@/components/common/layout/MainHeader';
import SubHeader from '@/components/common/layout/SubHeader';
import BackIcon from '@/components/common/ui/BackIcon';
import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import styled from 'styled-components';
import NameList from '@/components/list/NameList';
import BasicButton from '@/components/common/button/Button';
import Modal from '@/components/common/modal/MainInfo';

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

const ApplyListPage = () => {
  const router = useRouter();
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const handleClick = () => {
    alert('clicked!');
  };

  const handleMore = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const leftButton = {
    content: <BackIcon />,
    clickEvent: () => {
      router.back();
    },
  };
  return (
    <Container>
      <MainHeader />
      <SubHeader title="새로운 훕팅 신청" rightButton={leftButton} />
      {isOpenModal && <Modal handleMore={handleMore} isModal />}
      <div className="otherInfo">
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
        <NameList total={total} />
      </div>
      <BasicButtonWrapper>
        <BasicButton
          color="gray"
          assetType="Primary"
          size="M"
          content="거절하기"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="100%"
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="M"
          content="매칭하기"
          onClickEvent={handleClick}
          isActive
          buttonType="button"
          width="100%"
        />
      </BasicButtonWrapper>
    </Container>
  );
};
export default ApplyListPage;

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
    align-items: center;
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
  gap: 10px;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  max-width: 390px;
  bottom: 0;
  padding: 22px;
  z-index: 1000;
`;
