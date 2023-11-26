'use client';

import React from 'react';
import Text from '@/components/common/text/Text';
import type { DropDownPropsType } from '@/types/common/dropdown';
import DropDown from '../../common/dropdown/DropDown';

const UserProfileInput = ({
  defaultValue,
  dropDownItems,
  required = false,
}: Omit<DropDownPropsType, 'isBorder'>) => (
  <div className="flex justify-between my-10">
    <div className="flex">
      <Text
        color="black"
        fontSize="xl"
        fontWeight="ExtraBold"
        content={defaultValue}
      />
      {required && (
        <Text color="red" fontSize="lg" fontWeight="ExtraBold" content="*" />
      )}
    </div>
    <DropDown defaultValue={defaultValue} dropDownItems={dropDownItems} />
  </div>
);

export default UserProfileInput;
