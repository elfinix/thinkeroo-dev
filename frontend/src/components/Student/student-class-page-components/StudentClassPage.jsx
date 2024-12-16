import React, { useState, useEffect } from "react";
import { ListFilter, Plus, Copy, UsersRound } from "lucide-react";
import StudentSearchField from "../student-basic-components/StudentSearchField";
import StudentJoinClassModal from "../student-basic-components/student-modal-components/StudentJoinClassModal";
import StudentFilterModal from "../student-basic-components/student-modal-components/StudentFilterModal";
import StudentClassPageOverview from "../student-class-page-components/student-class-page-view-components/student-class-page-view-sub-components/StudentClassPageOverview";
import axios from "axios";
import { API_ENDPOINT } from "/constants/constants"; // Ensure correct path

const StudentClassPage = () => {
    const [filteredClassData, setFilteredClassData] = useState([]);
    const [classList, setClassList] = useState([]);
    const [studentCounts, setStudentCounts] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [currentView, setCurrentView] = useState("classPage");
    const [selectedClass, setSelectedClass] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const response = await axios.get(`${API_ENDPOINT}/api/user-class/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setClassList(response.data);
                setFilteredClassData(response.data);
                fetchStudentCounts(response.data, token);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
            }
        };

        const fetchStudentCounts = async (classes, token) => {
            const counts = {};
            await Promise.all(
                classes.map(async (classItem) => {
                    try {
                        const countResponse = await axios.get(
                            `${API_ENDPOINT}/api/user-class/total_students/${classItem.id}/`,
                            {
                                headers: {
                                    Authorization: `Token ${token}`,
                                },
                            }
                        );
                        counts[classItem.id] = countResponse.data.total_students;
                    } catch (error) {
                        console.error(`Failed to fetch student count for class ID ${classItem.id}:`, error);
                        counts[classItem.id] = 0;
                    }
                })
            );
            setStudentCounts(counts);
        };

        fetchClasses();
    }, []);

    const handleSearchChange = (query) => {
        setSearchQuery(query);
        const filteredData = classList.filter((classItem) => classItem.subject?.toLowerCase().includes(query.toLowerCase()));
        setFilteredClassData(filteredData);
    };

    const handleCopy = (classCode) => {
        navigator.clipboard
            .writeText(classCode)
            .then(() => {
                alert("Class code copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy class code:", err);
            });
    };

    const handleClassClick = (classItem) => {
        setSelectedClass(classItem);
        setCurrentView("classOverview");
    };

    const handleJoinClass = () => {
        setIsModalOpen(true);
    };

    const handleJoin = () => {
        console.log("Joined the class!");
        setIsModalOpen(false);
        // Optionally, refetch the classes to include the newly joined class
        // fetchClasses();
    };

    const toggleModal = () => {
        setIsFilterModalOpen(!isFilterModalOpen);
    };

    const closeModal = () => {
        setIsFilterModalOpen(false);
    };

    const handleBackToClasses = () => {
        setCurrentView("classPage");
        setSelectedClass(null);
    };

    if (currentView === "classOverview" && selectedClass) {
        return <StudentClassPageOverview classData={selectedClass} onBack={handleBackToClasses} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-primary-1 text-text-1 font-lexend">
            <div className="flex-1 p-4 md:p-6">
                {/* Search Field */}
                <div className="sticky top-0 z-50 mb-6">
                    <StudentSearchField onChange={handleSearchChange} value={searchQuery} />
                </div>

                {/* Actions: Filter and Join Class */}
                <div className="flex bg-primary-1 justify-between border-b-2 py-4 border-primary-3 items-center font-lexend sticky top-24 z-50 -mt-24">
                    <button
                        onClick={toggleModal}
                        className="border-2 border-text-1 text-text-1 px-4 py-2 rounded-xl flex items-center hover:opacity-75"
                    >
                        <ListFilter className="mr-2" />
                        Filter
                    </button>
                    <button
                        className="bg-accent-1 text-primary-1 font-semibold hover:bg-accent-2 px-4 py-2 rounded-full flex items-center"
                        onClick={handleJoinClass}
                    >
                        <Plus className="mr-2" /> Join Class
                    </button>
                </div>

                {/* Filter Modal */}
                {isFilterModalOpen && (
                    <StudentFilterModal
                        sortOptions={[
                            { value: "ascending", label: "Ascending" },
                            { value: "descending", label: "Descending" },
                        ]}
                        filterOptions={[
                            { value: "dateAccomplished", label: "Date Accomplished" },
                            { value: "name", label: "Name" },
                            { value: "createdOn", label: "Created On" },
                        ]}
                        closeModal={closeModal}
                    />
                )}

                {/* Class List */}
                <div className="flex flex-wrap mt-20 gap-6">
                    {filteredClassData.map((classItem) => (
                        <div
                            key={classItem.id}
                            className="border-2 border-primary-3 rounded-xl w-[285.2px] h-[357.73px] cursor-pointer hover:bg-primary-3 focus:outline-none"
                            onClick={() => handleClassClick(classItem)}
                        >
                            <img
                                alt={`${classItem.banner_img} Illustration`}
                                className="rounded-t-lg mb-4"
                                height="50"
                                src={
                                    classItem.banner_img
                                        ? `${API_ENDPOINT}/${classItem.banner_img}`
                                        : "https://placehold.co/200x80"
                                }
                                width="300"
                            />
                            <div className="flex justify-between items-center mt-5 mb-2 px-4">
                                <h2 className="text-2xl font-bold truncate">{classItem.name}</h2>
                            </div>
                            <div className="flex justify-between items-center text-text-2 text-base pt-20 mt-5">
                                <div className="flex items-center pl-4">
                                    <UsersRound size={20} className="mr-2" /> {studentCounts[classItem.id] || 0}
                                </div>
                                <div className="flex items-center flex-shrink-0 pr-4">
                                    <span className="mr-2">{classItem.class_code}</span>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCopy(classItem.class_code);
                                        }}
                                    >
                                        <Copy size={20} className="ml-2 hover:text-text-1" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Join Class Modal */}
            <StudentJoinClassModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onJoin={handleJoin}
                modalTitle="Join Class"
                bttnName="Join"
            />
        </div>
    );
};

export default StudentClassPage;
