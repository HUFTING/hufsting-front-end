import { type DropDownDataType } from '@/types/common/profile';

export const ProfileData: DropDownDataType[] = [
  { dropDownTitle: '이름', dropDownName: 'name', disabled: true },
  { dropDownTitle: '학과', dropDownName: 'major', disabled: true },
  { dropDownTitle: '이메일 주소', dropDownName: 'email', disabled: true },
];

export const ProfileInitialState = {
  name: '원동현',
  major: '컴퓨터 공학과',
  email: 'dhe7700@naver.com',
};
