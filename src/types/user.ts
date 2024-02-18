export interface LoginUserDataType {
  email: string | null;
  name: string | null;
  major: string | null;
  profileSetUpStatus: boolean;
  accessToken: string | null;
}

export interface TotalProfileDataType extends EnteredProfileDataType {
  name: string | null;
  email: string | null;
  major: string | null;
}
export interface EnteredProfileDataType {
  gender?: string | null;
  studentNumber?: string | null;
  mbti?: string | null;
  age?: string | null;
  content?: string | null;
}

export interface DropDownProfileDataType {
  gender: string | null;
  studentNumber: string | null;
  mbti: string | null;
  age: string | null;
}

// '남', '여'만 가능
// 학번은 '00학번'만 가능
// mbti는 실제로 존재하는 mbti만 가능 예를들어 AAAA 안됨
// 생일 '0000-00-00' 형태
