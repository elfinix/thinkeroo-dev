import React, { useState } from 'react'
import Header from '../components/Teacher/Header'
import TeacherRender from '../components/Teacher/TeacherRender'
import TeacherSidebar from '../components/Teacher/TeacherSidebar'

const Teacher = () => {
    const [teacherRender, setTeacherRender] = useState('Class');

    return (
        <>
            <div className="teacher_page_container w-screen h-screen overflow-hidden flex">
                <TeacherSidebar 
                    teacherRender={teacherRender}
                    setTeacherRender={setTeacherRender}
                />
                <div className="teacher_page_inner w-full">
                    <Header 
                        teacherRender={teacherRender}
                    />
                    <TeacherRender 
                        teacherRender={teacherRender}
                    />
                </div>  
            </div>
        </>
    )
}

export default Teacher