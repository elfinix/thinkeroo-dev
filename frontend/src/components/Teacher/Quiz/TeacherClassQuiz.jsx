import React from 'react'
import TeacherClassQuizCard from './TeacherClassQuizCard'

const TeacherClassQuiz = ({ viewScore }) => {
    return (
        <div className="w-full h-5/6 flex flex-wrap gap-12 overflow-y-auto">
            <TeacherClassQuizCard 
                viewScore={viewScore}
            />
        </div>
    )
}

export default TeacherClassQuiz