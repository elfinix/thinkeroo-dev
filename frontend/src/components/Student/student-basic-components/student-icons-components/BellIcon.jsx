import React from 'react';

const BellIcon = ({ size = 32, color = "#F5F5F5", className = "" }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 32 32"
      className={className}
    >
      <path 
        d="M26.666 22.666h2.667v2.667H2.666v-2.666h2.667v-9.334c0-5.89 4.775-10.666 10.666-10.666s10.667 4.775 10.667 10.666v9.333Zm-2.667 0v-9.333a8 8 0 1 0-16 0v9.333h16ZM12 28h8v2.666h-8V28Z" 
      />
    </svg>
  );
};

export default BellIcon;
