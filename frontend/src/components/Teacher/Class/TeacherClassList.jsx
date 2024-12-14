import React from "react";
import TeacherClassCard from "./TeacherClassCard";

const TeacherClassList = ({ classes, studentCounts, setSelectedClass, setShowOverview, onArchive }) => {
    return (
        <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex gap-[50px] flex-wrap">
            {classes.map((classItem) => (
                <TeacherClassCard
                    key={classItem.id}
                    classItem={classItem}
                    studentCount={studentCounts[classItem.id] || 0}
                    setSelectedClass={setSelectedClass}
                    setShowOverview={setShowOverview}
                    onArchive={onArchive}
                />
            ))}
        </div>
    );
};

export default TeacherClassList;
