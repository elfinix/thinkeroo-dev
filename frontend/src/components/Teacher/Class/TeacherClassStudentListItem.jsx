import React from 'react'

const TeacherClassStudentListItem = () => {
    return (
        <div className="cursor-pointer w-full h-[69px] border-b-2 border-0 border-primary-3 flex items-center justify-between">
            <div className="h-full flex items-center gap-2">
                <img className="w-[30px] h-[30px] rounded-full object-cover object-center" src="https://placehold.co/50x50" alt="" />
                <p className="text-text-1">Adolf Niggler</p>
            </div>
            <button>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
                    <path fill="#F93F3F" d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-9.414 2.828-2.829 1.415 1.415L11.414 10l2.829 2.828-1.415 1.415L10 11.414l-2.828 2.829-1.415-1.415L8.586 10 5.757 7.172l1.415-1.415L10 8.586Z"/>
                </svg>
            </button>
        </div>
    )
}

export default TeacherClassStudentListItem