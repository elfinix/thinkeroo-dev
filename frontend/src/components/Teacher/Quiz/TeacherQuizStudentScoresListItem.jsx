import React from 'react'

const TeacherQuizStudentScoresListItem = () => {
    return (
        <div className="w-full h-[69px] border-b-2 border-0 border-primary-3 flex items-center">
            <div className="h-full flex items-center gap-2 mr-[50px]">
                <img className="w-[30px] h-[30px] rounded-full object-cover object-center" src="https://placehold.co/50x50" alt="" />
                <div>
                    <div className="flex gap-2">
                        <p className="text-text-1">Adolf Niggler</p>
                        <p className="text-text-2">•</p>
                        <p className="text-text-2">8:41 AM</p>
                    </div>
                    <p className="text-text-2">41 mins</p>
                </div>
            </div>
            <div className="h-full flex items-center">
                <p className="text-negative">Detected: Alt+Tab</p>
            </div>
            <div className="h-full flex items-center ml-auto">
                <p className="text-text-1">69/100</p>
            </div>
        </div>
    )
}

export default TeacherQuizStudentScoresListItem