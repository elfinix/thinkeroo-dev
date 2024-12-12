import React, { useState } from 'react';
import StudentSearchField from '../../student-basic-components/StudentSearchField';
import StudentClassPageOverview from './student-class-page-view-sub-components/StudentClassPageOverview';
import StudentClassPageQuiz from './student-class-page-view-sub-components/StudentClassPageQuiz';

function StudentClassPageView() {
  const [activeTab, setActiveTab] = useState('overview'); 
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (value) => {
    console.log('Search Query:', value);
    setSearchQuery(value);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend">
      <div className="flex-1 p-4 md:p-6">
        <div className="sticky top-0 z-50 mb-6">
          <StudentSearchField onChange={handleSearchChange} />
        </div>
        {/* Tabs */}
        <div className="flex border-b-2 border-primary-3 p-4 sticky top-16 bg-primary-1 z-40 text-lg font-medium font-lexend ml-40"> {/*Adjust margin here for menu and header */}
          <button
            className={`px-4 py-2 ${activeTab === 'overview' ? 'text-secondary-1' : 'text-text-1'} hover:text-secondary-2`}
            onClick={() => handleTabChange('overview')}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'quiz' ? 'text-secondary-1' : 'text-text-1'} hover:text-secondary-2`}
            onClick={() => handleTabChange('quiz')}
          >
            Quiz
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && <StudentClassPageOverview />}
        {activeTab === 'quiz' && <StudentClassPageQuiz searchQuery={searchQuery} />}
      </div>
    </div>
  );
}

export default StudentClassPageView;
