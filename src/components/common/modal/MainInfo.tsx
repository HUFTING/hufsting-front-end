import NameList from '@/components/list/NameList';
import styled from 'styled-components';

interface UserInfo {
  id: number;
  name: string;
  major: string;
  studentNumber: null | string;
  age: string;
  mbti: string;
  content: string;
}

interface MainInfoProps {
  desiredNumPeople: number;
  isModal?: boolean;
  handleMore?: () => void;
  userInfo: UserInfo[];
}

const MainInfo: React.FC<MainInfoProps> = ({
  desiredNumPeople,
  isModal,
  handleMore,
  userInfo,
}) => (
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
          <span>상대방 정보</span>를 확인해보세요
        </Header>
        <List>
          <NameList
            desiredNumPeople={desiredNumPeople}
            participants={userInfo}
            editable={false}
          />
        </List>
      </ModalContainer>
    )}
  </Container>
);
export default MainInfo;

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

const List = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 390px;
  width: 100%;
  padding: 0px 25px;
`;
