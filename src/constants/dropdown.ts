import { type DropDownDataType } from '@/types/common/profile';

const currentYear = new Date().getFullYear();

// 배열 초기화
const years = [];

// 반복문으로 배열에 현재 년도부터 1996년까지의 년도를 추가
// eslint-disable-next-line no-plusplus
for (let year = currentYear; year - 20 >= 1996; year--) {
  // 현재 년도에서 20년 전의 년도를 계산하여 배열에 추가
  const twentyYearsAgo = year - 20;
  years.push(twentyYearsAgo.toString());
}

const studentNumber = [];
// eslint-disable-next-line no-plusplus
for (let year = currentYear; year >= 2017; year--) {
  studentNumber.push(`${(year - 2000).toString()}학번`);
}

export const ProfileDropDownInitalState = {
  gender: null,
  mbti: null,
  studentNumber: null,
  age: null,
};

export const ProfileDropDownData: DropDownDataType[] = [
  {
    dropDownTitle: '성별',
    dropDownName: 'gender',
    dropDownItems: ['남', '여'],
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
    dropDownItems: studentNumber,
  },
  {
    dropDownTitle: '출생년도',
    dropDownName: 'age',
    dropDownItems: years,
  },
];
