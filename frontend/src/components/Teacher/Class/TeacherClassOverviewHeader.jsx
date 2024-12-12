import React from 'react'

const TeacherClassOverviewHeader = ({ setRender, render }) => {
    return (
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center gap-14">
            <p onClick={() => setRender('Overview')} className={`select-none font-medium text-[20px] cursor-pointer ${render === 'Overview' ? 'text-secondary-1' : 'text-text-1'} `}>Overview</p>
            <p onClick={() => setRender('Quiz')} className={`select-none font-medium text-[20px] cursor-pointer ${render === 'Quiz' ? 'text-secondary-1' : 'text-text-1'} `}>Quiz</p>
            <p onClick={() => setRender('Student')} className={`select-none font-medium text-[20px] cursor-pointer ${render === 'Student' ? 'text-secondary-1' : 'text-text-1'} `}>Student</p>
        </div>
    )
}

export default TeacherClassOverviewHeader