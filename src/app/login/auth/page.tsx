'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Login from '@/components/login';
import Text from '@/components/common/text/Text';
import SignUpHeader from '@/components/register/SignUpHeader';
import SignUpContainer from '@/components/register/SignUpContainer';
import Logo from '@/components/common/ui/LogoIcon';
import BasicButton from '@/components/common/button/Button';
import { loginAPI } from '@/api/auth';
import useUserDataStore from '@/store/user';

export default function LoginAuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const hd = searchParams.get('hd');
  const [isAgree, setIsAgree] = useState(false);
  const [nameAgree, setNameAgree] = useState(false);
  const [genderAgree, setGenderAgree] = useState(false);
  const [majorAgree, setMajorAgree] = useState(false);
  const [emailAgree, setEmailAgree] = useState(false);
  const { setUserData } = useUserDataStore();

  const handleInputChange = (
    setState: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    setState(prev => !prev);
  };

  useEffect(() => {
    if (nameAgree && genderAgree && majorAgree && emailAgree) {
      setIsAgree(true);
    } else {
      setIsAgree(false);
    }
  }, [nameAgree, genderAgree, majorAgree, emailAgree]);

  if (code === null || hd === null) {
    return <Login text="잘못된 접근입니다." />;
  }
  if (hd !== 'hufs.ac.kr') {
    return <Login text="학교 이메일로 로그인해주세요!" />;
  }
  const handleOnClick = async () => {
    const data = await loginAPI(code);
    setUserData(data);
    router.push('/');
  };
  const checkBoxes = [
    { label: '[필수] 이름', state: nameAgree, setState: setNameAgree },
    { label: '[필수] 성별', state: genderAgree, setState: setGenderAgree },
    { label: '[필수] 학과', state: majorAgree, setState: setMajorAgree },
    { label: '[필수] 이메일', state: emailAgree, setState: setEmailAgree },
  ];

  return (
    <SignUpContainer>
      <SignUpHeader>
        <Logo width={118} height={30} />
      </SignUpHeader>
      <Text
        content={'서비스를 이용하기 위한\n동의가 필요합니다.'}
        color="black"
        fontSize="3xl"
        fontWeight="ExtraBold"
        className="mt-12 mb-12 mx-4"
      />
      <div className="flex flex-col mx-4 gap-10">
        {checkBoxes.map((checkBox, index) => (
          <label
            htmlFor={`checkbox-${index}`}
            className="flex items-center w-fit"
            key={checkBox.label}
          >
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              className="w-8 h-8"
              checked={checkBox.state}
              onChange={() => {
                handleInputChange(checkBox.setState);
              }}
            />
            <Text
              content={checkBox.label}
              color="black"
              fontSize="xl"
              fontWeight="SemiBold"
              className="mx-4"
            />
          </label>
        ))}
      </div>
      <div className="mx-4 mt-20">
        <BasicButton
          content="가입하기"
          color={isAgree ? 'red' : 'gray'}
          assetType="Primary"
          size="M"
          isActive={isAgree}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClickEvent={async () => {
            await handleOnClick();
          }}
        />
      </div>
    </SignUpContainer>
  );
}
