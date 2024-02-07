'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface NameListProps {
  desiredNumPeople: number;
  participants: UserInfo[];
  editable: boolean;
}

interface UserInfo {
  id: null | number;
  name: string;
  major: string;
  studentNumber: null | string;
  age: null | number;
  mbti: string;
  content: string;
}

const myInfo = {
  id: 1,
  name: '김**',
  major: 'GBT학부',
  studentNumber: '202100000',
  age: 2002,
  mbti: 'ESFJ',
  content: 'namelist 내 정보 보내는 메시지~',
};

const NameList = ({
  desiredNumPeople,
  participants,
  editable,
}: NameListProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [edited, setEdited] = useState<boolean[]>([]);

  useEffect(() => {
    if (editable) {
      const initialUserInfo = Array.from(
        { length: desiredNumPeople },
        (_, index) => ({
          id: null,
          name: `참가자 ${index + 1}`,
          major: '',
          studentNumber: null,
          age: null,
          mbti: '',
          content: '',
        }),
      );
      setUserInfo(initialUserInfo);
      setEdited(Array(desiredNumPeople).fill(false));
    } else {
      setUserInfo(participants);
    }
  }, [desiredNumPeople, editable, participants]);

  const onClickEditButton = (index: number) => {
    if (index === 0) {
      setEdited(prev => prev.map((value, i) => (i === index ? !value : value)));
      // window.location.href = 'http://localhost:3000/친구등록';
    } else {
      alert('친구 등록 페이지로 이동');
      // window.location.href = 'http://localhost:3000/친구등록';
    }
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    setUserInfo(prev =>
      prev.map((user, i) => (i === index ? { ...user, [field]: value } : user)),
    );
  };

  const handleComplete = (index: number) => {
    const currentInfo = userInfo[index];
    if (currentInfo.major === '') {
      alert('학과는 필수 입력 항목입니다.');
      return;
    }
    setEdited(prev => prev.map((value, i) => (i === index ? !value : value)));
  };

  const handleImportClick = (index: number) => {
    if (index === 0) {
      loadMyInfo(index);
    } else {
      // 아이디로 상대방 정보 불러오는 api
      loadUserInfoById(index);
    }
  };

  const loadMyInfo = (index: number) => {
    setUserInfo(prev =>
      prev.map((user, i) => (i === index ? { ...user, ...myInfo } : user)),
    );
  };

  const loadUserInfoById = (index: number) => {
    const userId = prompt('아이디를 입력하세요.');
    alert(userId);
  };

  return (
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
                      handleInputChange(index, 'username', e.target.value);
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
                      {index === 0 ? '내 정보 불러오기' : '아이디로 불러오기'}
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
                        onClick={() => {
                          onClickEditButton(index);
                        }}
                      >
                        {index === 0 ? '✏️' : '친구 등록하기'}
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
                      handleInputChange(index, 'stID', e.target.value);
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
                      handleInputChange(index, 'introduce', e.target.value);
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
      margin-right: 20px;
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
