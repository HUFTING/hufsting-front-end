'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { FollowerListItemStyle } from '@/styles/followerStyles';
import styled from 'styled-components';
import axiosInstance from '@/api/axiosInstance';

export interface UserInfo {
  id: number;
  name: string;
  email: string;
  photo: string;
  content: string;
}

interface MainInfoProps {
  isModal?: boolean;
  handleMore?: () => void;
  onUserSelect?: (userId: number) => void;
}

const ImportMateModal: React.FC<MainInfoProps> = ({
  isModal,
  handleMore,
  onUserSelect,
}) => {
  const [userList, setUserList] = useState<UserInfo[] | null>(null);

  const getUserList = useCallback(() => {
    axiosInstance
      .get('/apis/api/v1/followingList')
      .then(res => {
        setUserList(res.data);
      })
      .catch(e => e);
  }, [isModal]);

  useEffect(() => {
    getUserList();
  }, [isModal, handleMore, onUserSelect]);

  const handleUserSelect = (userId: number) => {
    onUserSelect?.(userId);
  };

  return (
    <Container>
      {isModal != null && isModal && (
        <Backdrop
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            handleMore != null && handleMore();
          }}
        />
      )}
      {isModal != null && isModal && (
        <ModalContainer>
          <Bar>&nbsp;</Bar>
          <Header>
            <span>메이트</span>를 선택해주세요.
          </Header>
          {userList?.map((user, index) => (
            <FollowerListItemStyle
              key={user.id}
              role="presentation"
              onClick={() => {
                handleUserSelect(user.id);
                if (handleMore !== null && handleMore !== undefined) {
                  handleMore();
                }
              }}
            >
              <div className="photo">
                <Image src={user.photo} layout="fill" alt="mate-photo" />
              </div>
              <div className="user">
                <div>
                  <div>{user.name}</div>
                  <div>{user.content}</div>
                </div>
              </div>
            </FollowerListItemStyle>
          ))}
        </ModalContainer>
      )}
    </Container>
  );
};

export default ImportMateModal;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const ModalContainer = styled.div`
  width: 370px;
  min-height: 200px;
  height: 83vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0px;
  z-index: 9999;
  background-color: #f3f5f7;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  overflow-y: auto;
`;

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
`;

const Bar = styled.div`
  min-width: 46px;
  height: 6px;
  background-color: #c8c8c8;
  border-radius: 50px;
  margin-top: 8px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  font-size: 20px;
  font-weight: bold;

  span {
    color: #ff324b;
  }
`;
