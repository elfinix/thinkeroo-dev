import React, { useState, useEffect } from 'react';
import { Timer, CalendarClock, UserRoundCheck, ScrollText } from 'lucide-react';
import { initialQuizData } from '../../../student-basic-components/MockStudentData';

function StudentClassPageQuiz({ searchQuery }) {
  const [filteredQuizData, setFilteredQuizData] = useState(initialQuizData);
  const classId = 'CLASS-00001';  

  useEffect(() => {
    const filteredData = initialQuizData
      .filter((quiz) => quiz.classId === classId) 
      .filter((quiz) =>
        quiz.quiz?.toLowerCase().includes(searchQuery.toLowerCase()) 
      );
    setFilteredQuizData(filteredData);
  }, [searchQuery]); 

  const handleQuizClick = (quizId) => {
    console.log(`Quiz clicked: ${quizId}`);
    // Uncomment the line below to navigate to the quiz page when implemented
    // navigate(`/quiz/${quizId}`);
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

  return (
    <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend">  
      <div className="flex-1 p-4 md:p-6 ml-40"> {/* Adjust margins for header and menu */}
        {/* Quiz Containers */}
        <div className="flex flex-wrap mt-4 gap-6">
          {filteredQuizData.length === 0 ? (
            <p>No quizzes available for this class.</p>
          ) : (
            filteredQuizData.map((quiz, index) => (
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
            ))
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentClassPageQuiz;
