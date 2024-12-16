import React, { useState } from "react";
import TeacherPersonalInfo from "./Profile-Subcomponents/TeacherPersonalInfo";
import TeacherAccPass from "./Profile-Subcomponents/TeacherAccPass";
import BooksIcon from "../IconComponents/BooksIcon";
import LockIcon from "../IconComponents/BooksIcon";
import BackIcon from "../IconComponents/BooksIcon";

function TeacherProfile({ goBack }) {
    // Assume goBack is passed from the parent component
    const [activeTab, setActiveTab] = useState("personalInfo");

    const teacher = initialTeacherData[0];
    const initialTeacherData = [
        {
            personalDetail: {
                image: "https://via.placeholder.com/100",
                firstName: "John",
                lastName: "Doe",
                role: "Math Teacher",
            },
            accountDetail: {
                email: "john.doe@example.com",
                password: "password123",
            },
        },
    ];

    return (
        <div
            className="fixed inset-0 bg-primary-1 text-text-1 z-50 flex items-center justify-center font-lexend"
            style={{
                position: "absolute",
                zIndex: 1000,
            }}
        >
            <div className="border border-primary-3 rounded-lg shadow-lg p-8 flex flex-col md:flex-row w-full max-w-4xl">
                <div className="md:w-1/3 flex flex-col items-center border-r border-gray-700 pr-8">
                    <a className="self-start text-text-1 mb-4 flex items-center cursor-pointer" onClick={goBack}>
                        <BackIcon size={24} color="#F5F5F5" className="mr-2" />
                        Go back
                    </a>
                    <img
                        alt="Teacher Profile"
                        className="rounded-full w-24 h-24 mb-4"
                        src={teacher.personalDetail.image || "https://via.placeholder.com/100"}
                        width="100"
                        height="100"
                    />
                    <h2 className="text-base font-semibold">
                        {teacher.personalDetail.firstName} {teacher.personalDetail.lastName}
                    </h2>
                    <p className="text-text-2 text-sm">{teacher.personalDetail.role}</p>
                    <div className="mt-8 w-full">
                        <a
                            className={`flex items-center mb-4 text-base ${
                                activeTab === "personalInfo" ? "text-secondary-1" : "text-text-1"
                            }`}
                            onClick={() => setActiveTab("personalInfo")}
                        >
                            <BooksIcon
                                size={24}
                                color={activeTab === "personalInfo" ? "#8A2EDF" : "#F5F5F5"}
                                className="mr-2"
                            />
                            Personal Information
                        </a>
                        <a
                            className={`flex items-center text-base ${
                                activeTab === "accountPassword" ? "text-secondary-1" : "text-text-1"
                            }`}
                            onClick={() => setActiveTab("accountPassword")}
                        >
                            <LockIcon
                                size={24}
                                color={activeTab === "accountPassword" ? "#8A2EDF" : "#F5F5F5"}
                                className="mr-2"
                            />
                            Account &amp; Password
                        </a>
                    </div>
                </div>

                <div className="md:w-2/3 mt-8 md:mt-0 md:pl-8">
                    {activeTab === "personalInfo" && <TeacherPersonalInfo teacher={teacher} />}
                    {activeTab === "accountPassword" && <TeacherAccPass teacher={teacher} />}
                </div>
            </div>
        </div>
    );
}

export default TeacherProfile;
