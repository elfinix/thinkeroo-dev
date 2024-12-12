import React, { useState } from "react";
import QuestionComponent from "./QuestionComponent";

const TeacherQuizCreate = ({ selectedQuiz, unselectQuiz }) => {
    const [questions, setQuestions] = useState([]);

    // Add a new question
    const handleAddQuestion = () => {
        setQuestions([
        ...questions,
        { id: Date.now(), type: "True or False", question: "", choices: [] },
        ]);
    };

    // Remove a question
    const handleRemoveQuestion = (id) => {
        setQuestions(questions.filter((question) => question.id !== id));
    };

    return (
        <div className="w-full h-full flex flex-col items-center overflow-hidden pb-8">
        <div className="w-11/12 h-[76px] border-b-primary-3 border-2 border-x-0 border-t-0 flex items-center justify-between gap-14">
            <button
            onClick={() => unselectQuiz()}
            type="button"
            className="flex items-center gap-[10px] text-text-1 font-bold text-[20px]"
            >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
            >
                <path
                fill="#F5F5F5"
                d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                />
            </svg>
            Back
            </button>
            <h2 className="font-medium text-[20px] text-text-1">Quiz Maker</h2>
            <button className="bg-accent-1 p-2 px-4 rounded-[50px] flex items-center justify-center gap-2 font-medium">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="none"
                viewBox="0 0 14 14"
            >
                <path
                fill="#1E1E2C"
                d="M6 6V0h2v6h6v2H8v6H6V8H0V6h6Z"
                />
            </svg>
            <p className="text-base">Save Quiz</p>
            </button>
        </div>
        <div className="w-11/12 h-[80%] overflow-hidden flex gap-8 mt-[20px]">
            <div className="border-2 flex flex-col gap-2 border-primary-3 rounded-[10px] h-fit w-[480px] p-4">
            <h3 className="text-text-1 text-[20px] font-medium">Quiz Detail</h3>
            <label className="flex flex-col w-full gap-2">
                <p className="text-text-2">Quiz Name</p>
                <input
                type="text"
                placeholder="Name"
                className="h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                />
            </label>
            <label className="flex flex-col w-full gap-2">
                <p className="text-text-2">Description</p>
                <textarea
                placeholder="Write the description"
                className="min-h-[57px] max-h-36 p-2 px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                />
            </label>
            <label className="flex flex-col w-full gap-2">
                <p className="text-text-2">Timer</p>
                <input
                type="time"
                className="h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                />
            </label>
            <label className="flex flex-col w-full gap-2">
                <p className="text-text-2">Schedule</p>
                <input
                type="date"
                className="h-[57px] px-3 text-text-1 placeholder:text-text-2 rounded-[10px] border-2 border-primary-3 bg-transparent"
                />
            </label>
            <label className="flex flex-col w-full gap-2">
                <p className="text-text-2">Assigned to</p>
                <select
                className="h-[57px] text-text-1 px-3 rounded-[10px] border-2 border-primary-3 bg-transparent"
                >
                <option className="text-black" value="">
                    Class 1
                </option>
                <option className="text-black" value="">
                    Class 2
                </option>
                <option className="text-black" value="">
                    Class 3
                </option>
                <option className="text-black" value="">
                    Class 4
                </option>
                </select>
            </label>
            <label className="flex justify-between items-center mt-4">
                <p className="text-text-2 text-base">Show Score and Answers after take</p>
                <input type="checkbox" value="" className="sr-only peer" />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-purple-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
            </label>
            </div>
            <div className="w-full h-full overflow-y-auto">
            {questions.map((question, index) => (
                <div key={question.id} className="mb-4 border-2 border-primary-3 rounded-[10px] p-4 relative">
                    <QuestionComponent 
                        index={index}
                    />
                    <button
                        type="button"
                        onClick={() => handleRemoveQuestion(question.id)}
                        className="absolute top-0 right-0 m-6"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path fill="#F93F3F" d="M17 6h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6h5V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3Zm1 2H6v12h12V8Zm-4.586 6 1.768 1.768-1.414 1.414L12 15.414l-1.768 1.768-1.414-1.414L10.586 14l-1.768-1.768 1.414-1.414L12 12.586l1.768-1.768 1.414 1.414L13.414 14ZM9 4v2h6V4H9Z"/>
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
                    <path fill="#F5F5F5" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2h6Z"/>
                </svg>
                Add Question
            </button>
            </div>
        </div>
        </div>
    );
};

export default TeacherQuizCreate;
