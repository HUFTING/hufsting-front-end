'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axiosInstance from '@/api/axiosInstance';
import { toast } from 'react-toastify';
import useUserDataStore from '@/store/user';
import ImportMateModal from '../common/modal/ImportMateModal';

interface NameListProps {
  desiredNumPeople: number;
  participants: UserInfo[];
  editable: boolean;
  setReturnId?: React.Dispatch<React.SetStateAction<number[]>>;
  onEditButton?: boolean;
}

interface UserInfo {
  id: number;
  name: string;
  major: string;
  gender?: string;
  studentNumber: string;
  age: string;
  mbti: string;
  content: string;
}

const NameList = ({
  desiredNumPeople,
  participants,
  editable,
  setReturnId,
  onEditButton = false,
}: NameListProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [edited, setEdited] = useState<boolean[]>([]);
  const userData = useUserDataStore(state => state.userData);

  // 초기 유저 정보
  useEffect(() => {
    if (editable && onEditButton) {
      const modifiedParticipants = modifyParticipants(participants);
      setUserInfo(modifiedParticipants);
      setEdited(Array(desiredNumPeople).fill(false));
    } else if (editable && !onEditButton) {
      const existInfoNum = userInfo.filter(
        user => !user.name.includes('참가자'),
      ).length;
      const additionalUserInfoCount = desiredNumPeople - existInfoNum;
      if (additionalUserInfoCount < 0) {
        setUserInfo(prevUserInfo => prevUserInfo.slice(0, desiredNumPeople));
      } else {
        const initialUserInfo = Array.from(
          { length: additionalUserInfoCount },
          (_, index) => ({
            id: existInfoNum + index,
            name: `참가자 ${existInfoNum + index + 1}`,
            major: '',
            gender: '',
            studentNumber: '',
            age: '',
            mbti: '',
            content: '',
          }),
        );
        setUserInfo(prevUserInfo => [
          ...prevUserInfo.slice(0, existInfoNum),
          ...initialUserInfo,
        ]);
        setEdited(Array(desiredNumPeople).fill(false));
      }
    } else if (participants.length > 0) {
      const modifiedParticipants = modifyParticipants(participants);
      setUserInfo(modifiedParticipants);
      if (userInfo.length > 0) {
        setUserInfo(prevUserInfo => prevUserInfo.slice(0, desiredNumPeople));
      }
    } else {
      const initialUserInfo = Array.from(
        { length: desiredNumPeople },
        (_, index) => ({
          id: index,
          name: `참가자 ${index + 1}`,
          major: '',
          gender: '',
          studentNumber: '',
          age: '',
          mbti: '',
          content: '',
        }),
      );
      setUserInfo(initialUserInfo);
    }
  }, [desiredNumPeople, editable, participants, onEditButton]);

  // 초기 참가자 아이디 return
  useEffect(() => {
    const participantIds = participants.map(participant => participant.id);
    if (setReturnId !== undefined) {
      setReturnId(participantIds);
    }
  }, [participants, setReturnId]);

  // 개인 정보 수정해서 반환
  const modifyUserInfo = (data: UserInfo) => ({
    ...data,
    gender: data.gender ?? '비공개',
    studentNumber: data.studentNumber ?? '비공개',
    mbti: data.mbti ?? '비공개',
    content: data.content ?? '비공개',
    age: data.age !== null ? `${data.age}년` : '비공개',
  });

  // 참가자'들' 정보 수정해서 반환
  const modifyParticipants = (partips: UserInfo[]) =>
    partips.map(partip => modifyUserInfo(partip));

  // 정보 불러오기 버튼
  const handleImportClick = (index: number) => {
    if (index === 0) {
      loadMyInfo(index);
    }
  };

  // 내 정보 불러오기
  const loadMyInfo = (index: number) => {
    axiosInstance
      .get('/apis/api/v1/profile')
      .then(res => {
        const { data } = res;
        const modifiedData = modifyUserInfo(data);
        setUserInfo(prev =>
          prev.map((user, i) =>
            i === index ? { ...user, ...modifiedData } : user,
          ),
        );
        if (setReturnId !== undefined) {
          setReturnId(prevIds => {
            const newIdList = [...prevIds];
            newIdList[index] = data.id;
            return newIdList;
          });
        }
      })
      .catch(e => e);
  };

  // 메이트 선택하기(모달)
  const [isOpenModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number>();
  const [mateIndex, setMateIndex] = useState<number>(1);

  const handleMore = () => {
    setOpenModal(prev => !prev);
  };

  // 아이디로 친구 정보 불러오기
  const loadUserInfoById = (index: number) => {
    axiosInstance
      .get(`/apis/api/v1/member/${selectedUserId}`)
      .then(res => {
        const { data } = res;
        const modifiedData = modifyUserInfo(data);
        if (modifiedData.gender !== userData.gender) {
          if (modifiedData.gender === '비공개') {
            toast.warning('메이트의 성별을 확인할 수 없습니다.');
            return;
          }
          toast.warning('같은 성별의 메이트를 추가해주세요.');
          return;
        }
        setUserInfo(prev =>
          prev.map((user, i) =>
            i === index ? { ...user, ...modifiedData } : user,
          ),
        );

        if (setReturnId !== undefined) {
          setReturnId(prevIds => {
            const newIdList = [...prevIds];
            newIdList[index] = data.id;
            return newIdList;
          });
          // }
        }
      })
      .catch(e => e);
  };

  // 내용 변경 감지
  const handleInputChange = (index: number, field: string, value: string) => {
    setUserInfo(prev =>
      prev.map((user, i) => (i === index ? { ...user, [field]: value } : user)),
    );
  };

  // 수정하기 or 메이트 불러오기 버튼
  const onClickEditButton = (index: number) => {
    if (index === 0) {
      setEdited(prev => prev.map((value, i) => (i === index ? !value : value)));
    } else {
      setMateIndex(index);
      setOpenModal(true);
    }
  };

  // 메이트 정보 불러오기
  useEffect(() => {
    if (selectedUserId !== undefined) {
      loadUserInfoById(mateIndex);
      setSelectedUserId(undefined);
    }
  }, [isOpenModal]);

  // 정보 수정 후 완료
  const handleComplete = (index: number) => {
    const currentInfo = userInfo[index];
    if (currentInfo.major === '') {
      toast.warning('학과 정보는 필수 입력 사항입니다.');
      return;
    }
    setEdited(prev => prev.map((value, i) => (i === index ? !value : value)));

    const ageWithoutYear = currentInfo.age.replace('년', '');
    const updateInfo = {
      ...currentInfo,
      gender: currentInfo.gender,
      age: ageWithoutYear,
      studentNumber: currentInfo.studentNumber,
      mbti: currentInfo.mbti,
      content: currentInfo.content,
    };

    updateProfile(updateInfo);
  };

  // 프로필 수정 함수
  const updateProfile = (updatedInfo: UserInfo) => {
    axiosInstance
      .put('/apis/api/v1/profile', updatedInfo)
      .then(res => res)
      .catch(e => e);
  };

  return (
    <>
      {isOpenModal && (
        <ImportMateModal
          handleMore={handleMore}
          isModal={isOpenModal}
          onUserSelect={setSelectedUserId}
        />
      )}
      <Container>
        {userInfo.map((info, index) => (
          <Wrapper key={info.id}>
            <ListBox>
              <Top>
                <div className="name">
                  {editable && edited[index] ? (
                    <input
                      className="p_input"
                      value={info.name}
                      onChange={e => {
                        handleInputChange(index, 'name', e.target.value);
                      }}
                    />
                  ) : (
                    <p>{info.name}</p>
                  )}
                </div>
                <div className="buttonbox">
                  {editable && (
                    <>
                      <button
                        type="button"
                        className="import"
                        onClick={() => {
                          handleImportClick(index);
                        }}
                      >
                        {index === 0 ? '내 정보 불러오기' : ''}
                      </button>
                      {edited[index] ? (
                        <button
                          type="submit"
                          className="edit"
                          onClick={() => {
                            handleComplete(index);
                          }}
                        >
                          완료
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="edit"
                          style={{ color: index === 0 ? '#8d8d8d' : '#FF6869' }}
                          onClick={() => {
                            onClickEditButton(index);
                          }}
                        >
                          {index === 0 ? '✏️' : '메이트 불러오기'}
                        </button>
                      )}
                    </>
                  )}
                </div>
              </Top>
              {edited[index] ? (
                <Bottom>
                  <div className="content">
                    <p className="category">학과*</p>
                    <input
                      className="value_input"
                      value={info.major}
                      onChange={e => {
                        handleInputChange(index, 'major', e.target.value);
                      }}
                    />
                  </div>
                  <div className="content">
                    <p className="category">학번</p>
                    <input
                      className="value_input"
                      value={
                        info.studentNumber !== null
                          ? info.studentNumber.toString()
                          : ''
                      }
                      onChange={e => {
                        handleInputChange(
                          index,
                          'studentNumber',
                          e.target.value,
                        );
                      }}
                    />
                  </div>
                  <div className="content">
                    <p className="category">나이</p>
                    <input
                      className="value_input"
                      value={info.age !== null ? info.age.toString() : ''}
                      onChange={e => {
                        handleInputChange(index, 'age', e.target.value);
                      }}
                    />
                  </div>
                  <div className="content">
                    <p className="category">MBTI</p>
                    <input
                      className="value_input"
                      value={info.mbti}
                      onChange={e => {
                        handleInputChange(index, 'mbti', e.target.value);
                      }}
                    />
                  </div>
                  <div className="content">
                    <p className="category">소개 글(30자 제한)</p>
                    <input
                      className="value_input"
                      value={info.content}
                      onChange={e => {
                        handleInputChange(index, 'content', e.target.value);
                      }}
                      maxLength={30}
                    />
                  </div>
                </Bottom>
              ) : (
                <Bottom>
                  <div className="content">
                    <p className="category">학과*</p>
                    <p className="value">{info.major}</p>
                  </div>
                  <div className="content">
                    <p className="category">학번</p>
                    <p className="value">{info.studentNumber}</p>
                  </div>
                  <div className="content">
                    <p className="category">나이</p>
                    <p className="value">{info.age}</p>
                  </div>
                  <div className="content">
                    <p className="category">MBTI</p>
                    <p className="value">{info.mbti}</p>
                  </div>
                  <div className="content">
                    <p className="category">소개 글(30자 제한)</p>
                    <p className="value">{info.content}</p>
                  </div>
                </Bottom>
              )}
            </ListBox>
          </Wrapper>
        ))}
      </Container>
    </>
  );
};

export default NameList;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 390px;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const ListBox = styled.div`
  margin-bottom: 20px;
  padding: 25px;
  width: 100%;
  border-radius: 30px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  background-color: white;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

  .name {
    padding: 0px 8px;
    border-bottom: 1px solid #ff6869;
  }

  .name p {
    font-size: 18px;
  }

  .p_input {
    width: 60px;
    font-size: 18px;
  }

  .buttonbox {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .import {
      margin-right: 14px;
      font-size: 13px;
      color: #8d8d8d;
    }

    .edit {
      font-size: 13px;
      color: #8d8d8d;
    }
  }
`;

const Bottom = styled.form`
  .content {
    display: flex;
  }

  .content:last-child {
    flex-direction: column;

    .category {
      width: 100%;
    }
  }

  .category {
    width: 40px;
    font-size: 16px;
    color: #ff6869;
    margin-right: 11px;
  }

  .value {
    flex: 1;
    font-size: 16px;
  }

  .value_input {
    min-height: 1rem;
    flex: 1;
    font-size: 16px;
    border-bottom: 1px solid #c8c8c8;
  }
`;
