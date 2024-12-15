import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "/constants/constants";
import ChooseFromDatabank from "./ChooseFromDataRepo"; // Ensure the correct path

const QuestionComponent = ({ index, question, handleRemoveQuestion, handleUpdateQuestion }) => {
    const [questionType, setQuestionType] = useState(() => {
        switch (question.type) {
            case "MC":
                return "Multiple Choice";
            case "IDN":
                return "Identification";
            case "TF":
                return "True or False";
            default:
                return "True or False";
        }
    });

    console.log(question); // Should now log correctly populated question data

    const [content, setContent] = useState(question.content || "");
    const [correctAnswer, setCorrectAnswer] = useState(question.answer || "");
    const [choices, setChoices] = useState([
        question.choice1 || "",
        question.choice2 || "",
        question.choice3 || "",
        question.choice4 || "",
    ]);
    const [showBank, setShowBank] = useState(false);

    // Your token (ensure this is stored securely in a real application)
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        setQuestionType(() => {
            switch (question.type) {
                case "MC":
                    return "Multiple Choice";
                case "IDN":
                    return "Identification";
                case "TF":
                    return "True or False";
                default:
                    return "True or False";
            }
        });
        setContent(question.content || "");
        setCorrectAnswer(question.answer || "");
        setChoices([question.choice1 || "", question.choice2 || "", question.choice3 || "", question.choice4 || ""]);
    }, [question]);

    const handleQuestionChange = (field, value) => {
        const updatedQuestion = { ...question, [field]: value };
        handleUpdateQuestion(index, updatedQuestion);
    };

    const handleQuestionTypeChange = (newType) => {
        setQuestionType(newType);
        handleQuestionChange("type", newType === "Multiple Choice" ? "MC" : newType === "Identification" ? "IDN" : "TF");
        if (newType === "Multiple Choice") {
            setChoices(["", "", "", ""]);
            setCorrectAnswer("");
        }
    };

    const handleSelectQuestion = (selectedQuestion) => {
        setQuestionType(() => {
            switch (selectedQuestion.type) {
                case "MC":
                    return "Multiple Choice";
                case "IDN":
                    return "Identification";
                case "TF":
                    return "True or False";
                default:
                    return "True or False";
            }
        });
        setContent(selectedQuestion.content || "");
        setCorrectAnswer(selectedQuestion.answer || "");
        setChoices([
            selectedQuestion.choice1 || "",
            selectedQuestion.choice2 || "",
            selectedQuestion.choice3 || "",
            selectedQuestion.choice4 || "",
        ]);
        handleUpdateQuestion(index, {
            type: selectedQuestion.type,
            content: selectedQuestion.content,
            choice1: selectedQuestion.choice1,
            choice2: selectedQuestion.choice2,
            choice3: selectedQuestion.choice3,
            choice4: selectedQuestion.choice4,
            answer: selectedQuestion.answer,
        });
        setShowBank(false); // Close the bank after selection
    };

    const fetchQuestionsByType = async (type) => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/api/questions/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
                params: { type },
            });
            setChoices([
                response.data.choice1 || "",
                response.data.choice2 || "",
                response.data.choice3 || "",
                response.data.choice4 || "",
            ]);
            setCorrectAnswer(response.data.answer || "");
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const renderQuestionForm = () => {
        switch (questionType) {
            case "True or False":
                return (
                    <div>
                        <p className="text-text-2 mb-2">Question</p>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                handleQuestionChange("content", e.target.value);
                            }}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <div className="flex flex-col gap-4 mt-2">
                            {["True", "False"].map((option) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        setCorrectAnswer(option);
                                        handleQuestionChange("answer", option);
                                    }}
                                    className={`border-2 rounded-[10px] border-primary-3 p-2 ${
                                        correctAnswer === option ? "text-text-1 border-secondary-1" : ""
                                    }`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            case "Identification":
                return (
                    <div>
                        <p className="text-text-2 mb-2">Question</p>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                handleQuestionChange("content", e.target.value);
                            }}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <p className="mt-2">Answer</p>
                        <input
                            type="text"
                            value={correctAnswer || ""}
                            onChange={(e) => {
                                setCorrectAnswer(e.target.value);
                                handleQuestionChange("answer", e.target.value);
                            }}
                            placeholder="Enter the answer"
                            className="border-2 border-secondary-1 outline-none text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px]"
                        />
                    </div>
                );
            case "Multiple Choice":
                return (
                    <div>
                        <p className="text-text-2 mb-2">Question</p>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => {
                                setContent(e.target.value);
                                handleQuestionChange("content", e.target.value);
                            }}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <div className="mt-2">
                            {choices.map((choice, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        name={`correct-answer-${index}`}
                                        checked={correctAnswer === choice}
                                        onChange={() => {
                                            setCorrectAnswer(choice);
                                            handleQuestionChange("answer", choice);
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Choice ${idx + 1}`}
                                        value={choice}
                                        onChange={(e) => {
                                            const newChoices = [...choices];
                                            newChoices[idx] = e.target.value;
                                            setChoices(newChoices);
                                            handleQuestionChange(`choice${idx + 1}`, e.target.value);
                                        }}
                                        className={`border-2 ${
                                            correctAnswer === choice ? "border-secondary-1" : "border-primary-3"
                                        } text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px]`}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full p-2 text-text-1">
            <div className="mb-4 flex items-center">
                <label htmlFor="questionType" className="text-[20px] mr-6">
                    {`Question ${index + 1} `}
                </label>
                <select
                    id="questionType"
                    value={questionType}
                    onChange={(e) => handleQuestionTypeChange(e.target.value)}
                    className="border-2 border-primary-3 p-2 bg-transparent rounded-[10px]"
                >
                    <option className="text-primary-1" value="True or False">
                        True or False
                    </option>
                    <option className="text-primary-1" value="Identification">
                        Identification
                    </option>
                    <option className="text-primary-1" value="Multiple Choice">
                        Multiple Choice
                    </option>
                </select>
                <button onClick={() => setShowBank(true)} className="flex items-center gap-2 ml-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path
                            fill="#F5F5F5"
                            d="M15 4H5v16h14V8h-4V4ZM3 2.992C3 2.444 3.447 2 3.998 2H16l5 5v13.992A1 1 0 0 1 20.007 22H3.993A1 1 0 0 1 3 21.008V2.992ZM12 11V8l4 4-4 4v-3H8v-2h4Z"
                        />
                    </svg>
                    <p className="text-text-1">Choose from bank</p>
                </button>
            </div>
            {renderQuestionForm()}
            {showBank && <ChooseFromDatabank setShowBank={setShowBank} handleSelectQuestion={handleSelectQuestion} />}
        </div>
    );
};

export default QuestionComponent;
