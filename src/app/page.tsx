import axiosInstance from '@/api/axiosInstance';
import React from 'react';
import Home from './home/page';

export default async function Page() {
  await axiosInstance.get('/api/hello');
  return <Home />;
}
