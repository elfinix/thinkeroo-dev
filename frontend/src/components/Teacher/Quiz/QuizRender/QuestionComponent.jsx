import React, { useState, useEffect } from "react";
import ChooseFromDatabank from "./ChooseFromDataRepo";

const QuestionComponent = ({ index, question, handleRemoveQuestion }) => {
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

    useEffect(() => {
        if (question.options) {
            setChoices(question.options.map((option) => option.content));
            const correctOption = question.options.find((option) => option.is_correct);
            setCorrectAnswer(correctOption ? question.options.indexOf(correctOption) : null);
        }
    }, [question]);

    const handleAddChoice = () => {
        setChoices([...choices, ""]);
    };

    const handleRemoveChoice = (choiceIndex) => {
        setChoices(choices.filter((_, i) => i !== choiceIndex));
        if (correctAnswer === choiceIndex) {
            setCorrectAnswer(null);
        }
    };

    const handleChoiceChange = (choiceIndex, value) => {
        const updatedChoices = [...choices];
        updatedChoices[choiceIndex] = value;
        setChoices(updatedChoices);
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
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your question"
                            className="border-2 border-primary-3 text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px] mb-8"
                        />
                        <div className="flex flex-col gap-4 mt-2">
                            {choices.map((option, idx) => (
                                <button
                                    key={option}
                                    type="button"
                                    onClick={() => setCorrectAnswer(option)}
                                    className={`border-2 rounded-[10px] border-primary-3 p-2 ${
                                        correctAnswer === option ? "text-text-1 border-2 border-secondary-1" : ""
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
                            value={correctAnswer || ""}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            placeholder="Enter the answer"
                            className="border-2 border-secondary-2 outline-none text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px]"
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
                                        checked={correctAnswer === choice}
                                        onChange={() => setCorrectAnswer(choice)}
                                        className="cursor-pointer"
                                    />
                                    <input
                                        type="text"
                                        placeholder={`Choice ${idx + 1}`}
                                        value={choice}
                                        onChange={(e) => handleChoiceChange(idx, e.target.value)}
                                        className={`border-2 ${
                                            correctAnswer === choice ? "border-secondary-1" : "border-primary-3"
                                        } text-text-1 bg-transparent p-2 w-full placeholder:text-text-2 rounded-[10px]`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveChoice(idx)}
                                        className="bg-red border-none mr-1"
                                    >
                                        Remove
                                        {/* <svg */}
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
        <>
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
        </>
    );
};

export default QuestionComponent;
