/* eslint-disable no-return-await */
import axiosInstance from '@/api/axiosInstance';
import {
  type TotalProfileDataType,
  type EnteredProfileDataType,
  type LoginUserDataType,
} from '@/types/user';
import isAuthError from '@/utils/isAuthError';
import { type AxiosError } from 'axios';
import { toast } from 'react-toastify';

export const loginAPI = async (code: string): Promise<LoginUserDataType> => {
  try {
    const { data } = await axiosInstance.get(
      `/apis/auth/google/callback?code=${code}`,
    );
    return data;
  } catch (e) {
    toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
    throw e;
  }
};
// http://www.hufsting.com:8080/auth/google/callback?code

export const saveProfileAPI = async (profileData: EnteredProfileDataType) => {
  try {
    await axiosInstance.post('/apis/api/v1/profile', profileData);
  } catch (e) {
    if (!isAuthError(e as AxiosError)) {
      toast.error('다시 시도해주세요.');
    }
    throw e;
  }
};

export const getProfileAPI = async (): Promise<TotalProfileDataType> => {
  try {
    const { data } = await axiosInstance.get('/apis/api/v1/profile');
    return data;
  } catch (e) {
    toast.error('프로필을 불러오는데 실패했습니다.');
    throw e;
  }
};

export const updateProfileAPI = async (profileData: EnteredProfileDataType) => {
  try {
    await axiosInstance.put('/apis/api/v1/profile', profileData);
  } catch (e) {
    if (!isAuthError(e as AxiosError)) {
      toast.error('프로필 수정에 실패했습니다. 다시 시도해주세요.');
    }
    throw e;
  }
};
export const deleteProfileAPI = async () => {
  try {
    await axiosInstance.delete('/apis/api/v1/member');
  } catch (e) {
    if (!isAuthError(e as AxiosError)) {
      toast.error('프로필 삭제에 실패했습니다. 다시 시도해주세요.');
    }
    throw e;
  }
};
