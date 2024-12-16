import React, { useState, useEffect } from "react";
import { Timer, CalendarClock, UserRoundCheck, ScrollText } from "lucide-react";
import { initialQuizData } from "../../../student-basic-components/MockStudentData";
import StudentTakingQuiz from "../../../student-quiz-page-components/student-quiz-page-sub-components/StudentTakingQuiz";
import StudentWarnQuizModal from "../../../student-basic-components/student-modal-components/StudentWarnQuizModal";

import axios from "axios";
import { API_ENDPOINT } from "/constants/constants";

function StudentClassPageQuiz({ classItem }) {
    console.log(classItem);
    const [filteredQuizData, setFilteredQuizData] = useState(initialQuizData);
    const [currentView, setCurrentView] = useState("quizList"); // Track current view
    const [selectedQuiz, setSelectedQuiz] = useState(null); // Track selected quiz
    const [showWarningModal, setShowWarningModal] = useState(false);

    const [quizzes, setQuizzes] = useState([]);
    const [error, setError] = useState(null);

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowWarningModal(true); // Open the warning modal
    };

    const handleConfirmStartQuiz = () => {
        setShowWarningModal(false);
        setCurrentView("takingQuiz"); // Proceed to taking quiz
    };

    const handleCancelStartQuiz = () => {
        setShowWarningModal(false); // Close the modal without proceeding
    };

    const fetchQuizzes = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const response = await axios.get(`${API_ENDPOINT}/api/quizzes/class/${classItem.id}/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setQuizzes(response.data);
        } catch (err) {
            console.error("Failed to fetch quizzes:", err);
            setError("Unable to load quizzes.");
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [classItem.id]);

    const handleBackToQuizList = () => {
        setCurrentView("quizList"); // Navigate back to quiz list
        setSelectedQuiz(null); // Clear selected quiz
    };

    if (currentView === "takingQuiz" && selectedQuiz) {
        return <StudentTakingQuiz quizData={selectedQuiz} onBack={handleBackToQuizList} classItem={classItem} />;
    }

    return (
        <div className="w-full border-b-primary-3 border-2 border-x-0 border-t-0 -ml-8">
            <div className="flex items-center gap-14 px-6 py-3"></div>

            {/* Quiz Section */}
            <div className="flex min-h-screen bg-primary-1 text-text-1 font-lexend px-8 py-6">
                <div className="flex-1">
                    {/* Quiz Cards */}
                    <div className="flex flex-wrap mt-4 gap-6">
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
            {/* Warning Modal */}
            <StudentWarnQuizModal
                isOpen={showWarningModal}
                onClose={handleCancelStartQuiz}
                onConfirm={handleConfirmStartQuiz}
            />
        </div>
    );
}

export default StudentClassPageQuiz;
