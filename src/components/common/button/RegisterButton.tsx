import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import RegisterIcon from '../ui/RegisterIcon';

const RegisterButton = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push('/registerting');
  };
  return (
    <Container>
      <ButtonWrapper onClick={handleClick}>
        <RegisterIcon />
        <p>훕팅 등록</p>
      </ButtonWrapper>
    </Container>
  );
};

export default RegisterButton;

const Container = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
`;

const ButtonWrapper = styled.button`
  display: flex;
  padding: 12px 18px;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  height: 50px;
  border-radius: 10px;
  background-color: #ff6969;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  p {
    font-size: 20px;
    color: white;
  }
`;
