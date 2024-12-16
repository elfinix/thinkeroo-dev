import React, { useState } from 'react'
import logo from './../../assets/logo.svg'

const StudentSidebar = ({ studentRender, setStudentRender }) => {
    const [expand, setExpand] = useState(true)
    
    return (
        <>
            <div className={`student_sidebar ${expand ? "w-[274px]" : "w-[112px]"} h-full border-r-2 border-primary-3 border-solid p-6 flex flex-col items-center justify-start relative`}>
                <button onClick={() => setExpand(!expand)} className={`absolute ${expand ? "left-[94%]" : "left-[85%] rotate-180"} top-8 border-2 border-text-1 rounded-[10px] w-[30px] h-[30px] flex items-center justify-center bg-primary-1`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
                        <path fill="#F5F5F5" d="m11.303 3.697 1.061 1.06L8.871 8.25h6.88v1.5H8.87l3.493 3.493-1.06 1.06L6 9l5.303-5.303ZM3 14.25V3.75h1.5v10.5H3Z"/>
                    </svg>
                </button>
                <div className="w-full h-12 flex items-center justify-center gap-2 ">
                    <img className=" h-12 select-none pointer-events-none" src={logo} alt="" />
                    {expand && 
                        <h1 className="text-2xl font-semibold text-text-1">Thinkeroo</h1>
                    }
                </div>
                <div className="flex flex-col items-center justify-center gap-6 mt-24">
                    <button onClick={() => setStudentRender('Class')} className="student_sidebar_entry w-full flex items-center gap-2">
                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                            <path className={`${studentRender === 'Class' ? 'fill-secondary-1' : 'fill-text-1'}`} fill="#f5f5f5" d="M5.333 4C4.597 4 4 4.597 4 5.333v21.334C4 27.403 4.597 28 5.333 28h13.334c.736 0 1.333-.597 1.333-1.333v-6.27l1.333 6.27c.153.72.86 1.18 1.581 1.026l5.217-1.109a1.333 1.333 0 0 0 1.027-1.581L25.277 6.744a1.333 1.333 0 0 0-1.582-1.027l-3.705.788a1.334 1.334 0 0 0-1.323-1.172h-5.334C13.333 4.597 12.736 4 12 4H5.333Zm8 4h4v10.667h-4V8Zm0 17.333v-4h4v4h-4ZM10.667 6.667V20h-4V6.667h4Zm0 16v2.666h-4v-2.666h4Zm12.443-.468 2.608-.554.554 2.608-2.608.555-.555-2.608Zm-.555-2.608L20.337 9.157l2.609-.554 2.217 10.434-2.608.554Z"/>
                        </svg>
                        {expand && 
                            <p className={`font-medium text-[20px] text-start select-none ${studentRender === 'Class' ? 'text-secondary-1' : 'text-text-1'}`}>Class</p>
                        }
                    </button>
                    <button onClick={() => setStudentRender('Quiz')} className="student_sidebar_entry w-full flex items-center gap-2">
                        <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
                            <path className={`${studentRender === 'Quiz' ? 'fill-secondary-1' : 'fill-text-1'}`} fill="#f5f5f5" d="M9.252 18.71c-.31.832-.572 1.6-.806 2.377 1.279-.929 2.801-1.518 4.557-1.738 3.35-.419 6.327-2.631 7.834-5.41l-1.94-1.94 1.883-1.887 1.334-1.335c.573-.573 1.22-1.632 1.903-3.157-7.457 1.156-12.024 5.722-14.765 13.09Zm13.415-6.714L24 13.33c-1.333 4-5.333 8-10.667 8.666-3.558.445-5.78 2.89-6.669 7.334H4c1.333-8 4-26.667 24-26.667-1.332 3.997-2.664 6.662-3.996 7.997-.45.448-.893.893-1.337 1.337Z"/>
                        </svg>
                        {expand && 
                            <p className={`font-medium text-[20px] text-start select-none ${studentRender === 'Quiz' ? 'text-secondary-1' : 'text-text-1'}`}>Quiz</p>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default StudentSidebar