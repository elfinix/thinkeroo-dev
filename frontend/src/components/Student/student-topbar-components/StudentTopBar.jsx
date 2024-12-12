import React from 'react';
import { Bell } from 'lucide-react';
import BellIcon from '../student-basic-components/student-icons-components/BellIcon';

const StudentTopBar = ({pageName = 'Quiz'}) => {
  return (
    <div className="w-full font-lexend">
      {/* Content Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">{pageName}</h1>
        <div className="flex items-center space-x-4">
          <BellIcon size={24}/>
          <img
            alt="User profile picture"
            className="w-10 h-10 rounded-full"
            height="40"
            src="https://storage.googleapis.com/a1aa/image/2lHvcyGSdZrhKxmhWhCF1zOVZTLX9xGOktTaaRe8EkspSb8JA.jpg"
            width="40"
          />
        </div>
      </div>
      <hr className="border-primary-3 mb-6 -ml-6 -mr-6" />
    </div>
  );
};

export default StudentTopBar;
