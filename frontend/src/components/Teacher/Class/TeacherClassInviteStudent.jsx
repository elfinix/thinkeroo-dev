import React from 'react'

const TeacherClassInviteStudent = ({ setInvite }) => {
    return (
        <div className="absolute w-screen h-screen bg-[#00000080] top-0 left-0 flex items-center justify-center">
            <div className="w-[627px] h-[294px] flex flex-col rounded-[10px] overflow-hidden bg-primary-1 border-2 border-primary-3 p-4 px-6">
                <h1 className="font-semibold text-[38px] text-text-1 mb-[30px]">Invite Student</h1>
                <label className="flex gap-2 items-center border-2 border-primary-3 rounded-[10px] w-full h-[57px] px-4">
                    <input required className="w-full bg-transparent border-none outline-none text-text-1 placeholder:text-text-2" placeholder="Name@gmail.com" type="email" />
                    <button className="flex gap-[6px]" type="submit">
                        <p className="font-medium underline text-text-1">Invite</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="#F5F5F5" d="M21 3a1 1 0 0 1 1 1v16.007a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V19h18V7.3l-8 7.2-10-9V4a1 1 0 0 1 1-1h18ZM8 15v2H0v-2h8Zm-3-5v2H0v-2h5Zm14.566-5H4.434L12 11.81 19.566 5Z"/>
                        </svg>
                    </button>
                </label>
                <div className="flex gap-4 items-center mt-auto mx-auto">
                    <button onClick={() => setInvite(false)} className="cursor-pointer rounded-full w-32 h-[42px] border-2 border-text-1 bg-transparent text-text-1">Cancel</button>
                    <button onClick={() => setInvite(false)} className="cursor-pointer rounded-full w-32 h-[42px] border-0 bg-accent-1 text-text-1">Done</button>
                </div>
            </div>
        </div>
    )
}

export default TeacherClassInviteStudent