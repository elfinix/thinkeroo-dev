import React from 'react'

const Header = ({ teacherRender }) => {
    return (
        <>
            <div className="w-full h-[87px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center px-8 justify-between">
                <h1 className="font-semibold text-[38px] text-text-1">{teacherRender}</h1>
                <button className="w-[42px] h-[42px] rounded-full overflow-hidden" type='button'>
                    <img src="https://placehold.co/80x80" alt="profile-menu" />
                </button>
            </div>
        </>
    )
}

export default Header