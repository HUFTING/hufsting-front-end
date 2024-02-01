import InputStyle from '@/styles/common/input/InputStyles';
import Image from 'next/image';
import React from 'react';
import type { ChangeEvent } from 'react';

interface props {
  placeholder: string;
  changeHandler?: (target: ChangeEvent<HTMLInputElement>) => void;
  blurHandler?: (target: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  disabled?: boolean;
}

const BasicInput = ({
  placeholder,
  changeHandler,
  blurHandler,
  type = 'text',
  disabled = false,
}: props) => {
  console.log('input');

  return (
    <InputStyle disabled={disabled}>
      <Image src="/Search.svg" width={20} height={20} alt="input-img" />
      <input
        type={type}
        placeholder={placeholder}
        onChange={e => {
          if (changeHandler !== undefined) {
            changeHandler(e);
          }
        }}
        onBlur={e => {
          if (blurHandler !== undefined) {
            blurHandler(e);
          }
        }}
        disabled={disabled ? true : disabled}
      />
    </InputStyle>
  );
};

export default BasicInput;
