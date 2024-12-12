import React from 'react'

const TeacherClassQuizScoresHeader = ({ setShowReport, setShowQuizScore }) => {
    return (
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center justify-between gap-14">
            <button onClick={() => setShowQuizScore(false)} type="button" className="flex items-center gap-[10px] text-text-1 font-bold text-[20px]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path fill="#F5F5F5" d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"/>
                </svg>
                Back
            </button>
            <h2 className="font-medium text-[20px] text-text-1">WST - Quiz 1: HTML</h2>
            <button onClick={() => setShowReport(true)} className="bg-accent-1 p-2 px-4 rounded-[50px] text-base  font-medium">Download Report</button>
        </div>
    )
}

export default TeacherClassQuizScoresHeader