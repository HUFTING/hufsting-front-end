'use client';

import React, { useState } from 'react';
import { ProfileDropDownData } from '@/constants/dropdown';
import useDropdownForm from '@/hooks/useDropdownForm';
import { ProfileInputData } from '@/constants/profile';
import useUserDataStore from '@/store/user';
import { type TotalProfileDataType } from '@/types/user';
import { deleteProfileAPI, updateProfileAPI } from '@/api/user';
import ProfileHeader from '@/components/profile/header';
import { useRouter } from 'next/navigation';
import ProfileContainer from '../register/ProfileContainer';
import UserProfileInput from '../common/input/UserProfileInput';
import UserProfileTextArea from '../common/input/UserProfileTextArea';
import Text from '../common/text/Text';

const Profile = () => {
  const { userData, setUserData, resetUserData } = useUserDataStore();
  const [modalOpen, setModalOpen] = useState(false);
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
  const router = useRouter();
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
  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenOnclick = () => {
    setModalOpen(true);
    // try {
    //   await deleteProfileAPI();
    // } catch (e) {
    //   // console.log(e);
    // }
  };
  const handleDeleteOnclick = async () => {
    setModalOpen(false);
    try {
      await deleteProfileAPI();
      resetUserData();
      router.push('/');
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
      <div className=" cursor-pointer h-full flex justify-center items-center w-full py-4 bg-[#E8E8E8]">
        <Text
          content="탈퇴하기"
          fontWeight="Regular"
          color="red"
          fontSize="lg"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleOpenOnclick}
        />
      </div>
      {modalOpen && (
        <div
          role="presentation"
          onClick={handleCloseModal}
          className=" z-50 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-screen bg-slate-600 bg-opacity-40"
        >
          <div className="bg-white border-2 flex flex-col rounded-lg p-6 w-80  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 relative">
            <Text
              className=""
              content="정말 탈퇴하시겠습니까?"
              fontSize="xl"
              fontWeight="SemiBold"
              color="black"
            />
            <Text
              fontSize="md"
              color="gray"
              content="탈퇴하실 경우, 사용자 정보가 삭제됩니다."
              className="mb-4"
            />
            <button
              type="button"
              onClick={handleCloseModal}
              className=" bg-slate-600 text-white w-full h-10 rounded-lg mb-2"
            >
              취소
            </button>
            <button
              type="button"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={handleDeleteOnclick}
              className="  bg-[#ff6869] text-white w-full h-10 rounded-lg"
            >
              예. 탈퇴하겠습니다.
            </button>
          </div>
        </div>
      )}
    </ProfileContainer>
  );
};

export default Profile;
