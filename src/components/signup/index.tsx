'use client';

import React, { useReducer } from 'react';
import { type DropDownDataType } from '@/types/common/profile';
import Logo from '../common/ui/LogoIcon';
import Text from '../common/text/Text';
import BasicButton from '../common/button/Button';
import UserProfileInput from './UserProfileInput';
import SignUpHeader from './SignUpHeader';
import SignUpContainer from './SignUpContainer';
import UserProfileTextArea from './UserProfileTextArea';

const DropDownData: DropDownDataType[] = [
  {
    dropDownTitle: '성별',
    dropDownName: 'gender',
    dropDownItems: ['남성', '여성'],
    disabled: true,
    required: true,
  },
  {
    dropDownTitle: 'MBTI',
    dropDownName: 'mbti',
    dropDownItems: [
      'ISTJ',
      'ISFJ',
      'INFJ',
      'INTJ',
      'ISTP',
      'ISFP',
      'INFP',
      'INTP',
      'ESTP',
      'ESFP',
      'ENFP',
      'ENTP',
      'ESTJ',
      'ESFJ',
      'ENFJ',
      'ENTJ',
    ],
  },
  {
    dropDownTitle: '학번',
    dropDownName: 'studentNumber',
    dropDownItems: ['17이하', '18', '19', '20', '21', '22', '23'],
  },
  {
    dropDownTitle: '생년월일',
    dropDownName: 'birthday',
    dropDownItems: [
      '1995이하',
      '1996',
      '1997',
      '1998',
      '1999',
      '2000',
      '2001',
      '2002',
      '2003',
    ],
  },
];
export type FormInitialStateType = Record<string, string>;
export interface actionType {
  name: string;
  value: string;
}

const initalState = {
  gender: '',
  mbti: '',
  studentNumber: '',
  birthday: '',
  content: '',
};
const reducer = (state: FormInitialStateType, action: actionType) => ({
  ...state,
  [action.name]: action.value,
});

const Register = () => {
  const [dropDownState, setDropDownState] = useReducer(reducer, initalState);
  // console.log(dropDownState);
  return (
    <SignUpContainer>
      <SignUpHeader>
        <Logo width={118} height={30} />
      </SignUpHeader>
      <Text
        content={'서비스를 이용하기 위한\n정보를 입력해주세요.'}
        color="black"
        fontSize="3xl"
        fontWeight="ExtraBold"
        className="mt-12 mb-12"
      />
      {DropDownData.map(
        ({
          dropDownTitle,
          dropDownName,
          dropDownItems,
          required,
          disabled = false,
        }) => (
          <UserProfileInput
            key={dropDownTitle}
            dropDownTitle={dropDownTitle}
            dropDownState={dropDownState[dropDownName]}
            dropDownName={dropDownName}
            dropDownItems={dropDownItems}
            required={required}
            onChange={setDropDownState}
            disabled={disabled}
          />
        ),
      )}
      <UserProfileTextArea
        titleContent="한줄 정보"
        subTitleContent="매칭 상대방이 확인할 수 있습니다"
      />
      <BasicButton
        content="저장하기"
        color="red"
        assetType="Primary"
        size="M"
        onClickEvent={() => {
          // eslint-disable-next-line no-console
        }}
        isActive
      />
    </SignUpContainer>
  );
};

export default Register;
