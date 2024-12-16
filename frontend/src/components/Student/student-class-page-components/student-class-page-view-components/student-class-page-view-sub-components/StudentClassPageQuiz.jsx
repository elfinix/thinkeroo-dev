import React, { useState, useEffect } from 'react';
import { Timer, CalendarClock, UserRoundCheck, ScrollText } from 'lucide-react';
import { initialQuizData } from '../../../student-basic-components/MockStudentData';
import StudentTakingQuiz from '../../../student-quiz-page-components/student-quiz-page-sub-components/StudentTakingQuiz'; 

function StudentClassPageQuiz({ searchQuery }) {
  const [filteredQuizData, setFilteredQuizData] = useState(initialQuizData);
  const [currentView, setCurrentView] = useState('quizList'); // Track current view
  const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz

  useEffect(() => {
    // Filter quiz data based on classId and searchQuery
    const classId = 'CLASS-00001';
    const filteredData = initialQuizData
      .filter((quiz) => quiz.classId === classId)
      .filter((quiz) =>
        quiz.quiz?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
      );

    setFilteredQuizData(filteredData);
  }, [searchQuery]);

  const handleQuizClick = (quiz) => {
    setSelectedQuiz(quiz); // Set selected quiz
    setCurrentView('takingQuiz'); // Navigate to quiz view
  };

  const handleBackToQuizList = () => {
    setCurrentView('quizList'); // Navigate back to quiz list
    setSelectedQuiz(null); // Clear selected quiz
  };

  if (currentView === 'takingQuiz' && selectedQuiz) {
    return <StudentTakingQuiz quizData={selectedQuiz} onBack={handleBackToQuizList} />;
  }

  return (
    <div className="w-full border-b-primary-3 border-2 border-x-0 border-t-0 -ml-8">
      <div className="flex items-center gap-14 px-6 py-3"></div>

      {/* Quiz Section */}
      <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend px-8 py-6">
        <div className="flex-1">
          {/* Quiz Cards */}
          <div className="flex flex-wrap mt-4 gap-6">
            {filteredQuizData.length === 0 ? (
              <p className="text-text-2">No quizzes available for this class.</p>
            ) : (
              filteredQuizData.map((quiz) => (
                <div
                  key={quiz.quizId}
                  className="border-2 border-primary-3 p-4 rounded-xl w-full max-w-xs 
                             cursor-pointer hover:bg-primary-3 transition duration-200"
                  onClick={() => handleQuizClick(quiz)} // Navigate on click
                >
                  {/* Quiz Title */}
                  <h2 className="text-base md:text-lg font-bold pb-4 truncate">
                    {quiz.quiz}
                  </h2>

                  {/* Quiz Details */}
                  <div className="text-text-2 space-y-2">
                    <p className="flex items-center text-sm md:text-base">
                      <Timer size={18} className="mr-2" />
                      {quiz.timeLimit}
                    </p>
                    <p className="flex items-center text-sm md:text-base">
                      <ScrollText size={18} className="mr-2" />
                      {quiz.items} items
                    </p>
                    <p className="flex items-center text-sm md:text-base">
                      <CalendarClock size={18} className="mr-2" />
                      {quiz.startTime} | {quiz.date}
                    </p>
                    <p className="flex items-center text-sm md:text-base truncate">
                      <UserRoundCheck size={18} className="mr-2" />
                      {quiz.subject}
                    </p>
                    <p className="text-sm md:text-base pt-3">
                      Accomplished:{" "}
                      {quiz.accomplishedTime || "N/A"} | {quiz.accomplishedDate || "N/A"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentClassPageQuiz;
