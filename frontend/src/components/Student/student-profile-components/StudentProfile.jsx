import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentPersonalInfo from "./student-profile-sub-components/StudentPersonalInfo";
import StudentAccPass from "./student-profile-sub-components/StudentAccPass";
import BooksIcon from "../student-basic-components/student-icons-components/BooksIcon";
import LockIcon from "../student-basic-components/student-icons-components/LockIcon";
import BackIcon from "../student-basic-components/student-icons-components/BackIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from "react-icons/fa";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { API_ENDPOINT } from "/constants/constants";

function StudentProfile({ goBack }) {
    const [activeTab, setActiveTab] = useState("personalInfo");
    const [student, setStudent] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const userIdResponse = await axios.get(`${API_ENDPOINT}/api/users/get_user_id/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const userId = userIdResponse.data.user_id;

                const userResponse = await axios.get(`${API_ENDPOINT}/api/users/user/${userId}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setStudent(userResponse.data);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    const handleProfilePictureChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const tempUrl = URL.createObjectURL(file);
            document.getElementById("profile").src = tempUrl;

            const formData = new FormData();
            formData.append("profile_picture", file);

            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const response = await axios.patch(`${API_ENDPOINT}/api/users/user/${student.id}/`, formData, {
                    headers: {
                        Authorization: `Token ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                setStudent(response.data);
            } catch (error) {
                console.error("Failed to upload profile picture:", error);
            } finally {
                URL.revokeObjectURL(tempUrl); // Clean up the temporary URL
            }
        }
    };

    if (!student) {
        return <div>Loading...</div>;
    }

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
                    <div
                        className="relative mb-3"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        <img
                            alt="Student Profile"
                            className="rounded-full w-24 h-24"
                            src={student.profile_picture || "https://via.placeholder.com/100"}
                            width="100"
                            height="100"
                            id="profile"
                        />
                        {isHovering && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                                <label htmlFor="profile-picture-upload" className="cursor-pointer">
                                    <FontAwesomeIcon icon={faCamera} size="2x" color="#FFFFFF" />
                                </label>
                                <input
                                    id="profile-picture-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfilePictureChange}
                                />
                            </div>
                        )}
                    </div>
                    <h2 className="text-base font-semibold">
                        {student.first_name} {student.last_name}
                    </h2>
                    <p className="text-text-2 text-sm">{student.role}</p>
                    <div className="mt-8 w-full cursor-pointer">
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
                    {activeTab === "personalInfo" && <StudentPersonalInfo student={student} />}
                    {activeTab === "accountPassword" && <StudentAccPass student={student} />}
                </div>
            </div>
        </div>
    );
}

export default StudentProfile;
