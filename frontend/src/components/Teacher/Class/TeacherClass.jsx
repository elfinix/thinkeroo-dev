import React, { useState } from "react";
import TeacherClassHeader from "./TeacherClassHeader";
import TeacherClassList from "./TeacherClassList";
import TeacherCreateClass from "./TeacherCreateClass";
import TeacherClassOverview from "./TeacherClassOverview";

const TeacherClass = () => {
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showOverview, setShowOverview] = useState(false);

    return (
        <div className="w-full h-full flex flex-col items-center">
            {!showOverview && (
                <>
                    <TeacherClassHeader setShowCreateClass={setShowCreateClass} />
                    <TeacherClassList setSelectedClass={setSelectedClass} setShowOverview={setShowOverview} />
                </>
            )}
            {showOverview && <TeacherClassOverview selectedClass={selectedClass} />}

            {showCreateClass && (
                <TeacherCreateClass
                    setShowCreateClass={setShowCreateClass}
                    setShowOverview={setShowOverview}
                    setSelectedClass={setSelectedClass}
                />
            )}
        </div>
    );
};

export default TeacherClass;
