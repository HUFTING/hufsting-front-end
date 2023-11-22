'use client';

import React from 'react';
import { LoginSection } from './styles';

const LoginContainer = ({ children }: { children: React.ReactNode }) => (
  <LoginSection>{children}</LoginSection>
);

export default LoginContainer;
