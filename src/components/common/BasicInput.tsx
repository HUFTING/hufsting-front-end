import InputStyle from '@/styles/common/input/InputStyles';
import Image from 'next/image';
import React, { useState } from 'react';
import type { ChangeEvent } from 'react';

interface props {
  placeholder: string;
  searchHandler?: (value: string) => void;
  blurHandler?: (target: ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'number';
  disabled?: boolean;
}

const BasicInput = ({
  placeholder,
  searchHandler,
  blurHandler,
  type = 'text',
  disabled = false,
}: props) => {
  const [value, setValue] = useState<string | null>(null);

  return (
    <InputStyle disabled={disabled}>
      <input
        type={type}
        placeholder={placeholder}
        onChange={e => {
          setValue(e.target.value);
        }}
        onBlur={e => {
          if (blurHandler !== undefined) {
            blurHandler(e);
          }
        }}
        disabled={disabled ? true : disabled}
      />
      <button
        type="button"
        onClick={() => {
          if (searchHandler !== undefined && value !== null) {
            searchHandler(value);
          }
        }}
      >
        <Image src="/Search.svg" width={20} height={20} alt="input-img" />
      </button>
    </InputStyle>
  );
};

export default BasicInput;
