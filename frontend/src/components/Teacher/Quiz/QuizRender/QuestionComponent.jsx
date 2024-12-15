import React, { useState, useEffect } from "react";
import ChooseFromDatabank from "./ChooseFromDataRepo";

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
    const [content, setContent] = useState(question.content || "");
    const [choices, setChoices] = useState([]);
    const [correctAnswer, setCorrectAnswer] = useState(null);
    const [showBank, setShowBank] = useState(false);

    const [correctAnswerIndex, setCorrectAnswerIndex] = useState(() => {
        const correctOptionIndex = question.options.findIndex((option) => option.is_correct);
        return correctOptionIndex !== -1 ? correctOptionIndex : null;
    });

    useEffect(() => {
        if (question.options) {
            setChoices(question.options.map((option) => option.content));
            const correctOptionIndex = question.options.findIndex((option) => option.is_correct);
            setCorrectAnswerIndex(correctOptionIndex !== -1 ? correctOptionIndex : null);
            setCorrectAnswer(correctOptionIndex !== -1 ? question.options[correctOptionIndex].content : "");
        }
        if (questionType === "Identification") {
            setCorrectAnswer(question.answer || ""); // Set the answer field for IDN
        }
    }, [question]);

    useEffect(() => {
        handleUpdateQuestion(index, {
            content,
            type: questionType === "Multiple Choice" ? "MC" : questionType === "Identification" ? "IDN" : "TF",
            answer: questionType === "Identification" ? correctAnswer : choices[correctAnswerIndex],
        });
    }, [content, questionType, correctAnswer, correctAnswerIndex]);

    const handleAddChoice = () => {
        setChoices([...choices, ""]);
    };

    const handleRemoveChoice = (choiceIndex) => {
        setChoices(choices.filter((_, i) => i !== choiceIndex));
        if (correctAnswerIndex === choiceIndex) {
            setCorrectAnswerIndex(null);
            setCorrectAnswer(null); // Reset correct answer when a choice is removed
        }
    };

    const handleChoiceChange = (choiceIndex, value) => {
        const updatedChoices = [...choices];
        updatedChoices[choiceIndex] = value;
        setChoices(updatedChoices);

        // If the edited choice was the correct answer, update correctAnswer
        if (correctAnswerIndex === choiceIndex) {
            setCorrectAnswer(value);
        }

        // Update the parent component with the latest state
        handleUpdateQuestion(index, {
            content,
            type: "MC",
            answer: correctAnswerIndex !== null ? updatedChoices[correctAnswerIndex] : "",
            options: updatedChoices.map((choice) => ({ content: choice, is_correct: false })), // Update options without altering is_correct here
        });
    };

    const renderQuestionForm = () => {
        switch (questionType) {
            case "True or False":
                let tempCorrectAnswer = correctAnswer; // Use let for temporary correctAnswer
                return (
                    <div>
                        <p className="text-text-2 mb-2">Question</p>
                        <input
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <div className="flex flex-col gap-4 mt-2">
                            {["True", "False"].map((option, idx) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                        tempCorrectAnswer = option;
                                        setCorrectAnswer(option);
                                        setCorrectAnswerIndex(idx);
                                        handleUpdateQuestion(index, {
                                            content,
                                            type: "TF",
                                            answer: tempCorrectAnswer,
                                            options: [
                                                { content: "True", is_correct: tempCorrectAnswer === "True" },
                                                { content: "False", is_correct: tempCorrectAnswer === "False" },
                                            ],
                                        });
                                    }}
                                    className={`border-2 rounded-[10px] border-primary-3 p-2 ${
                                        correctAnswerIndex === idx ? "text-text-1 border-2 border-secondary-1" : ""
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
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <p className="mt-2">Answer</p>
                        <input
                            type="text"
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
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
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <div className="mt-2">
                            {choices.map((choice, idx) => (
                                <div key={idx} className="flex items-center gap-2 mb-2">
                                    <input
                                        type="radio"
                                        name={`correct-answer-${index}`}
                                        checked={correctAnswerIndex === idx}
                                        onChange={() => {
                                            setCorrectAnswerIndex(idx);
                                            setCorrectAnswer(choice);
                                            handleUpdateQuestion(index, {
                                                content,
                                                type: "MC",
                                                answer: choice,
                                                options: choices.map((opt, i) => ({
                                                    content: opt,
                                                    is_correct: i === idx,
                                                })),
                                            });
                                        }}
                                        className="cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Choice ${idx + 1}`}
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(idx, e.target.value)}
                                        className={`border-2 ${
                                            correctAnswerIndex === idx ? "border-secondary-1" : "border-primary-3"
                                        } text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px]`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveChoice(idx)}
                                        className="bg-transparent border-none mr-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={handleAddChoice}
                                className="w-full p-2 bg-transparent text-white border-dashed border-2 border-primary-3 rounded-[10px] flex items-center justify-center"
                            >
                                Add Choice
                            </button>
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
                    onChange={(e) => setQuestionType(e.target.value)}
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
            {showBank && <ChooseFromDatabank setShowBank={setShowBank} />}
        </div>
    );
};

export default QuestionComponent;
