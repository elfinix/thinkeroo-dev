import React from 'react';

const BooksIcon = ({ size = 32, color = '#8A2EDF', className = '' }) => {
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
        d="M5.333 4C4.597 4 4 4.597 4 5.333v21.334C4 27.403 4.597 28 5.333 28h13.334c.736 0 1.333-.597 1.333-1.333v-6.27l1.333 6.27c.153.72.86 1.18 1.581 1.026l5.217-1.109a1.333 1.333 0 0 0 1.027-1.581L25.277 6.744a1.333 1.333 0 0 0-1.582-1.027l-3.705.788a1.334 1.334 0 0 0-1.323-1.172h-5.334C13.333 4.597 12.736 4 12 4H5.333Zm8 4h4v10.667h-4V8Zm0 17.333v-4h4v4h-4ZM10.667 6.667V20h-4V6.667h4Zm0 16v2.666h-4v-2.666h4Zm12.443-.468 2.608-.554.554 2.608-2.608.555-.555-2.608Zm-.555-2.608L20.337 9.157l2.609-.554 2.217 10.434-2.608.554Z"
      />
    </svg>
  );
};

export default BooksIcon;
