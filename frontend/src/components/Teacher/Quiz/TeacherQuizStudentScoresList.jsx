import React from 'react'
import TeacherQuizStudentScoresListItem from './TeacherQuizStudentScoresListItem'

const TeacherQuizStudentScoresList = () => {
    return (
        <div className="w-full h-full overflow-hidden p-4 px-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-text-1">Student List</h2>
                <div className="flex gap-2 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#7C7C90" d="M14 14.252v2.09A6 6 0 0 0 6 22H4a8 8 0 0 1 10-7.749ZM12 13c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm5.793 8.914 3.535-3.535 1.415 1.414-4.95 4.95-3.536-3.536 1.415-1.414 2.12 2.121Z"/>
                    </svg>
                    <p className="text-text-2">6 out of 30</p>
                </div>
            </div>
            <div className="w-full h-[92%] overflow-y-auto">
                <TeacherQuizStudentScoresListItem/>
                <TeacherQuizStudentScoresListItem/>
                <TeacherQuizStudentScoresListItem/>
                <TeacherQuizStudentScoresListItem/>
            </div>
        </div>
    )
}

export default TeacherQuizStudentScoresList