import { type DropDownDataType } from '@/types/common/profile';

export const ProfileDropDownInitalState = {
  gender: '',
  mbti: '',
  studentNumber: '',
  birthday: '',
  content: '',
};

export const ProfileDropDownData: DropDownDataType[] = [
  {
    dropDownTitle: '성별',
    dropDownName: 'gender',
    dropDownItems: ['남성', '여성'],
    required: true,
    // disabled true이면 선택할 수 없음
    // disabled: true,
  },
  {
    dropDownTitle: 'MBTI',
    dropDownName: 'mbti',
    dropDownItems: [
      'ISTJ',
      'ISFJ',
      'INFJ',
      'INTJ',
      'ISTP',
      'ISFP',
      'INFP',
      'INTP',
      'ESTP',
      'ESFP',
      'ENFP',
      'ENTP',
      'ESTJ',
      'ESFJ',
      'ENFJ',
      'ENTJ',
    ],
  },
  {
    dropDownTitle: '학번',
    dropDownName: 'studentNumber',
    dropDownItems: ['23', '22', '21', '20', '19', '18', '17이하'],
  },
  {
    dropDownTitle: '생년월일',
    dropDownName: 'birthday',
    dropDownItems: [
      '2003',
      '2002',
      '2001',
      '2000',
      '1999',
      '1998',
      '1997',
      '1996이하',
    ],
  },
];
