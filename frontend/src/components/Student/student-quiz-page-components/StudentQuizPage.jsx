import React, { useState, useEffect } from "react";
import { ListFilter, Timer, CalendarClock, UserRoundCheck, ScrollText } from "lucide-react";
import StudentSearchField from "../student-basic-components/StudentSearchField";
import StudentFilterModal from "../student-basic-components/student-modal-components/StudentFilterModal";
import { initialQuizData } from "../student-basic-components/MockStudentData";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { API_ENDPOINT } from "/constants/constants";
import { setQuizCount, getQuizCount } from "/src/global/globals";

const StudentQuizPage = () => {
    const [filteredQuizData, setFilteredQuizData] = useState(initialQuizData);
    const [currentView, setCurrentView] = useState("quizList"); // Track current view
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);

    const handleSearchChange = (query) => {
        const filteredData = initialQuizData.filter((quiz) => quiz.quiz?.toLowerCase().includes(query.toLowerCase()));
        setFilteredQuizData(filteredData);
    };

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
        setQuizCount(quiz.question_count);
        setShowWarningModal(true); // Open the warning modal
    };

    const handleConfirmStartQuiz = () => {
        setShowWarningModal(false);
        setCurrentView("takingQuiz"); // Proceed to taking quiz
    };

    const fetchQuizzes = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/api/classes/user_class_quizzes/`);
            const data = await response.json();
            setQuizzes(data);
        } catch (error) {
            console.error("Failed to fetch quizzes:", error);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const formatDisplayTime = (timeString) => {
        const [hours, minutes] = timeString.split(":");
        let hours12 = parseInt(hours, 10);
        const period = hours12 >= 12 ? "PM" : "AM";

        if (hours12 > 12) {
            hours12 -= 12;
        } else if (hours12 === 0) {
            hours12 = 12;
        }

        return `${hours12}:${minutes} ${period}`;
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary-1 text-text-1">
            {" "}
            {/* Adjust margins here for header and menu */}
            <div className="flex-1 p-4 md:p-6">
                <div className="sticky top-0 z-50 mb-6">
                    <StudentSearchField onChange={handleSearchChange} />
                </div>
                <div className="flex bg-primary-1 border-b-2 py-4 border-primary-3 items-center font-lexend sticky top-24 z-50 -mt-24">
                    <button
                        onClick={toggleModal}
                        className="border-2 border-text-1 text-text-1 px-4 py-2 rounded-xl flex items-center hover:opacity-75"
                    >
                        <ListFilter className="mr-2" />
                        Filter
                    </button>
                </div>

                {/* Modal for filters */}
                {isModalOpen && (
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

                {/* Quiz Containers */}
                <div className="flex flex-wrap mt-20 gap-6">
                    {quizzes.length === 0 ? (
                        <p className="text-text-2">No quizzes available for this class.</p>
                    ) : (
                        quizzes.map((quiz) => (
                            <div
                                key={quiz.id}
                                className="border-2 border-primary-3 p-4 rounded-xl w-full max-w-xs 
                                       cursor-pointer hover:bg-primary-3 transition duration-200"
                                onClick={() => handleQuizClick(quiz)} // Navigate on click
                            >
                                {/* Quiz Title */}
                                <h2 className="text-base md:text-lg font-bold pb-4 truncate">{quiz.title}</h2>

                                {/* Quiz Details */}
                                <div className="text-text-2 space-y-2">
                                    <p className="flex items-center text-sm md:text-base">
                                        <Timer size={18} className="mr-2" />
                                        {quiz.duration} minutes
                                    </p>
                                    <p className="flex items-center text-sm md:text-base">
                                        <ScrollText size={18} className="mr-2" />
                                        {quiz.question_count} items
                                    </p>
                                    <p className="flex items-center text-sm md:text-base">
                                        <CalendarClock size={18} className="mr-2" />
                                        {new Date(quiz.schedule).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            timeZone: "UTC",
                                        })}{" "}
                                        | {new Date(quiz.schedule).toLocaleDateString("en-US", { timeZone: "UTC" })}
                                    </p>

                                    <p className="text-sm md:text-base pt-3">
                                        {!quiz.accomplishedTime && !quiz.accomplishedDate
                                            ? "Not Yet Taken"
                                            : `Accomplished: ${quiz.accomplishedTime || "N/A"} | ${
                                                  quiz.accomplishedDate || "N/A"
                                              }`}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentQuizPage;
