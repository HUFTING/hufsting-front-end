import axiosInstance from '@/api/axiosInstance';
import BackIcon from '@/components/common/ui/BackIcon';
import LogoIcon from '@/components/common/ui/LogoIcon';
import React from 'react';

export default async function Page() {
  await axiosInstance.get('/api/hello');
  return (
    <div>
      <LogoIcon />
      <BackIcon />
    </div>
  );
}
