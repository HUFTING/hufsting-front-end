'use client';

import React from 'react';
import Text from '@/components/common/text/Text';
import type { UserProfileInputType } from '@/types/common/profile';
import DropDown from '../../common/dropdown/DropDown';

const UserProfileInput = ({
  dropDownState,
  dropDownTitle,
  dropDownName,
  dropDownItems,
  required = false,
  disabled = false,
  onChange,
}: UserProfileInputType) => (
  <div className="flex justify-between my-10">
    <div className="flex">
      <Text
        color="black"
        fontSize="xl"
        fontWeight="ExtraBold"
        content={dropDownTitle}
      />
      {required && (
        <Text color="red" fontSize="lg" fontWeight="ExtraBold" content="*" />
      )}
    </div>
    <DropDown
      dropDownState={dropDownState}
      dropDownItems={dropDownItems}
      dropDownName={dropDownName}
      onChange={onChange}
      disabled={disabled}
    />
  </div>
);

export default UserProfileInput;
