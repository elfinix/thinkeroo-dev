import React, { useState } from "react";
import ConfirmationRemoveStudent from "./TeacherClassStudentListItemConfirmDelete";

const TeacherClassStudentListItem = ({ student, onClick, onDelete }) => {
    const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);

    const handleDeleteClick = (e) => {
        e.stopPropagation(); // Prevent triggering the onClick event of the list item
        setShowRemoveConfirmation(true);
    };

    const handleConfirmDelete = () => {
        onDelete(student.id);
        setShowRemoveConfirmation(false);
    };

    return (
        <>
            <div
                className="student-list-item cursor-pointer w-full h-[69px] border-b-2 border-0 border-primary-3 flex items-center justify-between"
                onClick={onClick} // Handle click event
            >
                <div className="h-full flex items-center gap-2">
                    <img
                        className="w-[30px] h-[30px] rounded-full object-cover object-center"
                        src={student.profile_picture || "https://placehold.co/50x50"}
                        alt=""
                    />
                    <p className="text-text-1">
                        {student.first_name} {student.last_name}
                    </p>
                </div>
                <button onClick={handleDeleteClick}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 20 20"
                        alt-text="Delete"
                    >
                        <path
                            fill="#F93F3F"
                            d="M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10Zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-9.414 2.828-2.829 1.415 1.415L11.414 10l2.829 2.828-1.415 1.415L10 11.414l-2.828 2.829-1.415-1.415L8.586 10 5.757 7.172l1.415-1.415L10 8.586Z"
                        />
                    </svg>
                </button>
            </div>
            {showRemoveConfirmation && (
                <ConfirmationRemoveStudent
                    setShowRemoveConfirmation={setShowRemoveConfirmation}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </>
    );
};

export default TeacherClassStudentListItem;
