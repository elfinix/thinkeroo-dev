import React, { useState } from "react";
import TeacherClassCardPopUp from "./TeacherClassCardPopUp";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClassCard = ({ classItem, studentCount, setSelectedClass, setShowOverview, onArchive }) => {
    const [showPopUp, setShowPopUp] = useState(false);

    const onClassClick = () => {
        setSelectedClass(classItem);
        setShowOverview(true);
    };

    const togglePopUp = (e) => {
        e.stopPropagation();
        setShowPopUp(!showPopUp);
    };

    const copyClassCodeToClipboard = (e) => {
        e.stopPropagation();
        navigator.clipboard
            .writeText(classItem.class_code)
            .then(() => {
                console.log("Class code copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy class code: ", err);
            });
    };

    return (
        <div className="w-[259px] h-[323px] border-primary-3 border-solid border-2 rounded-[10px] overflow-hidden relative">
            <div className="teacher_class_card_image w-full h-[150px] cursor-pointer" onClick={onClassClick}>
                <img
                    className="w-full h-full object-center object-cover select-none pointer-events-none"
                    src={classItem.banner_img ? `${API_ENDPOINT}/${classItem.banner_img}` : "https://placehold.co/200x80"}
                    alt={classItem.name}
                />
            </div>
            <div className="p-3 px-4 h-[173px] flex flex-col justify-between">
                <div className="flex justify-between items-center relative">
                    <h2
                        className="text-[20px] font-bold text-text-1 cursor-pointer hover:underline"
                        style={{ maxWidth: "80%", whiteSpace: "normal" }}
                        onClick={onClassClick}
                    >
                        {classItem.name}
                    </h2>
                    <button onClick={togglePopUp}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                fill="#F5F5F5"
                                d="M12 3c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Zm0-7c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z"
                            />
                        </svg>
                    </button>
                    {showPopUp && <TeacherClassCardPopUp classId={classItem.id} onArchive={onArchive} />}
                </div>
                <div className="flex items-center justify-between">
                    <div className="mt-auto flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                fill="#7C7C90"
                                d="M2 22a8 8 0 1 1 16 0h-2a6 6 0 0 0-12 0H2Zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6Zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm8.284 3.703A8.002 8.002 0 0 1 23 22h-2a6.001 6.001 0 0 0-3.537-5.473l.82-1.824Zm-.688-11.29A5.5 5.5 0 0 1 21 8.5a5.499 5.499 0 0 1-5 5.478v-2.013a3.5 3.5 0 0 0 1.041-6.609l.555-1.943Z"
                            />
                        </svg>
                        <p className="text-text-2 text-base">{studentCount}</p>
                    </div>
                    <p className="underline text-text-2 cursor-pointer" onClick={copyClassCodeToClipboard}>
                        {classItem.class_code}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TeacherClassCard;
