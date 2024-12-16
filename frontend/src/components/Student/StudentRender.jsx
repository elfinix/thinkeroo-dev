import React from 'react';
import StudentClassPage from '../Student/student-class-page-components/StudentClassPage';
import StudentQuizPage from '../Student/student-quiz-page-components/StudentQuizPage';
const StudentRender = ({ studentRender }) => {
    let content;

    switch (studentRender) {
        case 'Class':
            content = <StudentClassPage/>;
            break;
        case 'Quiz':
            content = <StudentQuizPage/>;
            break;
        default:
            content = <StudentClassPage/>;
    }

    return (
        <div className="w-full h-full">
            {content}
        </div>
    );
};

export default StudentRender;
