import React from 'react';
import Logo from '@/components/common/ui/LogoIcon';
import Text from '@/components/common/text/Text';
import SignUpHeader from '../SignUpHeader';

export const SignupTitle = () => (
  <>
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
  </>
);

export default SignupTitle;
