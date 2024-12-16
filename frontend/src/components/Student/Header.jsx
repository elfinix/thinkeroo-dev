import React, { useState, useRef } from 'react';
import StudentProfileModal from './student-basic-components/student-modal-components/StudentProfileModal';
import StudentProfile from './student-profile-components/StudentProfile';

const Header = ({ studentRender }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const buttonRef = useRef(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleProfileClick = () => {
        setShowProfile(true);
        closeModal();
    };

    const goBack = () => {
        setShowProfile(false);
    };

    return (
        <>
            <div className="w-full h-[87px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center px-8 justify-between relative">
                <h1 className="font-semibold text-[38px] text-text-1">{studentRender}</h1>
                <button
                    ref={buttonRef}
                    onClick={openModal}
                    className="w-[42px] h-[42px] rounded-full overflow-hidden"
                    type='button'
                >
                    <img src="https://placehold.co/80x80" alt="profile-menu" />
                </button>
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${buttonRef.current.getBoundingClientRect().bottom + window.scrollY - 30}px`,
                        left: `${buttonRef.current.getBoundingClientRect().right - 150}px`,
                        zIndex: 1000
                    }}
                >
                    <StudentProfileModal closeModal={closeModal} onProfileClick={handleProfileClick} />
                </div>
            )}

            {showProfile && <StudentProfile goBack={goBack} />}
        </>
    );
};

export default Header;
