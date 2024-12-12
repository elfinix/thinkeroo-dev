import React from 'react'
import TeacherArchiveList from './TeacherArchiveList'
import TeacherArchiveHeader from './TeacherArchiveHeader'

const TeacherArchive = () => {
    return (
        <div className="w-full h-full flex flex-col items-center">
            <TeacherArchiveHeader/>
            <TeacherArchiveList/>
        </div>
    )
}

export default TeacherArchive