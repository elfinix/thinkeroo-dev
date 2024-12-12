import React from 'react'

const TeacherClassOverviewDetailsEdit = ({ setShowEditDetails }) => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center">
            <div className="p-6 bg-primary-1 border-2 border-primary-3 border-solid w-[745px] rounded-[10px]">
                <h1 className="text-[38px] font-semibold text-text-1 mb-6">Create Class</h1>
                <h2 className="text-[20px] font-semibold text-text-1 mb-4">Class Detail</h2>
                <label>
                    <p className="text-text-2 mb-[10px]">Class Name</p>
                    <input placeholder="What's the name of the class" className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2" type="text" />
                </label>
                <label>
                    <p className="text-text-2">Class Image</p>
                    <input placeholder="What's the name of the class" className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2" type="file" accept=""/>
                </label>
                <label>
                    <p className="text-text-2 mb-[10px]">Student Limit</p>
                    <input placeholder="Number of students allowed" className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2" type="number" min={1} />
                </label>
                <div className="flex gap-4 mt-[20px] w-full">
                    <button onClick={() => setShowEditDetails(false)} className="ml-auto w-[119px] h-[42px] border-solid border-2 border-text-1 rounded-[50px] text-text-1 font-medium text-base flex items-center justify-center">
                        Cancel
                    </button>
                    <button className="w-[119px] h-[42px] bg-accent-1 border-none rounded-[50px] text-primary-1 font-medium text-base flex items-center justify-center">
                        Create Class
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TeacherClassOverviewDetailsEdit