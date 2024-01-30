'use client';

import React from 'react';
import Text from '@/components/common/text/Text';
import BackIcon from '../../common/ui/BackIcon';
import ProfileHeaderSection from './styles';

const ProfileHeader = ({
  isDisable,
  handleEdit,
}: {
  isDisable: boolean;
  handleEdit: () => void;
}) => {
  const handleOnClick = () => {
    if (isDisable) {
      // api call
      // eslint-disable-next-line no-console
      console.log('저장');
    }
    handleEdit();
  };
  return (
    <ProfileHeaderSection>
      <BackIcon />
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
