import React, { useState } from 'react';
import StudentSearchField from '../../student-basic-components/StudentSearchField';
import { initialQuestionsData } from '../../student-basic-components/MockStudentData';
import BackIcon from '../../student-basic-components/student-icons-components/BackIcon';

function StudentQuizResult() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary-1 text-text-1 font-lexend">
      <div className="flex-1 p-8">
        <div className="sticky top-0 z-50 mb-6 bg-primary-1 p-4 md:p-7">
          <StudentSearchField onChange={handleSearchChange} />
        </div>
        <div className="sticky top-[68px] z-50 bg-primary-1 border-b-2 pb-2 border-b-primary-3 ml-40 mb-5">  {/* Adjust margin for side menu */}
          <div className="flex justify-between items-center mb-4">
            <a className="self-start text-text-1 font-semibold mb-4 flex items-center" href="#">
              <BackIcon /> Back
            </a>
            <div className="flex items-center space-x-2">
              <div className="text-gray-400">WST - Quiz 1: HTML</div>
            </div>
            <p className="mr-20">10/30</p>
          </div>
        </div>

        <div className="space-y-8 ml-52 pr-72">
          {/* Render Questions */}
          {initialQuestionsData.map((question, idx) => {
            return (
              <div key={question.questionId} className="border-2 p-6 rounded-xl border-primary-3">
                <div className="text-xl text-text-1 mb-4">Question {idx + 1}</div>
                <div className="text-text-1 mb-4">{question.question}</div>
                <div className="flex flex-col space-y-4">
                  {question.type === 'true_or_false' &&
                    question.options.map((option, index) => (
                      <button
                        key={index}
                        className={`flex-1 border-2 py-2 rounded-xl text-primary-3 border-primary-3  ${
                          question.studentAnswer === option ? 'border-2 border-secondary-1 text-secondary-1' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                  {question.type === 'multiple_choice' &&
                    question.options.map((option, index) => (
                      <button
                        key={index}
                        className={`flex-1 border-2 py-2 rounded-xl text-primary-3 border-primary-3  ${
                          question.studentAnswer === option ? 'border-2 border-secondary-1 text-secondary-1' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                  {question.type === 'select_multiple' &&
                    question.options.map((option, index) => (
                      <button
                        key={index}
                        className={`flex-1 border-2 py-2 rounded-xl text-primary-3 border-primary-3  ${
                          question.studentAnswer.includes(option) ? 'border-2 border-secondary-1 text-secondary-1' : ''
                        }`}
                      >
                        {option}
                      </button>
                    ))}

                  {question.type === 'short_answer' && (
                    <div
                      className={`flex-1 border-2 py-2 rounded-xl text-text-2 border-primary-3 pl-2`}
                    >
                      {question.studentAnswer}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StudentQuizResult;
