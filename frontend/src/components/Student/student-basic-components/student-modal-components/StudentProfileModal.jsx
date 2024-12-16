import React, { useState, useEffect, useRef } from 'react';
import { UserRound, LogOut } from 'lucide-react'; 
import StudentModal from './StudentModal';

const StudentProfileModal = ({ closeModal, onProfileClick }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);

    const handleLogoutClick = () => {
        setIsModalOpen(true);
    };

    const handleCancelSave = () => {
        setIsModalOpen(false);
    };

    const handleConfirmSave = () => {
        console.log('Logging out...'); // Actual logout logic here
    };

    return (
        <div
            ref={modalRef}
            className="fixed z-50 border-primary-3 border-2 bg-primary-1 mt-8 text-text-1 p-4 rounded-lg w-64 sm:w-72 md:w-72 lg:w-[150px] xl:w-[150px] font-lexend"
        >
            <div className="space-y-3">
                <button
                    onClick={onProfileClick}
                    className="flex items-center w-full py-2 px-4 text-text-1 hover:border-2 hover:border-primary-3 rounded-lg text-xs sm:text-sm"
                >
                    <UserRound className="mr-2" size={16} />
                    Profile
                </button>
                <button
                    onClick={handleLogoutClick}
                    className="flex items-center w-full py-2 px-4 text-red-500 hover:border-2 hover:border-red-600 rounded-lg text-xs sm:text-sm"
                >
                    <LogOut className="mr-2" size={16} />
                    Log out
                </button>
            </div>
            {isModalOpen && (
                <StudentModal 
                    isOpen={isModalOpen}
                    onClose={handleCancelSave}
                    onSave={handleConfirmSave}
                    modalTitle="Log out?"
                    modalDesc="Are you sure you want to logout?"
                    bttnName="Confirm"
                />
            )}
        </div>
    );
};

export default StudentProfileModal;
