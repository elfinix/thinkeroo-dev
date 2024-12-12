import React from 'react'

const TeacherClassQuizCard = ({ viewScore }) => {
    return (
        <div className="w-[455px] h-[245px] rounded-[10px] border-2 border-solid border-primary-3 p-4 relative flex flex-col justify-between">
            <h2 className="w-3/5 text-ellipsis whitespace-nowrap overflow-hidden text-text-1 font-bold text-[20px]">WST - Quiz 1: HTML</h2>
            <p onClick={() => viewScore('Data Goes Here')} className="absolute top-0 right-0 m-4 underline text-text-1 cursor-pointer">View Grades</p>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 18 21">
                        <path fill="#7C7C90" d="m14.618 4.968 1.453-1.453 1.414 1.414-1.453 1.453A9 9 0 1 1 9 3c2.125 0 4.078.736 5.618 1.968ZM9 19A7 7 0 1 0 9 5a7 7 0 0 0 0 14ZM8 7h2v6H8V7ZM5 0h8v2H5V0Z"/>
                    </svg>
                    <p className="text-text-2">60 mins</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 20 20">
                        <path fill="#7C7C90" d="M17 20H3a3 3 0 0 1-3-3V1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12h4v4a3 3 0 0 1-3 3Zm-1-5v2a1 1 0 1 0 2 0v-2h-2Zm-2 3V2H2v15a1 1 0 0 0 1 1h11ZM4 5h8v2H4V5Zm0 4h8v2H4V9Zm0 4h5v2H4v-2Z"/>
                    </svg>
                    <p className="text-text-2">100 items</p>
                </div>
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                        <path fill="#7C7C90" d="M5 2V0h2v2h6V0h2v2h4a1 1 0 0 1 1 1v5h-2V4h-3v2h-2V4H7v2H5V4H2v14h6v2H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4Zm10 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-6 4a6 6 0 1 1 12 0 6 6 0 0 1-12 0Zm5-3v3.414l2.293 2.293 1.414-1.414L16 14.586V12h-2Z"/>
                    </svg>
                    <p className="text-text-2">8:00 AM | 12/1/2024</p>
                </div>
            </div>
            <p className="text-text-2">Created: 11/30/2024</p>
        </div>
    )
}

export default TeacherClassQuizCard