import React, { useState } from 'react';
import { initialQuestionsData } from '../../student-basic-components/MockStudentData';
import BackIcon from '../../student-basic-components/student-icons-components/BackIcon';

function StudentQuizShowCorrect() {
  const [currentView, setCurrentView] = useState('quizShowCorrect'); // Manage views if needed

  const checkAnswer = (question) => {
    if (question.type === 'select_multiple') {
      return (
        JSON.stringify(question.studentAnswer.sort()) ===
        JSON.stringify(question.correctAnswer.sort())
      );
    }
    return question.studentAnswer === question.correctAnswer;
  };

  const renderQuestion = (question, idx) => {
    const isCorrect = checkAnswer(question);
    const isError = !isCorrect;
    const questionNumber = idx + 1;

    return (
      <div
        key={question.questionId}
        className={`border-2 p-6 rounded-xl ${
          isCorrect ? 'border-green-500' : 'border-red-500'
        } flex flex-col space-y-4`}
      >
        <div className="text-lg sm:text-xl text-text-1 mb-2 sm:mb-4">
          Question {questionNumber}
        </div>
        <div className="text-sm sm:text-base text-text-1 mb-2 sm:mb-4">
          {question.question}
        </div>

        <div className="flex flex-col space-y-3">
          {/* Handle different question types */}
          {question.type === 'true_or_false' &&
            question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full border-2 text-primary-3 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                  question.studentAnswer === option
                    ? 'border-secondary-1 text-secondary-1'
                    : 'border-primary-3'
                }`}
              >
                {option}
              </button>
            ))}

          {question.type === 'multiple_choice' &&
            question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full border-2 text-primary-3 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                  question.studentAnswer === option
                    ? 'border-secondary-1 text-secondary-1'
                    : 'border-primary-3'
                }`}
              >
                {option}
              </button>
            ))}

          {question.type === 'select_multiple' &&
            question.options.map((option, index) => (
              <button
                key={index}
                className={`w-full border-2 text-primary-3 py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                  question.studentAnswer.includes(option)
                    ? 'border-secondary-1 text-secondary-1'
                    : 'border-primary-3'
                }`}
              >
                {option}
              </button>
            ))}

          {question.type === 'short_answer' && (
            <div
              className={`w-full border-2 py-2 px-4 rounded-lg ${
                isError ? 'border-red-500' : 'border-green-500'
              }`}
            >
              {question.studentAnswer || 'No answer provided'}
            </div>
          )}
        </div>

        <div className="text-sm mt-4">
          {isCorrect ? (
            <span className="text-green-500">Correct Answer!</span>
          ) : (
            <span className="text-red-500">
              Correct answer: {JSON.stringify(question.correctAnswer)}
            </span>
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

export default StudentQuizShowCorrect;
