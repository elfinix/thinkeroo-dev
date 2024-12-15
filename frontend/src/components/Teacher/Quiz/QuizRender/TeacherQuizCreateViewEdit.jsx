import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionComponent from "./QuestionComponent";
import { API_ENDPOINT } from "/constants/constants";
import { FaArrowUp, FaArrowDown, FaTrash } from "react-icons/fa";

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

    const fetchQuizQuestions = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/api/quiz-questions/quiz/${selectedQuiz.id}/`);
            const quizQuestions = response.data.map((qq) => ({
                id: qq.question_instance.id,
                type: qq.question_instance.type,
                content: qq.question_instance.content,
                options: qq.question_instance.options.map((option) => ({
                    content: option.content,
                    is_correct: option.is_correct,
                })),
                correctAnswer: qq.question_instance.options.find((option) => option.is_correct)?.content || null,
            }));
            setQuestions(quizQuestions);
        } catch (error) {
            console.error("Failed to fetch quiz questions:", error);
        }
    };

    useEffect(() => {
        if (selectedQuiz) {
            setTitle(selectedQuiz.title);
            setDescription(selectedQuiz.description);
            const totalSeconds = selectedQuiz.duration * 60;
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
            setSchedule(new Date(selectedQuiz.schedule).toISOString().split("T")[0]);
            setClassId(selectedQuiz.class_instance.id);
            setShowScore(selectedQuiz.shows_results || false);
            fetchQuizQuestions();
        }
    }, [selectedQuiz]);

    useEffect(() => {
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
    }, []);

    useEffect(() => {
        const hoursValid = /^([0-1]\d|2[0-3])$/.test(hours);
        const minutesValid = /^([0-5]\d)$/.test(minutes);
        const secondsValid = /^([0-5]\d)$/.test(seconds);
        setIsDurationValid(hoursValid && minutesValid && secondsValid);
    }, [hours, minutes, seconds]);

    const handleAddQuestion = () => {
        const newQuestion = { id: Date.now(), type: "True or False", content: "", choices: [] };
        setQuestions([...questions, newQuestion]);
    };

    const handleRemoveQuestion = (id) => {
        setQuestions(questions.filter((question) => question.id !== id));
    };

    const moveQuestionUp = (index) => {
        if (index === 0) return;
        const newQuestions = [...questions];
        [newQuestions[index - 1], newQuestions[index]] = [newQuestions[index], newQuestions[index - 1]];
        setQuestions(newQuestions);
    };

    const moveQuestionDown = (index) => {
        if (index === questions.length - 1) return;
        const newQuestions = [...questions];
        [newQuestions[index + 1], newQuestions[index]] = [newQuestions[index], newQuestions[index + 1]];
        setQuestions(newQuestions);
    };

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleScheduleChange = (e) => setSchedule(e.target.value);
    const handleClassChange = (e) => setClassId(e.target.value);
    const handleShowScoreChange = (e) => setShowScore(e.target.checked);

    const getSelectedClassName = () => {
        const selectedClass = classes.find((cls) => cls.id === classId);
        return selectedClass ? selectedClass.name : "Select Class";
    };

    const handleSaveQuiz = async () => {
        if (!isDurationValid) {
            alert("Please enter a valid duration in HH:MM:SS format.");
            return;
        }

        const totalMinutes = parseInt(hours || "0") * 60 + parseInt(minutes || "0") + parseInt(seconds || "0") / 60;

        const quizData = {
            title,
            description,
            duration: totalMinutes,
            schedule,
            class_instance: classId, // Ensure this matches the backend field name
            shows_results: showScore,
            questions,
        };

        console.log("Quiz Data:", quizData); // Log the data being sent

        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            let response;
            if (selectedQuiz) {
                response = await axios.put(`${API_ENDPOINT}/api/quizzes/${selectedQuiz.id}/`, quizData, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            } else {
                response = await axios.post(`${API_ENDPOINT}/api/quizzes/`, quizData, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
            }

            const savedQuiz = response.data;

            // Save quiz questions
            for (const question of questions) {
                const questionData = {
                    quiz_instance: savedQuiz.id,
                    content: question.content,
                    type: question.type,
                    options: question.options.map((option) => ({
                        content: option.content,
                        is_correct: option.is_correct,
                    })),
                };

                if (question.id) {
                    await axios.put(`${API_ENDPOINT}/api/questions/${question.id}/`, questionData, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                } else {
                    await axios.post(`${API_ENDPOINT}/api/questions/`, questionData, {
                        headers: {
                            Authorization: `Token ${token}`,
                        },
                    });
                }
            }

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
                        <path fill="#1E1E2C" d="M5 13l-5-5 1.414-1.414L5 10.172l7.586-7.586L14 4l-9 9z" />
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
                            <input
                                type="text"
                                value={hours}
                                onChange={(e) => setHours(e.target.value)}
                                placeholder="HH"
                                maxLength="2"
                                className={`w-16 h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 ${
                                    isDurationValid ? "border-primary-3" : "border-red-500"
                                } bg-transparent`}
                            />
                            <span className="text-text-2">:</span>
                            <input
                                type="text"
                                value={minutes}
                                onChange={(e) => setMinutes(e.target.value)}
                                placeholder="MM"
                                maxLength="2"
                                className={`w-16 h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 ${
                                    isDurationValid ? "border-primary-3" : "border-red-500"
                                } bg-transparent`}
                            />
                            <span className="text-text-2">:</span>
                            <input
                                type="text"
                                value={seconds}
                                onChange={(e) => setSeconds(e.target.value)}
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
                            <option className="text-black" value="">
                                {selectedQuiz.class_name}
                            </option>
                            {classes
                                .filter((cls) => cls.name !== selectedQuiz.class_name)
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
                            <div className="absolute top-0 right-0 m-6 flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => moveQuestionUp(index)}
                                    className="text-blue-500 border p-2 rounded"
                                >
                                    <FaArrowUp />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => moveQuestionDown(index)}
                                    className="text-blue-500 border p-2 rounded"
                                >
                                    <FaArrowDown />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveQuestion(question.id)}
                                    className="text-red-500 border p-2 rounded"
                                >
                                    <FaTrash />
                                </button>
                            </div>
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
