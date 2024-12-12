import React from 'react'

const TeacherClassHeader = ({ setShowCreateClass }) => {
    return (
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center justify-between">
            <div className="border-primary-3 border-2 w-[298px] h-[42px] rounded-[10px] overflow-hidden flex px-2">
                <div className="h-full flex items-center">
                    <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                        <path fill="#363657" d="M9 0c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9Zm0 16c3.867 0 7-3.133 7-7s-3.133-7-7-7-7 3.133-7 7 3.133 7 7 7Zm8.485.071 2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414Z"/>
                    </svg>
                </div>
                <input placeholder="Search class" className="bg-transparent border-none w-full h-full p-2 text-text-1 focus:outline-none placeholder:text-text-2" type="text" name="" id="" />
            </div>
            <button onClick={() => setShowCreateClass(true)} className="w-[163px] h-[42px] flex items-center justify-center text-primary-1 font-medium text-[16px] bg-accent-1 rounded-[50px] gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path className="fill-primary-1" d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z"/>
                </svg>
                Create Class
            </button>
        </div>
    )
}

export default TeacherClassHeader