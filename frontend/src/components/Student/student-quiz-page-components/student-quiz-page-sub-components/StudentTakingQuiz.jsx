import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { AlertCircle } from "lucide-react";
import BackIcon from "../../student-basic-components/student-icons-components/BackIcon";
import StudentClassPageQuiz from "../../student-class-page-components/student-class-page-view-components/student-class-page-view-sub-components/StudentClassPageQuiz";
import StudentQuizShowCorrect from "./StudentQuizShowCorrect";
import StudentQuizResult from "./StudentQuizResult";
import { API_ENDPOINT } from "/constants/constants";

function StudentTakingQuiz({ selectedQuiz, handleBackToQuizList, classItem, onBack }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [answeredQuestions, setAnsweredQuestions] = useState(0);
    const [errorMessages, setErrorMessages] = useState([]);
    const [errorQuestions, setErrorQuestions] = useState([]);
    const [currentView, setCurrentView] = useState("quizTaking"); // 'quizTaking', 'classQuiz', or 'quizResult'
    const modalRef = useRef(null);
    const [questions, setQuestions] = useState([]); // Added state for questions
    const [userId, setUserId] = useState(null);
    const [quizResults, setQuizResults] = useState(null);

    // Fetch questions and user ID from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                // Fetch questions
                const questionsResponse = await axios.get(`${API_ENDPOINT}/api/quiz-questions/quiz/${selectedQuiz.id}/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                const sortedQuestions = questionsResponse.data.sort((a, b) => a.question_order - b.question_order);
                setQuestions(sortedQuestions);
                console.log(sortedQuestions);
                console.log("Sorted Questions", sortedQuestions);

                // Fetch user ID (assuming you have an endpoint to get user details)
                const userResponse = await axios.get(`${API_ENDPOINT}/api/users/get_user_id/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setUserId(userResponse.data.user_id);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                // Handle errors (e.g., show a notification)
            }
        };

        fetchData();
    }, [selectedQuiz.id]);

    const initialTimeLimit = selectedQuiz.duration * 60; // Convert minutes to seconds
    const [timeLeft, setTimeLeft] = useState(initialTimeLimit);
    const [progress, setProgress] = useState(0);

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600); // 3600 seconds in an hour
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const formattedHours = hours < 10 ? "0" + hours : hours;
        const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
        const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    };

    const handleSelectionChange = (questionId, option, noOfAnswer) => {
        setSelectedAnswers((prevSelectedAnswers) => {
            const updatedSelections = { ...prevSelectedAnswers };

            if (!updatedSelections[questionId]) {
                updatedSelections[questionId] = [];
            }

            const selectedOptions = updatedSelections[questionId];
            const isSelected = selectedOptions.includes(option);

            if (!isSelected) {
                if (noOfAnswer === 1) {
                    // Replace existing selection
                    updatedSelections[questionId] = [option];
                } else {
                    // Add to existing selections
                    updatedSelections[questionId].push(option);
                }
            } else {
                // Remove the option if it's already selected
                updatedSelections[questionId] = selectedOptions.filter((opt) => opt !== option);
            }

            setAnsweredQuestions(Object.keys(updatedSelections).length);
            return updatedSelections;
        });
    };

    const handleShortAnswerChange = (questionId, answer) => {
        setSelectedAnswers((prevSelectedAnswers) => {
            const updatedSelections = { ...prevSelectedAnswers, [questionId]: answer };
            setAnsweredQuestions(Object.keys(updatedSelections).length);
            return updatedSelections;
        });
    };

    useEffect(() => {
        if (timeLeft <= 0) {
            handleSubmit();
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    useEffect(() => {
        const progressPercentage = (answeredQuestions / (questions.length - 1)) * 100;
        setProgress(progressPercentage);
    }, [answeredQuestions, questions.length]);

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Token ${token}`,
                    "Content-Type": "application/json",
                },
            };

            // Loop through each question and submit individual responses
            const responsePromises = Object.entries(selectedAnswers).map(([quiz_question_id, selected_option]) => {
                const responsePayload = {
                    student_id: userId,
                    quiz_question_id: parseInt(quiz_question_id, 10),
                    selected_option: Array.isArray(selected_option) ? selected_option.join(", ") : selected_option,
                };

                // Log the payload being sent to the API
                console.log("Sending payload to API:", responsePayload);

                return axios.post(`${API_ENDPOINT}/api/responses/submit/`, responsePayload, config);
            });

            await Promise.all(responsePromises);

            // Optionally, you can calculate the total score here or fetch it from the backend
            // For this example, we'll assume there's an endpoint to calculate and return the total score
            const submitResponse = await axios.post(
                `${API_ENDPOINT}/api/responses/calculate_score/`, // Ensure this endpoint exists or adjust accordingly
                { quiz_id: selectedQuiz.id },
                config
            );

            const { total_score, quiz_id } = submitResponse.data;

            // Manually send a POST request to update StudentScore
            const studentScoreData = {
                student: userId,
                quiz: quiz_id,
                total_score: total_score,
                time_finished: new Date().toISOString(),
            };

            // Log the payload being sent to the API
            console.log("Sending student score payload to API:", studentScoreData);

            await axios.post(`${API_ENDPOINT}/api/student-scores/`, studentScoreData, config);

            console.log("Quiz submitted successfully!");

            // Fetch the quiz results
            const resultResponse = await axios.get(
                `${API_ENDPOINT}/api/student-scores/quiz-results/${selectedQuiz.id}/`,
                config
            );
            const { responses: quizResponses, correct_answers } = resultResponse.data;

            if (selectedQuiz.shows_results) {
                setCurrentView("quizShowCorrect");
                setQuizResults({ total_score, responses: quizResponses, correct_answers });
            } else {
                setCurrentView("quizResult");
                setQuizResults({ total_score });
            }
        } catch (error) {
            console.error("Failed to submit quiz:", error);
            // Handle error accordingly (e.g., show error messages)
            setErrorMessages(["Failed to submit quiz. Please try again."]);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setErrorMessages([]);
                setErrorQuestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderQuestion = (question, idx) => {
        const questionNumber = idx + 1;
        const isError = errorQuestions.includes(question.id);
        switch (question.question.type) {
            case "MC":
                return (
                    <div key={question.id} className="border-2 p-6 rounded-xl border-primary-3 flex flex-col space-y-4">
                        <div className="text-lg sm:text-xl text-text-1 mb-2 sm:mb-4">Question {questionNumber}</div>
                        <div className="text-sm sm:text-base text-text-1 mb-2 sm:mb-4">{question.question.content}</div>

                        {/* Display multiple choice answers */}
                        <div className="flex flex-col space-y-3">
                            {["A", "B", "C", "D"].map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                                        selectedAnswers[question.id] && selectedAnswers[question.id].includes(option)
                                            ? "text-secondary-1 border-2 border-secondary-1 p-3"
                                            : "text-primary-3 border-2 border-primary-3 p-3"
                                    }`}
                                    onClick={() => handleSelectionChange(question.id, option, 1)} // Assuming single answer
                                >
                                    {option}. {question.question[`choice${index + 1}`]}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case "TF":
                return (
                    <div key={question.id} className="border-2 p-6 rounded-xl border-primary-3 flex flex-col space-y-4">
                        <div className="text-lg sm:text-xl text-text-1 mb-2 sm:mb-4">Question {questionNumber}</div>
                        <div className="text-sm sm:text-base text-text-1 mb-2 sm:mb-4">{question.question.content}</div>

                        {/* Display true/false answers */}
                        <div className="flex flex-col space-y-3">
                            {["True", "False"].map((option, index) => (
                                <button
                                    key={index}
                                    className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base ${
                                        selectedAnswers[question.id] && selectedAnswers[question.id].includes(option)
                                            ? "text-secondary-1 border-2 border-secondary-1 p-3"
                                            : "text-primary-3 border-2 border-primary-3 p-3"
                                    }`}
                                    onClick={() => handleSelectionChange(question.id, option, 1)} // Assuming single answer
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case "IDN":
                const isShortAnswerError = errorQuestions.includes(question.id);
                return (
                    <div
                        key={question.id}
                        className={`border-2 p-4 sm:p-6 rounded-xl ${
                            isShortAnswerError ? "border-red-500" : "border-primary-3"
                        } flex flex-col space-y-4`}
                    >
                        <div className="text-lg sm:text-xl text-text-1 mb-2 sm:mb-4">Question {questionNumber}</div>
                        <div className="text-sm sm:text-base text-text-1 mb-2 sm:mb-4">{question.question.content}</div>
                        <div>
                            <input
                                className="w-full border-2 bg-primary-1 border-primary-3 text-text-2 py-2 px-4 rounded-lg focus:outline-none focus:ring-secondary-1 focus:ring-2 text-sm sm:text-base"
                                placeholder="Type your answer here"
                                type="text"
                                onChange={(e) => handleShortAnswerChange(question.id, e.target.value)}
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    if (currentView === "classQuiz") {
        return <StudentClassPageQuiz classItem={classItem} selectedQuiz={selectedQuiz} />;
    }

    if (currentView === "quizShowCorrect" && quizResults) {
        return <StudentQuizShowCorrect questions={questions} onBack={handleBackToQuizList} selectedQuiz={selectedQuiz} />;
    }

    if (currentView === "quizResult" && quizResults) {
        return (
            <StudentQuizResult
                totalScore={quizResults.total_score}
                onBack={handleBackToQuizList}
                selectedQuiz={selectedQuiz}
            />
        );
    }

    return (
        <div
            className="flex-col min-h-screen fixed inset-0 bg-primary-1 text-text-1 z-50 flex items-center justify-center font-lexend"
            style={{
                position: "absolute",
                zIndex: 1000,
            }}
        >
            <div className="sticky top-0 z-10 flex flex-col sm:flex-row justify-between items-center gap-0 sm:gap-11 border-b-2 pb-4 pt-4 border-b-primary-3 bg-primary-1">
                <button
                    className="self-start text-text-1 font-semibold flex items-center"
                    onClick={onBack} // Update view to classQuiz
                >
                    <BackIcon /> Back
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-2 w-full">
                    <div className="text-sm sm:text-base text-text-2 text-center">{selectedQuiz.title}</div>
                    <div className="max-w-full sm:w-[750px] bg-primary-3 h-1 rounded-full">
                        <div className="bg-secondary-1 h-1 rounded-full" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="text-sm sm:text-base text-text-2">{formatTime(timeLeft)}</div>
                </div>
                <button
                    className="bg-accent-1 hover:bg-accent-2 text-primary-1 px-6 py-2 rounded-full text-sm sm:text-base w-auto whitespace-nowrap font-medium"
                    onClick={handleSubmit}
                >
                    Submit Quiz
                </button>
            </div>

            {/* Error Message */}
            {errorMessages.length > 0 && (
                <>
                    <div className="fixed inset-0 bg-black opacity-50 z-40" />
                    <div
                        ref={modalRef}
                        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 border-2 border-red-500 bg-primary-1 z-50 p-4 sm:p-6 w-[90%] sm:w-auto max-w-lg rounded-lg flex items-start space-x-2"
                    >
                        <AlertCircle className="text-red-500 w-5 h-5" />
                        <p className="text-sm sm:text-base">{errorMessages.join(", ")}</p>
                    </div>
                </>
            )}

            <div
                className="p-4 w-full sm:p-6 md:p-8 pb-48 md:pb-24 mx-4 sm:mx-12 lg:pl-64 lg:pr-80 overflow-y-auto"
                style={{ maxHeight: "calc(100vh - 130px)", scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <style>
                    {`
                        .scrollable-div::-webkit-scrollbar {
                            display: none; /* for Chrome, Safari, and Opera */
                        }
                    `}
                </style>
                <div className="space-y-8 scrollable-div">
                    {questions.map((question, index) => renderQuestion(question, index))}
                </div>
            </div>
        </div>
    );
}

export default StudentTakingQuiz;
