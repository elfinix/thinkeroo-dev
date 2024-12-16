import React, { useState, useEffect } from "react";
import { Dot, Edit3, Copy } from "lucide-react";
import axios from "axios";
import StudentClassHeader from "../../../student-basic-components/student-topbar-components/StudentClassHeader";
import StudentClassPageQuiz from "./StudentClassPageQuiz";
import StudentClassPage from "../../StudentClassPage";
import { API_ENDPOINT } from "/constants/constants";

function StudentClassPageOverview({ classData: classItem, onBack }) {
    const [render, setRender] = useState("Overview");
    const [showOverview, setShowOverview] = useState(true);
    const [class_totalStudents, setTotalStudents] = useState(0);
    const [backToClasslist, setBackToClasslist] = useState(false);

    const fetchTotalStudents = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/api/user-class/total_students/${classItem.id}/`);
            setTotalStudents(response.data.total_students);
        } catch (error) {
            console.error("Failed to fetch total students:", error);
        }
    };

    useEffect(() => {
        fetchTotalStudents();
    }, [classItem.id]);

    return (
        <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend">
            <div className="flex-1 p-4 md:p-6 -ml-1 -mt-6">
                {/* Render Header */}
                <StudentClassHeader
                    setRender={setRender}
                    render={render}
                    setShowOverview={setShowOverview}
                    onBack={onBack} // Trigger navigation back to Classlist
                />

                {/* Render Content Based on 'render' State */}
                {showOverview ? (
                    render === "Overview" ? (
                        <div className="p-4 flex flex-col space-y-4 mt-5 -ml-4 overflow-y-auto max-h-[calc(100vh-200px)]">
                            <div className="flex space-x-4">
                                {/* Class Detail */}
                                <div className="border-2 border-primary-3 p-4 rounded-xl w-60 relative">
                                    <h2 className="text-xl text-text-1 font-semibold mb-4 flex items-center justify-between">
                                        Class Details
                                        {/* <Edit3
                                            className="text-secondary-1 cursor-pointer hover:text-secondary-2"
                                            size={20}
                                            title="Edit Class Details"
                                        /> */}
                                    </h2>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-text-2 text-sm">Class Code:</p>
                                            <div className="flex items-center">
                                                <p className="text-base text-text-1">{classItem.class_code}</p>
                                                {/* <Copy
                                                    className="ml-2 text-secondary-1 cursor-pointer hover:text-secondary-2"
                                                    size={20}
                                                    title="Copy Class Code"
                                                    onClick={() => navigator.clipboard.writeText("XXX-XXX-XXX")}
                                                /> */}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-text-2 text-sm">Class Limit:</p>
                                            <p className="text-base text-text-1">{classItem.class_limit}</p>
                                        </div>
                                        <div>
                                            <p className="text-text-2 text-sm">Student Count:</p>
                                            <p className="text-base text-text-1">{class_totalStudents}</p>
                                        </div>
                                        <div>
                                            <p className="text-text-2 text-sm">Created:</p>
                                            <p className="text-base text-text-1">
                                                {new Date(classItem.created_at).toLocaleDateString("en-US", {
                                                    timeZone: "UTC",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Class Image and Title */}
                                <div className="w-full h-[323px] overflow-hidden rounded-[10px] relative">
                                    <img
                                        alt={`${classItem.banner_img} Illustration`}
                                        className="rounded-xl w-full h-full object-cover"
                                        src={
                                            classItem.banner_img
                                                ? `${API_ENDPOINT}/${classItem.banner_img}`
                                                : "https://placehold.co/200x80"
                                        }
                                    />
                                    <div
                                        className="w-full h-full absolute top-0 left-0 flex items-end justify-start px-10 py-6"
                                        style={{
                                            background: "linear-gradient(transparent,rgba(10, 2, 30, 0.84) 82%)",
                                        }}
                                    >
                                        <h2 className="font-semibold text-[38px] text-text-1">{classItem.name}</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Message Section */}
                            <div className="border-2 border-primary-3 p-4 rounded-xl ml-56">
                                <div className="flex items-center mb-2">
                                    <img
                                        alt="User profile picture"
                                        className="w-10 h-10 rounded-full mr-2"
                                        height="40"
                                        src="https://storage.googleapis.com/a1aa/image/FjzTrAFWW146Pp2dZH4z7ZDU3IcpFhjS0BkG0wIyLAqiJTeJA.jpg"
                                        width="40"
                                    />
                                    <div className="flex items-center space-x-2">
                                        <p className="text-text-1">John Doe</p>
                                        <Dot className="text-text-2" size={20} />
                                        <p className="text-text-2">1:48 AM</p>
                                    </div>
                                </div>
                                <p className="text-text-1">
                                    Hello! This will be our class that we will use on this subject. All of the quizzes that
                                    we need to complete during this semester will be posted here on this channel. Please let
                                    me know if there are still students within your class that are not in this channel.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <StudentClassPageQuiz classItem={classItem} />
                    )
                ) : null}
            </div>
        </div>
    );
}

export default StudentClassPageOverview;
