import React, { useState } from 'react'
import TeacherClassStudentListItem from './TeacherClassStudentListItem'
import TeacherClassInviteStudent from './TeacherClassInviteStudent'

const TeacherClassOverviewStudentList = () => {
    const [invite, setInvite] = useState(false);

    return (
        <>
            <div className="w-full flex flex-col h-[90%] pb-8">
                <div className="w-full h-[42px] flex justify-between items-center mb-4">
                    <input type="text" placeholder="Search Student" className="w-[502px] text-text-1 focus:outline-text-1 placeholder:text-text-2 placeholder:font-medium h-[42px] px-4 rounded-[10px] border-2 border-primary-3 bg-transparent" />
                    <button onClick={() => setInvite(true)} className="w-[163px] h-[42px] flex items-center justify-center text-primary-1 font-medium text-[16px] bg-accent-1 rounded-[50px] gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                            <path className="fill-primary-1" d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z"/>
                        </svg>
                        Create Class
                    </button>
                </div>
                <div className="w-full h-[90%] flex gap-4">
                    <div className="w-full h-full border-2 border-primary-3 rounded-[10px] p-5">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-medium text-text-1">Student List</h2>
                            <h2 className="text-xl font-medium text-text-2">10/30</h2>
                        </div>
                        <div className="w-full h-[92%] overflow-y-auto">
                            <TeacherClassStudentListItem/>
                            <TeacherClassStudentListItem/>
                        </div>
                    </div>
                    <div className="w-[300px] border-2 border-primary-3 rounded-[10px] p-5 flex flex-col gap-5">
                        <h2 className="text-xl font-medium text-text-1">Student Details</h2>
                        <img className="w-[125px] h-[125px] object-cover object-center rounded-full mx-auto" src="https://placehold.co/50x50" alt="" />
                        <div className="flex flex-col gap-2">
                            <p className="text-text-2">First Name</p>
                            <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">Adolf</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-text-2">Last Name</p>
                            <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">Niggler</h4>
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-text-2">Date Added</p>
                            <h4 className="text-text-2 bg-primary-3 p-2 px-4 rounded-[10px]">11/30/2024</h4>
                        </div>
                    </div>
                </div>
            </div>
            {
                invite && 
                    <TeacherClassInviteStudent  
                        setInvite={setInvite}
                    />
            }
        </>
    )
}

export default TeacherClassOverviewStudentList