import React from "react";

const StudentWarnQuizModal = ({ isOpen, onClose, onConfirm }) => {
    const modalTitle = "Start Quiz?";
    const modalDesc = "Once you start the quiz, you cannot go back. Are you sure you want to start the quiz?";
    const bttnName = "Start";

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-lexend z-50">
            <div className="bg-primary-1 border-2 border-primary-3 rounded-lg shadow-lg w-9/12 sm:w-8/12 md:w-1/2 lg:w-1/5 xl:w-1/4 p-6">
                <div className="flex justify-center items-center">
                    <h2 className="text-xl md:text-2xl font-semibold text-text-1">{modalTitle}</h2>
                </div>
                <div>
                    <p className="block text-sm font-semibold text-text-2 opacity-80 mb-3 mt-8 text-center">{modalDesc}</p>
                </div>
                <div className="flex justify-center gap-4 text-sm mt-8">
                    <button
                        className="border-2 border-text-1 text-text-1 px-4 py-2 rounded-full hover:opacity-75 w-[119px]"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-accent-1 text-primary-1 px-4 py-2 rounded-full hover:bg-accent-2 w-[119px]"
                        onClick={onConfirm}
                    >
                        {bttnName}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentWarnQuizModal;
