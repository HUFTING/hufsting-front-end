import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserDataType {
  email: string | null;
  name: string | null;
  birth: string | null;
  mbti: string | null;
  introduce: string | null;
  classOf: string | null;
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
        classOf: null,
        gender: null,
        birth: null,
        mbti: null,
        introduce: null,
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
