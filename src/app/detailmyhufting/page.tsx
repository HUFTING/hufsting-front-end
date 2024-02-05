'use client';

import React from 'react';
import styled from 'styled-components';
import BasicButton from '@/components/common/button/Button';
import SubHeader from '@/components/common/layout/SubHeader';
import MainHeader from '@/components/common/layout/MainHeader';
import ClipboardCopy from '@/components/copy/Copy';

const total = {
  huftingid: 1,
  gender: '남',
  num: 2,
  openlink: 'open.kakao.com/o/gto74LSf',
};

const MyDetail = () => {
  const handleRemove = () => {
    alert('삭제!');
  };

  const handleEdit = () => {
    alert('수정!');
  };

  return (
    <Container>
      <MainHeader />
      <SubHeader title="내가 올린 훕팅" />
      <div className="otherInfo">
        <SubTitle>희망 인원 수</SubTitle>
        <div className="genderbox">
          <p>{total.num}</p>
        </div>
        <OtherInfo>
          <div className="top">
            <SubTitle>오픈채팅방 링크</SubTitle>
            <ClipboardCopy text={total.openlink} />
          </div>
          <p>{total.openlink}</p>
        </OtherInfo>
      </div>
      <div className="listbox" />
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
