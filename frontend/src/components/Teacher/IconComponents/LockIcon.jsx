import React from 'react';

const LockIcon = ({ size = 32, color = '#F5F5F5', className = '' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 32 32"
      className={className}
    >
      <path
        fill={color}
        d="M25.333 13.333h1.334c.736 0 1.333.597 1.333 1.334V28c0 .736-.597 1.333-1.333 1.333H5.333A1.333 1.333 0 0 1 4 28V14.667c0-.737.597-1.334 1.333-1.334h1.334V12a9.333 9.333 0 1 1 18.666 0v1.333ZM6.667 16v10.667h18.666V16H6.667Zm8 2.667h2.666V24h-2.666v-5.333Zm8-5.334V12a6.667 6.667 0 0 0-13.334 0v1.333h13.334Z"
      />
    </svg>
  );
};

export default LockIcon;
