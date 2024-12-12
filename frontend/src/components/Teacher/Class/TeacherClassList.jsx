import React from 'react'
import TeacherClassCard from './TeacherClassCard'

const TeacherClassList = ({ setSelectedClass, setShowOverview }) => {
    return (
        <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex gap-[50px] flex-wrap">
            <TeacherClassCard 
                setSelectedClass={setSelectedClass}
                setShowOverview={setShowOverview}
            />
            <TeacherClassCard 
                setSelectedClass={setSelectedClass}
                setShowOverview={setShowOverview}
            />
            <TeacherClassCard 
                setSelectedClass={setSelectedClass}
                setShowOverview={setShowOverview}
            />
        </div>
    )
}

export default TeacherClassList