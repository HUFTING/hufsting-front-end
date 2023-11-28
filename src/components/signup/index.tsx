'use client';

import React from 'react';
import useDropdownForm from '@/hooks/useDropdownForm';
import {
  ProfileDropDownData,
  ProfileDropDownInitalState,
} from '@/constants/dropdown';
import Logo from '../common/ui/LogoIcon';
import Text from '../common/text/Text';
import BasicButton from '../common/button/Button';
import UserProfileInput from './UserProfileInput';
import SignUpHeader from './SignUpHeader';
import SignUpContainer from './SignUpContainer';
import UserProfileTextArea from './UserProfileTextArea';

const Register = () => {
  const [dropDownState, setDropDownState] = useDropdownForm(
    ProfileDropDownInitalState,
  );
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
      {ProfileDropDownData.map(
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
