import axiosInstance from '@/api/axiosInstance';
import { type AlarmListType, type AlarmType } from '@/types/alarm';

export const getAlarmListAPI = async (): Promise<AlarmListType> => {
  const { data } = await axiosInstance.get(`/apis/api/v1/alarms`);
  return data;
};

export const getAlarmInfoAPI = async (id: string): Promise<AlarmType> => {
  const { data } = await axiosInstance.get(`/apis/api/v1/alarms/${id}`);
  return data;
};
