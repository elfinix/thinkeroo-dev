import React from 'react'

const TeacherClassOverviewPostItem = () => {
    return (
        <div className="w-full p-[20px] border-2 border-solid border-primary-3 rounded-[10px] mb-[20px]">
            <div className="flex gap-2 items-center mb-4">
                <img className="w-[30px] h-[30px] rounded-full" src="https://placehold.co/50x50" alt="" />
                <p className="text-text-1">User Name</p>
                <p className="text-text-2">• 4:37 AM</p>
            </div>
            <p className="text-text-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus nulla, atque sequi dignissimos, ea ipsam quod corrupti commodi quas eum accusantium libero dolore iure corporis animi quo vel nihil reprehenderit.</p>
        </div>
    )
}

export default TeacherClassOverviewPostItem