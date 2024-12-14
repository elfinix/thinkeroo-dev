import React from "react";

const TeacherClassCardPopUp = ({ selectClass }) => {
    return (
        <div className="absolute top-8 right-0 w-[163px] h-[100px] rounded-[10px] bg-primary-1 border-2 border-primary-3 flex flex-col justify-evenly p-2">
            <button
                onClick={() => selectClass("Selected Data Goes Here")}
                className="w-full flex items-center gap-2 p-2 hover:bg-primary-2 rounded-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path
                        fill="#F5F5F5"
                        d="M6.414 15.89 16.556 5.748l-1.414-1.414L5 14.476v1.414h1.414Zm.829 2H3v-4.243L14.435 2.212a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 17.89ZM3 19.89h18v2H3v-2Z"
                    />
                </svg>
                <p className="font-medium text-text-1">Edit Class</p>
            </button>
            <button className="w-full flex items-center gap-2 p-2 hover:bg-primary-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#F93F3F" viewBox="0 0 24 24">
                    <path d="M22 20V7L20 3H4L2 7.00353V20C2 20.5523 2.44772 21 3 21H21C21.5523 21 22 20.5523 22 20ZM4 9H20V19H4V9ZM5.236 5H18.764L19.764 7H4.237L5.236 5ZM15 11H9V13H15V11Z"></path>
                </svg>
                <p className="font-medium text-negative">Archive</p>
            </button>
        </div>
    );
};

export default TeacherClassCardPopUp;
