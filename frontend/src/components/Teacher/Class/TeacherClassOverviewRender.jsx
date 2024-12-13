import React from "react";
import TeacherClassOverviewDetails from "./TeacherClassOverviewDetails";
import TeacherClassOverviewBody from "./TeacherClassOverviewBody";
import TeacherClassQuiz from "../Quiz/TeacherClassQuiz";
import TeacherClassOverviewStudentList from "./TeacherClassOverviewStudentList";

import { getClassSelector } from "/src/global/globals";

const TeacherClassOverviewRender = ({ render, viewScore, setShowEditDetails, classDetails, studentList, totalStudents }) => {
    let content;

    switch (render) {
        case "Overview":
            content = (
                <div className="flex gap-4">
                    <TeacherClassOverviewDetails
                        setShowEditDetails={setShowEditDetails}
                        classDetails={classDetails}
                        totalStudents={totalStudents}
                    />
                    <TeacherClassOverviewBody classDetails={classDetails} />
                </div>
            );
            break;
        case "Quiz":
            content = <TeacherClassQuiz viewScore={viewScore} classId={classDetails.id} />;
            break;
        case "Student":
            const classId = getClassSelector();
            content = <TeacherClassOverviewStudentList studentList={studentList} classId={classId} />;
            break;
        default:
            content = (
                <div className="flex gap-4">
                    <TeacherClassOverviewDetails
                        setShowEditDetails={setShowEditDetails}
                        classDetails={classDetails}
                        totalStudents={totalStudents}
                    />
                    <TeacherClassOverviewBody classDetails={classDetails} />
                </div>
            );
    }

    return <div className="w-11/12 h-full overflow-hidden mt-[20px]">{content}</div>;
};

export default TeacherClassOverviewRender;
