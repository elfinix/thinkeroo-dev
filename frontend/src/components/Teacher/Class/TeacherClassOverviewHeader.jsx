import React from "react";

const TeacherClassOverviewHeader = ({ setRender, render, setShowOverview }) => {
    return (
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center gap-14">
            <button onClick={() => setShowOverview(false)} className="flex gap-2 items-center text-text-1">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M3.82843 6.9999H16V8.9999H3.82843L9.1924 14.3638L7.7782 15.778L0 7.9999L7.7782 0.22168L9.1924 1.63589L3.82843 6.9999Z"
                        fill="#7c7c90"
                    />
                </svg>
                Back to Class List
            </button>
            <p
                onClick={() => setRender("Overview")}
                className={`select-none font-medium text-[20px] cursor-pointer ${
                    render === "Overview" ? "text-secondary-1" : "text-text-1"
                } `}
            >
                Overview
            </p>
            <p
                onClick={() => setRender("Quiz")}
                className={`select-none font-medium text-[20px] cursor-pointer ${
                    render === "Quiz" ? "text-secondary-1" : "text-text-1"
                } `}
            >
                Quiz
            </p>
            <p
                onClick={() => setRender("Student")}
                className={`select-none font-medium text-[20px] cursor-pointer ${
                    render === "Student" ? "text-secondary-1" : "text-text-1"
                } `}
            >
                Student
            </p>
        </div>
    );
};

export default TeacherClassOverviewHeader;
