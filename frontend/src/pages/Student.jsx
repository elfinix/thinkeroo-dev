import React, { useState } from "react";
import StudentSidebar from "../components/Student/StudentSidebar";
import Header from "../components/Student/Header";
import StudentRender from "../components/Student/StudentRender"; // Import StudentRender

const Student = () => {
    const [studentRender, setStudentRender] = useState("Class"); // Default to 'Class'

    return (
        <div className="teacher_page_container w-screen h-screen overflow-hidden flex">
            {/* Sidebar */}
            <StudentSidebar studentRender={studentRender} setStudentRender={setStudentRender} />
            <div className="teacher_page_inner w-full bg-primary-1">
                <Header studentRender={studentRender} />
                <div className="page_content h-full ml-10">
                    <StudentRender studentRender={studentRender} />
                </div>
            </div>
        </div>
    );
};

export default Student;
