import React from 'react';

function FeatherIcon({ size = 32, className = '', color = '#8A2EDF' }) {
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
        d="M9.252 18.71c-.31.832-.572 1.6-.806 2.377 1.279-.929 2.801-1.518 4.557-1.738 3.35-.419 6.327-2.631 7.834-5.41l-1.94-1.94 1.883-1.887 1.334-1.335c.573-.573 1.22-1.632 1.903-3.157-7.457 1.156-12.024 5.722-14.765 13.09Zm13.415-6.714L24 13.33c-1.333 4-5.333 8-10.667 8.666-3.558.445-5.78 2.89-6.669 7.334H4c1.333-8 4-26.667 24-26.667-1.332 3.997-2.664 6.662-3.996 7.997-.45.448-.893.893-1.337 1.337Z"
      />
    </svg>
  );
}

export default FeatherIcon;
