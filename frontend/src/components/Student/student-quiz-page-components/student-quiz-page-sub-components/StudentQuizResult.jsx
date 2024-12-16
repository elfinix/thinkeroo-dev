import React, { useState } from 'react';
import { initialQuestionsData } from '../../student-basic-components/MockStudentData';
import BackIcon from '../../student-basic-components/student-icons-components/BackIcon';

function StudentQuizResult() {
  const [currentView, setCurrentView] = useState('quizShowCorrect'); // Manage views if needed

  const renderQuestion = (question, idx) => {
    const questionNumber = idx + 1;

    return (
      <div
        key={question.questionId}
        className="border-2 p-6 rounded-xl border-primary-3 flex flex-col space-y-4"
      >
        <div className="text-lg sm:text-xl text-text-1 mb-2 sm:mb-4">
          Question {questionNumber}
        </div>
        <div className="text-sm sm:text-base text-text-1 mb-2 sm:mb-4">
          {question.question}
        </div>

        {/* Display the selected answers without indicating correctness */}
        <div className="flex flex-col space-y-3">
          {['true_or_false', 'multiple_choice', 'select_multiple'].includes(question.type) &&
            question.options.map((option, index) => (
              <div
                key={index}
                className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                  question.studentAnswer.includes(option) ? 'text-secondary-1 border-2 border-secondary-1 p-3' : 'text-primary-3 border-2 border-primary-3 p-3'
                }`}
              >
                {option}
              </div>
            ))
          }

          {question.type === 'short_answer' && (
            <div
              className="w-full py-2 px-4 rounded-lg border-2 text-text-2 border-primary-3"
            >
              {question.studentAnswer || 'No answer provided'}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-col min-h-screen fixed inset-0 bg-primary-1 text-text-1 z-50 flex items-center justify-center font-lexend"
      style={{
        position: 'absolute',
        zIndex: 1000
      }}>
      <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-center items-center w-full border-b-2 pb-4 pt-4 border-b-primary-3 bg-primary-1">
        <button
          className="absolute left-10 top-1/2 transform -translate-y-1/2 text-text-1 font-semibold flex items-center"
          onClick={() => setCurrentView('classQuiz')} // Update view if needed
        >
          <BackIcon /> Back
        </button>
        <div className="text-sm sm:text-base text-text-2 text-center">
          WST - Quiz 1: HTML
        </div>
        <div className="absolute right-10 top-1/2 transform -translate-y-1/2 text-sm sm:text-base text-text-1">
          10/30
        </div>
      </div>

      <div
        className="p-4 w-full sm:p-6 md:p-8 pb-48 md:pb-24 mx-4 sm:mx-12 lg:pl-64 lg:pr-80 overflow-y-auto"
        style={{ maxHeight: 'calc(100vh - 130px)', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>
          {`
            .scrollable-div::-webkit-scrollbar {
              display: none; /* for Chrome, Safari, and Opera */
            }
          `}
        </style>
        <div className="space-y-8 scrollable-div">
          {initialQuestionsData.map((question, index) => renderQuestion(question, index))}
        </div>
      </div>
    </div>
  );  
}

export default StudentQuizResult;
