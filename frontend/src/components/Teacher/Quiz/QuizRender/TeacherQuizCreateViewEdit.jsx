import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionComponent from "./QuestionComponent";
import { API_ENDPOINT } from "/constants/constants";

const TeacherQuizCreateViewEdit = ({ selectedQuiz, unselectQuiz }) => {
    const [questions, setQuestions] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [hours, setHours] = useState("00");
    const [minutes, setMinutes] = useState("00");
    const [seconds, setSeconds] = useState("00");
    const [schedule, setSchedule] = useState("");
    const [classId, setClassId] = useState("");
    const [classes, setClasses] = useState([]);
    const [showScore, setShowScore] = useState(false); // Manages 'shows_results'
    const [isDurationValid, setIsDurationValid] = useState(true);

    useEffect(() => {
        if (selectedQuiz) {
            setTitle(selectedQuiz.title);
            setDescription(selectedQuiz.description);
            // Convert duration from total minutes to "HH:MM:SS" format
            if (!isNaN(selectedQuiz.duration)) {
                const totalSeconds = selectedQuiz.duration * 60; // Convert minutes to seconds
                const hours = Math.floor(totalSeconds / 3600)
                    .toString()
                    .padStart(2, "0");
                const minutes = Math.floor((totalSeconds % 3600) / 60)
                    .toString()
                    .padStart(2, "0");
                const seconds = (totalSeconds % 60).toString().padStart(2, "0");
                setHours(hours);
                setMinutes(minutes);
                setSeconds(seconds);
            } else {
                setHours("00");
                setMinutes("00");
                setSeconds("00");
            }
            setSchedule(new Date(selectedQuiz.schedule).toISOString().split("T")[0]);
            setClassId(selectedQuiz.class_instance.id); // Assuming class_instance includes id
            setShowScore(selectedQuiz.shows_results || false); // Updated to map 'shows_results'
        }

        // Fetch classes
        const fetchClasses = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const response = await axios.get(`${API_ENDPOINT}/api/classes/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setClasses(response.data);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
            }
        };

        fetchClasses();

        // Fetch questions for the selected quiz
        const fetchQuizQuestions = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/quiz-questions/quiz/${selectedQuiz.id}/`);
                setQuestions(response.data);
            } catch (error) {
                console.error("Failed to fetch quiz questions:", error);
            }
        };

        if (selectedQuiz) {
            fetchQuizQuestions();
        }
    }, [selectedQuiz]);

    // Centralized Validation for Duration
    useEffect(() => {
        const hoursValid = /^([0-1]\d|2[0-3])$/.test(hours);
        const minutesValid = /^([0-5]\d)$/.test(minutes);
        const secondsValid = /^([0-5]\d)$/.test(seconds);
        setIsDurationValid(hoursValid && minutesValid && secondsValid);
    }, [hours, minutes, seconds]);

    // Add a new question
    const handleAddQuestion = () => {
        setQuestions([...questions, { id: Date.now(), type: "True or False", question: "", choices: [] }]);
    };

    // Remove a question
    const handleRemoveQuestion = (id) => {
        setQuestions(questions.filter((question) => question.id !== id));
    };

    // Handle input changes
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleScheduleChange = (e) => setSchedule(e.target.value);
    const handleClassChange = (e) => setClassId(e.target.value);
    const handleShowScoreChange = (e) => setShowScore(e.target.checked);

    // Helper function to get class name based on classId
    const getSelectedClassName = () => {
        const selectedClass = classes.find((cls) => cls.id === classId);
        return selectedClass ? selectedClass.name : "Select Class";
    };

    // Handle Save Quiz
    const handleSaveQuiz = async () => {
        // Check if duration is valid
        if (!isDurationValid) {
            alert("Please enter a valid duration in HH:MM:SS format.");
            return;
        }

        // Convert "HH:MM:SS" to total minutes
        const totalMinutes = parseInt(hours || "0") * 60 + parseInt(minutes || "0") + parseInt(seconds || "0") / 60;

        const quizData = {
            title,
            description,
            duration: totalMinutes, // Backend expects duration in minutes
            schedule,
            class_id: classId,
            shows_results: showScore, // Maps 'showScore' to 'shows_results'
            questions,
        };

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const response = await axios.post(`${API_ENDPOINT}/api/quizzes/`, quizData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            // Handle successful save
            alert("Quiz saved successfully!");
            unselectQuiz();
        } catch (error) {
            console.error("Failed to save quiz:", error);
            alert("Failed to save quiz. Please try again.");
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center overflow-hidden pb-8">
            <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center justify-between gap-14">
                <button
                    onClick={() => unselectQuiz()}
                    type="button"
                    className="flex items-center gap-[10px] text-text-1 font-bold text-[20px]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <path
                            fill="#F5F5F5"
                            d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                        />
                    </svg>
                    Back
                </button>
                <h2 className="font-medium text-[20px] text-text-1">Quiz Maker</h2>
                <button
                    onClick={handleSaveQuiz}
                    type="button"
                    className="bg-accent-1 p-2 px-4 rounded-[50px] flex items-center justify-center gap-2 font-medium"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                        <path fill="#1E1E2C" d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z" />
                    </svg>
                    <p className="text-base">Save Quiz</p>
                </button>
            </div>
            <div className="w-11/12 h-[80%] overflow-hidden flex gap-8 mt-[20px]">
                <div className="border-2 flex flex-col gap-2 border-primary-3 rounded-[10px] h-fit w-[480px] p-4">
                    <h3 className="text-text-1 text-[20px] font-medium">Quiz Detail</h3>
                    <label className="flex flex-col w-full gap-2">
                        <p className="text-text-2">Quiz Title</p>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Title"
                            className="h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col w-full gap-2">
                        <p className="text-text-2">Description</p>
                        <textarea
                            placeholder="Write a description"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="min-h-[57px] max-h-36 p-2 px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col w-full gap-2">
                        <p className="text-text-2">Timer</p>
                        <div className="flex items-center gap-2">
                            {/* Hours Input */}
                            <input
                                type="text"
                                value={hours}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^([0-1]?\d|2[0-3]?)$/;
                                    if (regex.test(value) || value === "") {
                                        setHours(value);
                                    }
                                }}
                                placeholder="HH"
                                maxLength="2"
                                className={`w-16 h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 ${
                                    isDurationValid ? "border-primary-3" : "border-red-500"
                                } bg-transparent`}
                            />
                            <span className="text-text-2">:</span>
                            {/* Minutes Input */}
                            <input
                                type="text"
                                value={minutes}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^([0-5]?\d)$/;
                                    if (regex.test(value) || value === "") {
                                        setMinutes(value);
                                    }
                                }}
                                placeholder="MM"
                                maxLength="2"
                                className={`w-16 h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 ${
                                    isDurationValid ? "border-primary-3" : "border-red-500"
                                } bg-transparent`}
                            />
                            <span className="text-text-2">:</span>
                            {/* Seconds Input */}
                            <input
                                type="text"
                                value={seconds}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const regex = /^([0-5]?\d)$/;
                                    if (regex.test(value) || value === "") {
                                        setSeconds(value);
                                    }
                                }}
                                placeholder="SS"
                                maxLength="2"
                                className={`w-16 h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 ${
                                    isDurationValid ? "border-primary-3" : "border-red-500"
                                } bg-transparent`}
                            />
                        </div>
                        {!isDurationValid && (
                            <p className="text-red-500 text-sm mt-1">Invalid time format. Please use HH:MM:SS.</p>
                        )}
                    </label>
                    <label className="flex flex-col w-full gap-2">
                        <p className="text-text-2">Schedule</p>
                        <input
                            type="date"
                            value={schedule}
                            onChange={handleScheduleChange}
                            className="h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                        />
                    </label>
                    <label className="flex flex-col w-full gap-2">
                        <p className="text-text-2">Assigned to</p>
                        <select
                            value={classId}
                            onChange={handleClassChange}
                            className="h-[57px] text-text-1 px-3 rounded-[10px] border-2 border-primary-3 bg-transparent"
                        >
                            {/* Always display the selected quiz class name as the first choice */}
                            <option className="text-black" value="">
                                {selectedQuiz.class_name}
                            </option>
                            {/* Map through classes, excluding the current selectedQuiz class */}
                            {classes
                                .filter((cls) => cls.name !== selectedQuiz.class_name) // Exclude selectedQuiz class name
                                .map((cls) => (
                                    <option key={cls.id} className="text-black" value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                        </select>
                    </label>
                    <label className="flex justify-between items-center mt-4">
                        <p className="text-text-2 text-base">Show Score and Answers after take</p>
                        <input
                            type="checkbox"
                            checked={showScore}
                            onChange={handleShowScoreChange}
                            className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600 cursor-pointer"></div>
                    </label>
                </div>
                <div className="w-full h-full overflow-y-auto">
                    {questions.map((question, index) => (
                        <div key={question.id} className="mb-4 border-2 border-primary-3 rounded-[10px] p-4 relative">
                            <QuestionComponent
                                index={index}
                                question={question}
                                handleRemoveQuestion={handleRemoveQuestion}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveQuestion(question.id)}
                                className="absolute top-0 right-0 m-6"
                            >
                                {/* Add your remove icon here */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 16 16"
                                >
                                    <path fill="#F5F5F5" d="M2 2l12 12M14 2L2 14" />
                                </svg>
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddQuestion}
                        className="w-full h-[75px] bg-transparent text-white border-dashed border-2 border-primary-3 rounded-[10px] flex items-center justify-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="#F5F5F5" d="M11 11V5h2v6h6v2h-6v6H6V8H0V6h6Z" />
                        </svg>
                        Add Question
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherQuizCreateViewEdit;
