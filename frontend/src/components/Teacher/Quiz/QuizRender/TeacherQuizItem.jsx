import React, { useState } from 'react'
import TeacherQuizCardPopUp from './TeacherQuizCardPopUp'

const TeacherQuizItem = ({ selectQuiz }) => {
    const [showPopUp, setShowPopUp] = useState(false);
    return (
        <div className="cursor-pointer w-[455px] h-[275px] flex flex-col justify-between border-2 border-primary-3 rounded-[10px] p-4">
            <div className="flex justify-between relative">
                <h3 className="text-[20px] font-bold text-text-1">WST - Quiz 1: HTML</h3>
                <button onClick={()=> setShowPopUp(!showPopUp)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#F5F5F5" d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"/>
                    </svg>
                </button>
                {showPopUp && 
                    <TeacherQuizCardPopUp 
                        selectQuiz={selectQuiz}
                    />
                }
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#7C7C90" d="m17.618 5.968 1.453-1.453 1.414 1.414-1.453 1.453A9 9 0 1 1 12 4c2.125 0 4.078.736 5.618 1.968ZM12 20a7 7 0 1 0 0-14 7 7 0 0 0 0 14ZM11 8h2v6h-2V8ZM8 1h8v2H8V1Z"/>
                    </svg>
                    <p className="text-text-2">60 min</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#7C7C90" d="M19 22H5a3 3 0 0 1-3-3V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3Zm-1-5v2a1 1 0 1 0 2 0v-2h-2Zm-2 3V4H4v15a1 1 0 0 0 1 1h11ZM6 7h8v2H6V7Zm0 4h8v2H6v-2Zm0 4h5v2H6v-2Z"/>
                    </svg>
                    <p className="text-text-2">100 items</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#7C7C90" d="M7 3V1h2v2h6V1h2v2h4a1 1 0 0 1 1 1v5h-2V5h-3v2h-2V5H9v2H7V5H4v14h6v2H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4Zm10 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6 4a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm5-3v3.414l2.293 2.293 1.414-1.414L18 15.586V13h-2Z"/>
                    </svg>
                    <p className="text-text-2">8:00 AM | 12/1/2024</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path fill="#7C7C90" d="M4 11.333 0 9l12-7 12 7v8.5h-2v-7.333l-2 1.166v6.678l-.223.275A9.983 9.983 0 0 1 12 22a9.983 9.983 0 0 1-7.777-3.714L4 18.011v-6.678ZM6 12.5v4.792A7.979 7.979 0 0 0 12 20a7.978 7.978 0 0 0 6-2.708V12.5L12 16l-6-3.5ZM3.97 9 12 13.685 20.03 9 12 4.315 3.97 9Z"/>
                    </svg>
                    <p className="text-text-2">Web System Technology 1</p>
                </div>
            </div>
            <p className="text-text-2">Created: 11/30/2024
            Modified: 12/6/2024</p>
        </div>
    )
}

export default TeacherQuizItem