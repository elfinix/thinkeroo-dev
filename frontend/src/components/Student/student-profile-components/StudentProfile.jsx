import React, { useState } from 'react';
import StudentPersonalInfo from './student-profile-sub-components/StudentPersonalInfo';
import StudentAccPass from './student-profile-sub-components/StudentAccPass';
import BooksIcon from '../student-basic-components/student-icons-components/BooksIcon'; 
import LockIcon from '../student-basic-components/student-icons-components/LockIcon'; 
import BackIcon from '../student-basic-components/student-icons-components/BackIcon'; 

import { initialStudentData } from '../student-basic-components/MockStudentData';

function StudentProfile({ goBack }) {  // Assume goBack is passed from the parent component
  const [activeTab, setActiveTab] = useState('personalInfo');

  const student = initialStudentData[0];

  return (
    <div className="fixed inset-0 bg-primary-1 text-text-1 z-50 flex items-center justify-center font-lexend"
      style={{
        position: 'absolute',
        zIndex: 1000}}>
      <div className="border border-primary-3 rounded-lg shadow-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
        <div className="md:w-1/3 flex flex-col items-center border-r border-gray-700 pr-8">
          <a className="self-start text-text-1 mb-4 flex items-center cursor-pointer" onClick={goBack}>
            <BackIcon size={24} color="#F5F5F5" className="mr-2" /> 
            Go back
          </a>
          <img
            alt="Student Profile"
            className="rounded-full w-24 h-24 mb-4"
            src={student.personalDetail.image || 'https://via.placeholder.com/100'}
            width="100"
            height="100"
          />
          <h2 className="text-base font-semibold">{student.personalDetail.firstName} {student.personalDetail.lastName}</h2>
          <p className="text-text-2 text-sm">{student.personalDetail.role}</p>
          <div className="mt-8 w-full">
            <a className={`flex items-center mb-4 text-base ${activeTab === 'personalInfo' ? 'text-secondary-1' : 'text-text-1'}`}
              onClick={() => setActiveTab('personalInfo')}
              >
              <BooksIcon size={24} color={activeTab === 'personalInfo' ? '#8A2EDF' : '#F5F5F5'} className="mr-2" />
              Personal Information
            </a>
            <a className={`flex items-center text-base ${activeTab === 'accountPassword' ? 'text-secondary-1' : 'text-text-1'}`}
             onClick={() => setActiveTab('accountPassword')}
             >
              <LockIcon size={24} color={activeTab === 'accountPassword' ? '#8A2EDF' : '#F5F5F5'} className="mr-2" /> 
              Account &amp; Password
            </a>
          </div>
        </div>

        <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8">
          {activeTab === 'personalInfo' && 
            <StudentPersonalInfo student={student} />
          }
          {activeTab === 'accountPassword' && 
            <StudentAccPass student={student} />
          }
        </div>
      </div>
    </div>
  );
}

export default StudentProfile;
