import React from "react";

const ConfirmationRemoveStudent = ({ setShowRemoveConfirmation, onConfirm }) => {
    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center">
            <div className="p-6 bg-[#1a1a2e] border-none shadow-lg w-[400px] rounded-[10px]">
                <h1 className="text-[24px] font-semibold text-[#ffffff] mb-4 text-center">Remove Student?</h1>
                <p className="text-[#cccccc] mb-6 text-center">
                    Are you sure you want to remove this student from the list?
                </p>
                <div className="flex gap-4 mt-[20px] w-full justify-center">
                    <button
                        onClick={() => setShowRemoveConfirmation(false)}
                        className="w-[100px] h-[40px] border border-[#ffffff] rounded-full text-[#ffffff] font-medium text-sm flex items-center justify-center hover:bg-[#2a2a3e]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="w-[100px] h-[40px] bg-red-500 rounded-full text-[#ffffff] font-medium text-sm flex items-center justify-center hover:bg-bg-red-500"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationRemoveStudent;
