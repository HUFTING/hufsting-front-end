'use client';

import React, { useState } from 'react';
import useDropdownForm from '@/hooks/useDropdownForm';
import {
  ProfileDropDownData,
  ProfileDropDownInitalState,
} from '@/constants/dropdown';
import SignUpHeader from '@/components/register/SignUpHeader';
import Text from '@/components/common/text/Text';
import SignUpContainer from '@/components/register/SignUpContainer';
import Logo from '@/components/common/ui/LogoIcon';
import UserProfileInput from '@/components/common/input/UserProfileInput';
import UserProfileTextArea from '@/components/common/input/UserProfileTextArea';
import BasicButton from '@/components/common/button/Button';

const Register = () => {
  const [dropDownState, setDropDownState] = useDropdownForm(
    ProfileDropDownInitalState,
  );
  const [textValue, setTextValue] = useState('');
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
        className="mt-12 mb-12 mx-4"
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
        state={textValue}
        setState={setTextValue}
      />
      <div className="mx-4">
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
      </div>
    </SignUpContainer>
  );
};

export default Register;
