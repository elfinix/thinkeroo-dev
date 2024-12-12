import React from 'react'

const TeacherArchivePopUp = () => {
    return (
        <div className="absolute top-12 right-0 w-[163px] h-[100px] rounded-[10px] bg-primary-1 border-2 border-primary-3 flex flex-col justify-evenly p-2">
            <button onClick={() => selectQuiz('Selected Data Goes Here')} className="w-full flex items-center gap-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="#F5F5F5" d="m20 3 2 4v13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.004L4 3h16Zm0 6H4v10h16V9Zm-8 1 4 4h-3v4h-2v-4H8l4-4Zm6.764-5H5.236l-.999 2h15.527l-1-2Z"/>
                </svg>
                <p className="font-medium text-text-1">Unarchive</p>
            </button>
            <button className="w-full flex items-center gap-2 p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path fill="#F93F3F" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2H6v12h12V8Zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14ZM9 4v2h6V4H9Z"/>
                </svg>
                <p className="font-medium text-negative">Delete</p>
            </button>
        </div>
    )
}

export default TeacherArchivePopUp