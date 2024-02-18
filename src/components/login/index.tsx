'use client';

import React from 'react';
import LogoIcon from '@/components/common/ui/LogoIcon';
import Text from '@/components/common/text/Text';
import GoogleLoginIcon from '@/components/common/ui/GoogleLoginIcon';
import Link from 'next/link';
import { LoginSection } from './styles';

const Login = ({
  text = '학교 이메일 계정을 통해 로그인하세요.',
}: {
  text?: string;
}) => (
  <LoginSection>
    <LogoIcon />
    <Text
      content={text}
      color="black"
      fontSize="lg"
      fontWeight="ExtraBold"
      className=" mb-4 mt-4"
    />
    <Link
      href={`https://accounts.google.com/o/oauth2/auth?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}`}
    >
      <GoogleLoginIcon />
    </Link>
  </LoginSection>
);

export default Login;
