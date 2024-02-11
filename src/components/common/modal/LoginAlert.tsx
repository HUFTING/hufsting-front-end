import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';

const LoginAlert = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <ModalContainer>
      <CloseButton onClick={handleClose}>×</CloseButton>
      <ContentWrapper>
        <TitleWrapper>
          <Title>
            로그인이 필요한
            <br />
            서비스입니다.
          </Title>
          <Subtitle>로그인 하시겠습니까?</Subtitle>
        </TitleWrapper>
        <ButtonLogin onClick={handleLogin}>로그인 하러 가기</ButtonLogin>
      </ContentWrapper>
    </ModalContainer>
  );
};

export default LoginAlert;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  max-height: 80vh;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  opacity: 0.5;
  border-radius: 30px;
  z-index: 1000;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 35px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  padding: 30px 35px;
`;

const TitleWrapper = styled.div`
  text-align: left;
`;

const Title = styled.p`
  font-size: 23px;
  font-weight: bold;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #999;
  margin: 25px 0px;
`;

const ButtonLogin = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #ff6869;
  color: white;
  font-size: 20px;
  cursor: pointer;
  margin-bottom: 5px;
`;
