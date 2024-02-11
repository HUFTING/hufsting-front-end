'use client';

import { getProfileAPI, loginAPI } from '@/api/user';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Login from '@/components/login';
import useUserDataStore from '@/store/user';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const hd = searchParams.get('hd');
  const { setUserData, userData } = useUserDataStore();

  useEffect(() => {
    const login = async () => {
      if (code === null || hd === null) {
        return;
      }
      if (hd !== 'hufs.ac.kr') {
        return;
      }
      const data = await loginAPI(code);
      const loginUserData = {
        ...userData,
        email: data.email,
        name: data.name,
        major: data.major,
      };
      setUserData(loginUserData);
      if (!data.profileSetUpStatus) {
        router.push('/login/agree');
        return;
      }
      if (data.profileSetUpStatus) {
        const profileData = await getProfileAPI();
        setUserData({ ...loginUserData, ...profileData });
        router.push('/');
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    login();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (code === null || hd === null) {
    return <Login text="잘못된 접근입니다." />;
  }
  if (hd !== 'hufs.ac.kr') {
    return <Login text="학교 이메일로 로그인해주세요!" />;
  }
}
