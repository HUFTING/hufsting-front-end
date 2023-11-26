import React, { useState } from 'react';
import { BasicModalStyle } from '@/styles/common/layout/layoutStyles';
import BasicButton from '../button/Button';

interface props {
  addEvent: (value: string) => void;
}

const AddFollowingModal = ({ addEvent }: props) => {
  const [value, setValue] = useState('');
  return (
    <BasicModalStyle>
      <section className="modal">
        <div className="text-xl">이메일로 파트너 추가</div>
        <input
          value={value}
          onChange={e => {
            setValue(e.target.value);
          }}
        />
        <BasicButton
          color="red"
          assetType="Primary"
          size="S"
          content="등록하기"
          onClickEvent={() => {
            addEvent(value);
          }}
          isActive
          width="12.5rem"
        />
      </section>
    </BasicModalStyle>
  );
};

export default AddFollowingModal;
