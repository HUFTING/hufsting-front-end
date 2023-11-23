'use client';

import React from 'react';
import Text from '@/components/common/text/Text';
import type { DropDownPropsType } from '@/types/common/dropdown';
import DropDown from '../../common/dropdown/DropDown';

const UserProfileInput = ({
  defaultValue,
  dropDownItems,
}: Omit<DropDownPropsType, 'isBorder'>) => (
  <div className="flex justify-between">
    <Text
      color="black"
      fontSize="lg"
      fontWeight="SemiBold"
      content={defaultValue}
    />
    <DropDown defaultValue={defaultValue} dropDownItems={dropDownItems} />
  </div>
);

export default UserProfileInput;
