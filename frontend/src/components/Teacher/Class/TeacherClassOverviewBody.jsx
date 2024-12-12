import React from 'react'
import TeacherClassOverviewPostList from './TeacherClassOverviewPostList'

const TeacherClassOverviewBody = () => {
    return (
        <div className="w-full h-[88%]">
            <div className="w-full h-[323px] overflow-hidden rounded-[10px] relative">
                <img className="w-full h-full object-cover object-center" src="https://www.bypeople.com/wp-content/uploads/2022/09/core-web-vitals-cover.png" alt="" />
                <div
                className="w-full h-full absolute top-0 left-0 flex items-end justify-start px-10 py-6"
                style={{
                    background: "linear-gradient(transparent, #1818188e)",
                  }}                
                >
                    <h2 className="font-semibold text-[38px] text-text-1">Web System Technology 1</h2>
                </div>
            </div>
            <div className="w-full min-h-[83px] border-2 border-solid border-primary-3 mt-5 rounded-[10px] flex items-center gap-6">
                <img className="w-[30px] h-[30px] rounded-full ml-6 object-center object-cover" src="https://placehold.co/50x50" alt="" />
                <input className="outline-none bg-transparent w-full text-text-1 placeholder:text-text-2" type="text" name="" id="" placeholder="Write something you want to announce in this class."/>
            </div>
            <TeacherClassOverviewPostList/>
        </div>
    )
}

export default TeacherClassOverviewBody