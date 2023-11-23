'use client';

import React from 'react';
import RegisterHeader from './RegisterHeader';
import Logo from '../common/ui/LogoIcon';
import Text from '../common/text/Text';
import RegisterContainer from './RegisterContainer';
import BasicButton from '../common/button/Button';
import UserProfileInput from './UserProfileInput';

const DropDownItems = ['남성', '여성'];

const Register = () => (
  <RegisterContainer>
    <RegisterHeader>
      <Logo width={118} height={30} />
    </RegisterHeader>
    <Text
      content={'서비스를 이용하기 위한\n정보를 입력해주세요.'}
      color="black"
      fontSize="3xl"
      fontWeight="ExtraBold"
      className="mt-12 mb-12"
    />
    <UserProfileInput defaultValue="성별" dropDownItems={DropDownItems} />
    <BasicButton
      content="저장하기"
      color="red"
      assetType="Primary"
      size="M"
      onClickEvent={() => {}}
      isActive
    />
  </RegisterContainer>
);

export default Register;
