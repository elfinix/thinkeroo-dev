import React from "react";

const TeacherQuizStudentScoresListItem = ({ studentScore }) => {
    console.log(studentScore);

    return (
        <div className="w-full h-[69px] border-b-2 border-0 border-primary-3 flex items-center">
            <div className="h-full flex items-center gap-2 mr-[50px]">
                <img
                    className="w-[30px] h-[30px] rounded-full object-cover object-center"
                    src="https://placehold.co/50x50"
                    alt=""
                />
                <div>
                    <div className="flex gap-2">
                        <p className="text-text-1">{studentScore.student_name}</p>
                        <p className="text-text-2">•</p>
                        <p className="text-text-2">
                            {new Date(studentScore.time_started).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </p>
                    </div>
                    <p className="text-text-2">{studentScore.time_taken} mins</p>
                </div>
            </div>
            <div className="h-full flex items-center">
                <p className="text-positive">No cheating mechanisms detected</p>
            </div>
            <div className="h-full flex items-center ml-auto">
                <p className="text-text-1">{studentScore.score}/100</p>
            </div>
        </div>
    );
};

export default TeacherQuizStudentScoresListItem;
