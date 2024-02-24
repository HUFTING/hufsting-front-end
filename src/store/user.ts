import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDataType {
  email: string | null;
  name: string | null;
  age: string | null;
  mbti: string | null;
  content: string | null;
  studentNumber: string | null;
  major: string | null;
  gender: string | null;
  profile: string | null;
}

interface IUseUserDataStore {
  userData: UserDataType;
  setUserData: (userData: UserDataType) => void;
  resetUserData: () => void;
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
        age: null,
        mbti: null,
        content: null,
        profile: null,
      },
      setUserData: userData => {
        set({ userData });
      },
      resetUserData: () => {
        set({
          userData: {
            email: null,
            name: null,
            major: null,
            studentNumber: null,
            gender: null,
            age: null,
            mbti: null,
            content: null,
            profile: null,
          },
        });
      },
    }),
    {
      name: 'userDataStorage',
    },
  ),
);

export default useUserDataStore;
