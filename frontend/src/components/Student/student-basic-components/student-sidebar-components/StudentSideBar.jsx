import React from 'react';
import BooksIcon from '../student-basic-components/student-icons-components/BooksIcon';
import FeatherIcon from '../student-basic-components/student-icons-components/FeatherIcon';

const StudentSideBar = () => {
  return (
    <div className="w-52 bg-primary-1 p-4 font-lexend border-r-2 border-primary-3">
      <div className="text-lg text-center font-bold mb-8">Thinkeroo</div>
      <nav>
        <ul>
          <li className="mb-4">
            <a className="flex items-center text-text-1 hover:opacity-75" href="#">
              <BooksIcon size={24} className="mr-2" color='#F5F5F5'/> Class
            </a>
          </li>
          <li>
            <a className="flex items-center text-secondary-1" href="#">
              <FeatherIcon size={24} className="mr-2"/> Quiz
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default StudentSideBar;
