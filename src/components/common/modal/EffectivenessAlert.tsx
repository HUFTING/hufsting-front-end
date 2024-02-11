import React from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); // 반투명한 회색 배경
  z-index: 999; // 모달보다 앞에 나타나도록
`;

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
  border-radius: 30px;
  z-index: 1000;
`;

const ContentWrapper = styled.div`
  padding: 30px 35px;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 21px;
  font-weight: bold;
`;

const ButtonOk = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: #ff6869;
  color: white;
  font-size: 15px;
  cursor: pointer;
  margin-bottom: 5px;
  margin-top: 13px;
`;
interface EffectivenessAlertProps {
  message: React.ReactNode;
  onClose: () => void;
}

const EffectivenessAlert: React.FC<EffectivenessAlertProps> = ({
  message,
  onClose,
}) => {
  const handleBack = () => {
    onClose();
  };

  return (
    <>
      <Overlay />
      <ModalContainer>
        <ContentWrapper>
          <TitleWrapper>
            <Title>{message}</Title>
          </TitleWrapper>
          <ButtonOk onClick={handleBack}>확인했습니다.</ButtonOk>
        </ContentWrapper>
      </ModalContainer>
    </>
  );
};

export default EffectivenessAlert;
