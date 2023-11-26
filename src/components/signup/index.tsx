'use client';

import React from 'react';
import Logo from '../common/ui/LogoIcon';
import Text from '../common/text/Text';
import BasicButton from '../common/button/Button';
import UserProfileInput from './UserProfileInput';
import SignUpHeader from './SignUpHeader';
import SignUpContainer from './SignUpContainer';

const DropDownData = [
  {
    defaultValue: '성별',
    dropDownItems: ['남성', '여성'],
    required: true,
  },
  {
    defaultValue: 'MBTI',
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
    defaultValue: '학번',
    dropDownItems: ['17이하', '18', '19', '20', '21', '22', '23'],
  },
  {
    defaultValue: '생년월일',
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
    inputType: 'date',
  },
];
const Register = () => (
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
      ({ defaultValue, dropDownItems, required, inputType }) => (
        <UserProfileInput
          key={defaultValue}
          defaultValue={defaultValue}
          dropDownItems={dropDownItems}
          required={required}
        />
      ),
    )}
    <BasicButton
      content="저장하기"
      color="red"
      assetType="Primary"
      size="M"
      onClickEvent={() => {}}
      isActive
    />
  </SignUpContainer>
);

export default Register;
