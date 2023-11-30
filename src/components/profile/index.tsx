'use client';

import React, { useState } from 'react';
import {
  ProfileDropDownData,
  ProfileDropDownInitalState,
} from '@/constants/dropdown';
import useDropdownForm from '@/hooks/useDropdownForm';
import { ProfileData, ProfileInitialState } from '@/constants/profile';
import ProfileHeader from './header';
import ProfileContainer from '../signup/ProfileContainer';
import UserProfileInput from '../common/input/UserProfileInput';
import UserProfileTextArea from '../common/input/UserProfileTextArea';
import Text from '../common/text/Text';

const Profile = () => {
  const [dropDownState, setDropDownState] = useDropdownForm(
    ProfileDropDownInitalState,
  );
  const [profileInitailState] =
    useState<Record<string, string>>(ProfileInitialState);
  const [isDisable, setIsDisable] = useState(true);
  const [textValue, setTextValue] = useState('초기값');

  const handleEdit = () => {
    setIsDisable(prev => !prev);
  };

  return (
    <ProfileContainer>
      <ProfileHeader isDisable={isDisable} handleEdit={handleEdit} />
      {ProfileData.map(({ dropDownTitle, dropDownName, disabled }) => (
        <UserProfileInput
          key={dropDownTitle}
          dropDownState={profileInitailState[dropDownName]}
          dropDownTitle={dropDownTitle}
          dropDownName={dropDownName}
          disabled={disabled}
        />
      ))}
      <div className="w-full h-4 bg-[#E8E8E8]" />
      {ProfileDropDownData.map(
        ({ dropDownTitle, dropDownName, dropDownItems, required }) => (
          <UserProfileInput
            key={dropDownTitle}
            dropDownTitle={dropDownTitle}
            dropDownState={dropDownState[dropDownName]}
            dropDownName={dropDownName}
            dropDownItems={dropDownItems}
            required={required}
            onChange={setDropDownState}
            disabled={isDisable}
          />
        ),
      )}
      <div className="w-full h-4 bg-[#E8E8E8] mb-4" />
      <UserProfileTextArea
        disabled={isDisable}
        titleContent="한줄 정보"
        subTitleContent="매칭 상대방이 확인할 수 있습니다"
        state={textValue}
        setState={setTextValue}
      />
      <div className="h-full flex justify-center items-center w-full py-4 bg-[#E8E8E8]">
        <Text
          content="탈퇴하기"
          fontWeight="Regular"
          color="red"
          fontSize="lg"
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('탈퇴하기');
          }}
        />
      </div>
    </ProfileContainer>
  );
};

export default Profile;
