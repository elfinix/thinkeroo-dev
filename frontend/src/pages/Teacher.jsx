import React, { useState } from "react";
import TeacherSidebar from "../components/Teacher/TeacherSidebar";
import Header from "../components/Teacher/Header";
import TeacherRender from "../components/Teacher/TeacherRender";

const Teacher = () => {
    const [teacherRender, setTeacherRender] = useState("Class");

    return (
        <div className="teacher_page_container w-screen h-screen overflow-hidden flex bg-primary-1">
            <TeacherSidebar teacherRender={teacherRender} setTeacherRender={setTeacherRender} />
            <div className="teacher_page_inner w-full">
                <Header teacherRender={teacherRender} />
                <TeacherRender teacherRender={teacherRender} />
            </div>
        </div>
    );
};

export default Teacher;
