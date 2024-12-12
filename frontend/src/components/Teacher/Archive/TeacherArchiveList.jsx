import React from 'react'
import TeacherArchiveClassItem from './TeacherArchiveClassItem'

const TeacherArchiveList = () => {
    return (
        <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex gap-[50px] flex-wrap">
            <TeacherArchiveClassItem/>
        </div>
    )
}

export default TeacherArchiveList