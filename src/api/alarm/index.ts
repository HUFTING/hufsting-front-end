import axiosInstance from '@/api/axiosInstance';
import { type AlarmType } from '@/types/alarm';

const getAlarmAPI = async (): Promise<AlarmType[]> => {
  const { data } = await axiosInstance.get(`/apis/api/v1/alarms`);
  return data;
};

export default getAlarmAPI;
