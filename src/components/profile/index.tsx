'use client';

import React, { useState } from 'react';
import { ProfileDropDownData } from '@/constants/dropdown';
import useDropdownForm from '@/hooks/useDropdownForm';
import { ProfileInputData } from '@/constants/profile';
import useUserDataStore from '@/store/user';
import { type TotalProfileDataType } from '@/types/user';
import { deleteProfileAPI, updateProfileAPI } from '@/api/user';
import ProfileHeader from '@/components/profile/header';
import ProfileContainer from '../register/ProfileContainer';
import UserProfileInput from '../common/input/UserProfileInput';
import UserProfileTextArea from '../common/input/UserProfileTextArea';
import Text from '../common/text/Text';

const Profile = () => {
  const { userData, setUserData } = useUserDataStore();
  const dropDownInitialState = {
    gender: userData.gender,
    studentNumber: userData.studentNumber,
    mbti: userData.mbti,
    age: userData.age,
  };
  const profileInitailState = {
    name: userData.name,
    major: userData.major,
    email: userData.email,
  };
  const [dropDownState, setDropDownState] =
    useDropdownForm(dropDownInitialState);
  const [profileState] = useState<TotalProfileDataType>(profileInitailState);
  const [isDisable, setIsDisable] = useState(true);
  const [textValue, setTextValue] = useState(userData.content ?? '');

  const handleEdit = async () => {
    setIsDisable(prev => !prev);
    try {
      await updateProfileAPI({
        ...dropDownState,
        content: textValue,
      });
      setUserData({
        ...userData,
        ...dropDownState,
        content: textValue,
      });
    } catch (e) {
      // console.log(e);
    }
  };
  const handleDeleteOnclick = async () => {
    try {
      await deleteProfileAPI();
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <ProfileContainer>
      <ProfileHeader isDisable={isDisable} handleEdit={handleEdit} />
      {ProfileInputData.map(({ dropDownTitle, dropDownName, disabled }) => (
        <UserProfileInput
          key={dropDownTitle}
          dropDownState={profileState[dropDownName]}
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
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleDeleteOnclick}
        />
      </div>
    </ProfileContainer>
  );
};

export default Profile;
