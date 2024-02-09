import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDataType {
  email: string | null;
  name: string | null;
  birthday: string | null;
  mbti: string | null;
  content: string | null;
  studentNumber: string | null;
  major: string | null;
  gender: '남' | '여' | null;
}

interface IUseUserDataStore {
  userData: UserDataType;
  setUserData: (userData: UserDataType) => void;
}

const useUserDataStore = create(
  persist<IUseUserDataStore>(
    set => ({
      userData: {
        email: null,
        name: null,
        major: null,
        studentNumber: null,
        gender: null,
        birthday: null,
        mbti: null,
        content: null,
      },
      setUserData: userData => {
        set(state => ({ ...state.userData, userData }));
      },
    }),
    {
      name: 'userDataStorage',
    },
  ),
);

export default useUserDataStore;
