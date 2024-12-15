import React from "react";
import TeacherQuizHeader from "./TeacherQuizHeader";
import TeacherQuizItem from "./TeacherQuizItem";

const TeacherQuizList = ({ selectQuiz, quizzes, onDelete }) => {
    return (
        <div className="w-full h-full flex flex-col items-center overflow-hidden">
            <TeacherQuizHeader selectQuiz={selectQuiz} />
            <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex items-start gap-[50px] gap-y-0 flex-wrap">
                {quizzes.map((quiz) => (
                    <TeacherQuizItem key={quiz.id} quiz={quiz} selectQuiz={selectQuiz} onDelete={onDelete} />
                ))}
            </div>
        </div>
    );
};

export default TeacherQuizList;
