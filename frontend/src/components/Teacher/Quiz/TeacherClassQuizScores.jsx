import React, { useState } from 'react'
import TeacherClassQuizScoresHeader from './TeacherClassQuizScoresHeader'
import TeacherQuizStudentScoresList from './TeacherQuizStudentScoresList'
import TeacherQuizGradeReport from './TeacherQuizGradeReport'

const TeacherClassQuizScores = ({ setShowQuizScore, selectedQuiz }) => {
    const [showReport, setShowReport] = useState(false)
    
    return (
        <>
            <div className="w-full h-full flex flex-col items-center pb-4">
                <TeacherClassQuizScoresHeader 
                    setShowReport={setShowReport}
                    setShowQuizScore={setShowQuizScore}
                />
                <div className="flex w-11/12 h-full mt-[20px] gap-4 overflow-hidden">
                    <div className="w-[277px] h-[323px] border-2 border-solid border-primary-3 rounded-[10px] p-4 flex flex-col gap-3 overflow-hidden">
                        <h4 className="font-medium text-xl text-text-1">Class Details</h4>
                        <div>
                            <p className="text-text-2">Quiz Name</p>
                            <h4 className="text-text-1 text-xl">WST - Quiz 1: HTML</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Timer</p>
                            <h4 className="text-text-1 text-xl">60</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Items</p>
                            <h4 className="text-text-1 text-xl">100</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Quiz Schedule</p>
                            <h4 className="text-text-1 text-xl">8:00 AM | 12/1/2024</h4>
                        </div>
                    </div>
                    <div className="w-full h-[88%] border-2 border-solid border-primary-3 rounded-[10px]">
                        <TeacherQuizStudentScoresList/>
                    </div>
                </div>
            </div>
            { 
                showReport && 
                    <TeacherQuizGradeReport 
                        setShowReport={setShowReport}
                    />
            }
        </>
    )
}

export default TeacherClassQuizScores