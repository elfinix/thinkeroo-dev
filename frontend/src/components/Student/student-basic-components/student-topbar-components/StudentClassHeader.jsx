import React from 'react';

const StudentClassHeader = ({ setRender, render, setShowOverview, onBack }) => {
  return (
    <div className="w-full h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center gap-14 -mb-3">
      {/* Back to Classlist Button */}
      <button
        onClick={onBack} // Use onBack to trigger the navigation
        className="flex gap-2 items-center text-text-1"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.82843 6.9999H16V8.9999H3.82843L9.1924 14.3638L7.7782 15.778L0 7.9999L7.7782 0.22168L9.1924 1.63589L3.82843 6.9999Z"
            fill="#F5F5F5"
          />
        </svg>
        Back to Classlist
      </button>

      {/* Navigation Tabs */}
      <p
        onClick={() => setRender('Overview')}
        className={`select-none font-medium text-[20px] cursor-pointer ${
          render === 'Overview' ? 'text-secondary-1' : 'text-text-1'
        }`}
      >
        Overview
      </p>
      <p
        onClick={() => setRender('Quiz')}
        className={`select-none font-medium text-[20px] cursor-pointer ${
          render === 'Quiz' ? 'text-secondary-1' : 'text-text-1'
        }`}
      >
        Quiz
      </p>
    </div>
  );
};

export default StudentClassHeader;
