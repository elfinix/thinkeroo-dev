import React from 'react';
import TeacherClass from './Class/TeacherClass';
import TeacherQuiz from './Quiz/TeacherQuiz';
import TeacherArchive from './Archive/TeacherArchive';
import TeacherDatabank from './Databank/TeacherDatabank';

const TeacherRender = ({ teacherRender }) => {
    let content;

    switch (teacherRender) {
        case 'Class':
            content = <TeacherClass/>;
            break;
        case 'Quiz':
            content = <TeacherQuiz/>;
            break;
        case 'Archive':
            content = <TeacherArchive/>;
            break;
        case 'Databank':
            content = <TeacherDatabank/>;
            break;
        default:
            content = <TeacherClass/>;
    }

    return (
        <div className="w-full h-full">
            {content}
        </div>
    );
};

export default TeacherRender;
