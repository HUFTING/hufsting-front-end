'use client';

import axiosInstance from '@/api/axiosInstance';
import useUserDataStore from '@/store/user';
import isAuthError from '@/utils/isAuthError';
import axios, { type AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { resetUserData } = useUserDataStore();
  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => response;

    const errInterceptor = async (error: { response: { status: number } }) => {
      if (axios.isAxiosError(error) && isAuthError(error)) {
        resetUserData();
        router.replace('/login/alert');
      }
      // eslint-disable-next-line @typescript-eslint/return-await
      return Promise.reject(error);
    };
    const interceptor = axiosInstance.interceptors.response.use(
      resInterceptor,
      errInterceptor,
    );
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [resetUserData, router]);
  return children;
};

export default AxiosInterceptor;
