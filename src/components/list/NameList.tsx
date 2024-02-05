'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface NameListProps {
  desiredNumPeople: number;
}

interface UserInfo {
  id: number;
  gender: string;
  username: string;
  major: string;
  stID: null | number;
  age: null | number;
  mbti: string;
  introduce: string;
  public: boolean;
}

const myInfo = {
  id: 1,
  gender: '여',
  username: '김예은',
  major: 'GBT학부',
  stID: 202100000,
  age: 2002,
  mbti: 'ESFJ',
  introduce: '즐거운 훕팅 많이 많이 이용해주세요~',
  public: true,
};

const NameList = ({ desiredNumPeople }: NameListProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo[]>([]);
  const [edited, setEdited] = useState<boolean[]>([]);

  useEffect(() => {
    const initialUserInfo = Array.from(
      { length: desiredNumPeople },
      (_, index) => ({
        id: index + 1,
        gender: '',
        username: `참가자 ${index + 1}`,
        major: '',
        stID: null,
        age: null,
        mbti: '',
        introduce: '',
        public: false,
      }),
    );
    setUserInfo(initialUserInfo);
    setEdited(Array(desiredNumPeople).fill(false));
  }, [desiredNumPeople]);

  const onClickEditButton = (index: number) => {
    setEdited(prev => prev.map((value, i) => (i === index ? !value : value)));
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
                {edited[index] ? (
                  <input
                    className="p_input"
                    value={info.username}
                    onChange={e => {
                      handleInputChange(index, 'username', e.target.value);
                    }}
                  />
                ) : (
                  <p>{info.username}</p>
                )}
              </div>
              <div className="buttonbox">
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
                    ✏️
                  </button>
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
                    value={info.stID !== null ? info.stID.toString() : ''}
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
                    value={info.introduce}
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
                  <p className="value">{info.stID}</p>
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
                  <p className="value">{info.introduce}</p>
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
