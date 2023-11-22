import React from 'react';
import LogoIcon from '@/components/common/ui/LogoIcon';
import LoginContainer from '@/components/login/LoginContainer';
import Text from '@/components/common/text/Text';
import GoogleLoginIcon from '@/components/common/ui/GoogleLoginIcon';

export default function LoginPage() {
  return (
    <LoginContainer>
      <LogoIcon />
      <Text
        content="학교 이메일 계정을 통해 로그인하세요."
        color="black"
        fontSize="lg"
        fontWeight="ExtraBold"
        className=" mb-4 mt-4"
      />
      <GoogleLoginIcon />
    </LoginContainer>
  );
}
