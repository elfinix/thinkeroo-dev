import React, { useState } from 'react';
import { ListFilter, Timer, CalendarClock, UserRoundCheck, ScrollText } from 'lucide-react';
import StudentSearchField from '../student-basic-components/StudentSearchField';
import StudentFilterModal from '../student-basic-components/student-modal-components/StudentFilterModal';
import { initialQuizData } from '../student-basic-components/MockStudentData'; 
import { useNavigate } from 'react-router-dom'; 

const StudentQuizPage = () => {
  const [filteredQuizData, setFilteredQuizData] = useState(initialQuizData); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate(); 

  const handleSearchChange = (query) => {
    const filteredData = initialQuizData.filter((quiz) =>
      quiz.quiz?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredQuizData(filteredData);
  };

  const handleQuizClick = (quizId) => {
    console.log(`Quiz clicked: ${quizId}`);
    navigate(`/quiz/${quizId}`);
  };

  const formatDisplayTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let hours12 = parseInt(hours, 10);
    const period = hours12 >= 12 ? 'PM' : 'AM';

    if (hours12 > 12) {
      hours12 -= 12;
    } else if (hours12 === 0) {
      hours12 = 12; 
    }

    return `${hours12}:${minutes} ${period}`;
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-1 text-text-1">  {/* Adjust margins here for header and menu */}
      <div className="flex-1 p-4 md:p-6">
        <div className="sticky top-0 z-50 mb-6"> 
          <StudentSearchField onChange={handleSearchChange} />
        </div>
        <div className="flex bg-primary-1 border-b-2 py-4 border-primary-3 items-center font-lexend sticky top-24 z-50 -mt-24">
          <button
            onClick={toggleModal}  
            className="border-2 border-text-1 text-text-1 px-4 py-2 rounded-xl flex items-center hover:opacity-75"
          >
            <ListFilter className="mr-2" />
            Filter
          </button>
        </div>

        {/* Modal for filters */}
        {isModalOpen && (
          <StudentFilterModal
            sortOptions={[
              { value: 'ascending', label: 'Ascending' },
              { value: 'descending', label: 'Descending' },
            ]}
            filterOptions={[
              { value: 'dateAccomplished', label: 'Date Accomplished' },
              { value: 'name', label: 'Name' },
              { value: 'createdOn', label: 'Created On' },
            ]}
            closeModal={closeModal}
          />
        )}

        {/* Quiz Containers */}
        <div className="flex flex-wrap mt-20 gap-6">
          {filteredQuizData.map((quiz, index) => (
            <div
              key={index}
              className="border-2 border-primary-3 p-4 rounded-xl w-full max-w-sm md:max-w-sm lg:max-w-sm cursor-pointer hover:bg-primary-3 focus:outline-none"
              onClick={() => handleQuizClick(quiz.quizId)}
            >
              <h2 className="text-sm sm:text-base md:text-lg font-bold pb-5 truncate">{quiz.quiz}</h2>
              <div className="text-text-2 space-y-2">
                <p className="flex items-center text-sx sm:text-sx md:text-base">
                  <Timer size={20} className="mr-2" />
                  {quiz.timeLimit}
                </p>
                <p className="flex items-center text-sx sm:text-sx md:text-base">
                  <ScrollText size={20} className="mr-2" />
                  {quiz.items} items
                </p>
                <p className="flex items-center text-sm sm:text-sx md:text-base">
                  <CalendarClock size={20} className="mr-2" />
                  {formatDisplayTime(quiz.startTime)} | {quiz.date}
                </p>
                <p className="flex items-center text-sm sm:text-sx md:text-base truncate">
                  <UserRoundCheck size={20} className="mr-2" />
                  {quiz.subject}
                </p>
                <p className="text-sm sm:text-sx md:text-base pt-5">
                  Accomplished: {formatDisplayTime(quiz.accomplishedTime)} | {quiz.accomplishedDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentQuizPage;