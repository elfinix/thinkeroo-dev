import React from 'react'

const TeacherArchiveHeader = () => {
    return (
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center justify-between">
            <div className="border-primary-3 border-2 w-[298px] h-[42px] rounded-[10px] overflow-hidden flex px-2">
                <div className="h-full flex items-center">
                    <svg className="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" viewBox="0 0 21 21">
                        <path fill="#363657" d="M9 0c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9Zm0 16c3.867 0 7-3.133 7-7s-3.133-7-7-7-7 3.133-7 7 3.133 7 7 7Zm8.485.071 2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414Z"/>
                    </svg>
                </div>
                <input placeholder="Search archived class" className="bg-transparent border-none w-full h-full p-2 text-text-1 focus:outline-none placeholder:text-text-2" type="text" name="" id="" />
            </div>
        </div>
    )
}

export default TeacherArchiveHeader