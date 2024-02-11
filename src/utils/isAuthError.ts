import { type AxiosError } from 'axios';

export default function isAuthError(error: AxiosError) {
  if (error.response?.status === 401 || error.response?.status === 403) {
    return true;
  }
  return false;
}
