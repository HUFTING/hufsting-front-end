/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Pretendard-Regular': ['Pretendard-Regular'],
        'Pretendard-ExtraBold': ['Pretendard-ExtraBold'],
        'Pretendard-SemiBold': ['Pretendard-SemiBold'],
      },
    },
  },
  plugins: [],
};
export default config;
