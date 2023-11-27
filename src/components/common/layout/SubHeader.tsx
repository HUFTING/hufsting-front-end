'use client';

import { SubHeaderStyle } from '@/styles/common/layout/layoutStyles';
import React from 'react';
import type { ReactNode } from 'react';

interface props {
  title: string;
  rightButton?: { content: string | ReactNode; clickEvent: () => void } | null;
  leftButton?: { content: string | ReactNode; clickEvent: () => void } | null;
}

const SubHeader = ({ title, rightButton = null, leftButton = null }: props) => (
  <SubHeaderStyle>
    <div>
      {rightButton !== null && rightButton !== undefined && (
        <div
          role="presentation"
          onClick={() => {
            rightButton.clickEvent !== null &&
              rightButton.clickEvent !== undefined &&
              rightButton.clickEvent();
          }}
        >
          {rightButton.content}
        </div>
      )}
    </div>
    <div>{title}</div>
    <div>
      {leftButton !== null && leftButton !== undefined && (
        <div
          role="presentation"
          onClick={() => {
            leftButton.clickEvent !== null &&
              leftButton.clickEvent !== undefined &&
              leftButton.clickEvent();
          }}
        >
          {leftButton.content}
        </div>
      )}
    </div>
  </SubHeaderStyle>
);

export default SubHeader;
