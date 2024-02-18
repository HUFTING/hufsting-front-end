/* eslint-disable @typescript-eslint/no-misused-promises */

'use client';

import React from 'react';
import Text from '@/components/common/text/Text';
import { useRouter } from 'next/navigation';
import BackIcon from '../../common/ui/BackIcon';
import ProfileHeaderSection from './styles';

const ProfileHeader = ({
  isDisable,
  handleEdit,
}: {
  isDisable: boolean;
  handleEdit: () => Promise<void>;
}) => {
  const router = useRouter();
  const handleOnClick = async () => {
    if (isDisable) {
      // api call
      // eslint-disable-next-line no-console
      console.log('저장');
    }
    await handleEdit();
  };
  return (
    <ProfileHeaderSection>
      <button
        type="button"
        onClick={() => {
          router.back();
        }}
      >
        <BackIcon />
      </button>
      <div role="presentation" onClick={handleOnClick}>
        <Text
          color="black"
          fontSize="lg"
          fontWeight="ExtraBold"
          content={isDisable ? '수정' : '저장'}
        />
      </div>
    </ProfileHeaderSection>
  );
};

export default ProfileHeader;
