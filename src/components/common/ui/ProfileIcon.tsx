import React from 'react';

const ProfileIcon = ({ className }: { className?: string }) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="17" cy="17" r="17" fill="#FF6969" />
    <path
      d="M17 9C18.0609 9 19.0783 9.42143 19.8284 10.1716C20.5786 10.9217 21 11.9391 21 13C21 14.0609 20.5786 15.0783 19.8284 15.8284C19.0783 16.5786 18.0609 17 17 17C15.9391 17 14.9217 16.5786 14.1716 15.8284C13.4214 15.0783 13 14.0609 13 13C13 11.9391 13.4214 10.9217 14.1716 10.1716C14.9217 9.42143 15.9391 9 17 9ZM17 19C21.42 19 25 20.79 25 23V25H9V23C9 20.79 12.58 19 17 19Z"
      fill="white"
    />
  </svg>
);

export default ProfileIcon;
