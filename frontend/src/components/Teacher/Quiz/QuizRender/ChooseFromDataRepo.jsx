import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "/constants/constants";

const ChooseFromDatabank = ({ setShowBank, handleSelectQuestion }) => {
    const [bankOption, setBankOption] = useState("Choose");
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token") || sessionStorage.getItem("token");

    useEffect(() => {
        fetchAllQuestions();
    }, []);

    const fetchAllQuestions = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get(`${API_ENDPOINT}/api/questions/`, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            console.log("Fetched all questions:", response.data);
            setQuestions(response.data);
        } catch (err) {
            console.error("Failed to fetch questions:", err);
            setError("Failed to load questions. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleQuestionClick = (q) => {
        handleSelectQuestion({
            id: q.id,
            type: q.type,
            content: q.content,
            choice1: q.choice1,
            choice2: q.choice2,
            choice3: q.choice3,
            choice4: q.choice4,
            answer: q.answer,
        });
        setShowBank(false); // Close the databank after selection
    };

    const handleTypeSelection = (type) => {
        setBankOption(type);
        if (type === "Choose") {
            setFilteredQuestions([]);
        } else {
            // Filter questions based on type using if-else
            if (type === "Multiple Choice") {
                setFilteredQuestions(questions.filter((q) => q.type === "MC"));
            } else if (type === "True or False") {
                setFilteredQuestions(questions.filter((q) => q.type === "TF"));
            } else if (type === "Identification") {
                setFilteredQuestions(questions.filter((q) => q.type === "IDN"));
            }
        }
    };

    const renderMultipleChoiceQuestions = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="text-red-500">{error}</p>;
        if (filteredQuestions.length === 0)
            return (
                <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-fit flex items-center mb-6">
                        <button
                            onClick={() => setBankOption("Choose")}
                            type="button"
                            className="cursor-pointer flex items-center gap-[10px] text-text-1 font-bold text-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path
                                    fill="#F5F5F5"
                                    d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                                />
                            </svg>
                            Return
                        </button>
                    </div>
                    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                        <p>No Multiple Choice questions available.</p>
                    </div>
                </div>
            );

        return (
            <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                <div className="w-full h-fit flex items-center mb-6">
                    <button
                        onClick={() => setBankOption("Choose")}
                        type="button"
                        className="cursor-pointer flex items-center gap-[10px] text-text-1 font-bold text-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path
                                fill="#F5F5F5"
                                d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                            />
                        </svg>
                        Multiple Choice
                    </button>
                </div>
                <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                    {filteredQuestions.map((q) => (
                        <div
                            key={q.id}
                            className="w-full p-4 border-2 border-primary-3 rounded-[10px] cursor-pointer hover:bg-primary-2"
                            onClick={() => handleQuestionClick(q)}
                        >
                            <p className="font-bold text-xl mb-4">{q.content}</p>
                            <div className="flex flex-col w-full gap-2">
                                {[q.choice1, q.choice2, q.choice3, q.choice4].map((choice, idx) => (
                                    <div
                                        key={idx}
                                        className={`w-full text-center border-2 ${
                                            q.answer === choice
                                                ? "border-secondary-1 text-secondary-1"
                                                : "border-primary-3 text-primary-3"
                                        } rounded-[10px] p-2`}
                                    >
                                        {choice}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTrueOrFalseQuestions = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="text-red-500">{error}</p>;
        if (filteredQuestions.length === 0)
            return (
                <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-fit flex items-center mb-6">
                        <button
                            onClick={() => setBankOption("Choose")}
                            type="button"
                            className="cursor-pointer flex items-center gap-[10px] text-text-1 font-bold text-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path
                                    fill="#F5F5F5"
                                    d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                                />
                            </svg>
                            Return
                        </button>
                    </div>
                    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                        <p>No True or False questions available.</p>
                    </div>
                </div>
            );

        return (
            <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                <div className="w-full h-fit flex items-center mb-6">
                    <button
                        onClick={() => setBankOption("Choose")}
                        type="button"
                        className="cursor-pointer flex items-center gap-[10px] text-text-1 font-bold text-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path
                                fill="#F5F5F5"
                                d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                            />
                        </svg>
                        True or False
                    </button>
                </div>
                <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                    {filteredQuestions.map((q) => (
                        <div
                            key={q.id}
                            className="w-full p-4 border-2 border-primary-3 rounded-[10px] cursor-pointer hover:bg-primary-2 hover:border-secondary"
                            onClick={() => handleQuestionClick(q)}
                        >
                            <p className="font-bold text-xl mb-4">{q.content}</p>
                            <div className="flex flex-col w-full gap-2">
                                <div
                                    className={`w-full text-center border-2 ${
                                        q.answer === "True"
                                            ? "border-secondary-1 text-secondary-1"
                                            : "border-primary-3 text-primary-3"
                                    } rounded-[10px] p-2`}
                                >
                                    True
                                </div>
                                <div
                                    className={`w-full text-center border-2 ${
                                        q.answer === "False"
                                            ? "border-secondary-1 text-secondary-1"
                                            : "border-primary-3 text-primary-3"
                                    } rounded-[10px] p-2`}
                                >
                                    False
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderIdentificationQuestions = () => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p className="text-red-500">{error}</p>;
        if (filteredQuestions.length === 0)
            return (
                <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                    <div className="w-full h-fit flex items-center mb-6">
                        <button
                            onClick={() => setBankOption("Choose")}
                            type="button"
                            className="cursor-pointer flex items-center gap-[10px] text-text-1 font-bold text-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                                <path
                                    fill="#F5F5F5"
                                    d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                                />
                            </svg>
                            Return
                        </button>
                    </div>
                    <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                        <p>No Identification questions available.</p>
                    </div>
                </div>
            );

        return (
            <div className="w-full h-full flex flex-col justify-between overflow-hidden">
                <div className="w-full h-fit flex items-center mb-6">
                    <button
                        onClick={() => setBankOption("Choose")}
                        type="button"
                        className="flex items-center gap-[10px] text-text-1 font-bold text-xl"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
                            <path
                                fill="#F5F5F5"
                                d="M3.828 7H16v2H3.828l5.364 5.364-1.414 1.414L0 8 7.778.222l1.414 1.414L3.828 7Z"
                            />
                        </svg>
                        Identification
                    </button>
                </div>
                <div className="w-full h-full flex flex-col gap-6 overflow-y-auto">
                    {filteredQuestions.map((q) => (
                        <div
                            key={q.id}
                            className="w-full p-4 border-2 border-primary-3 rounded-[10px] cursor-pointer hover:bg-primary-2"
                            onClick={() => handleQuestionClick(q)}
                        >
                            <p className="font-bold text-xl mb-4">{q.content}</p>
                            <div className="flex flex-col w-full gap-2">
                                <div
                                    className={`w-full text-center border-2 ${
                                        q.answer ? "border-secondary-1 text-secondary-1" : "border-primary-3 text-primary-3"
                                    } rounded-[10px] p-2`}
                                >
                                    {q.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderContent = () => {
        switch (bankOption) {
            case "Choose":
                return (
                    <div className="w-full h-full flex flex-col justify-between">
                        <div className="flex flex-col w-full">
                            <button
                                onClick={() => handleTypeSelection("Multiple Choice")}
                                className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="25"
                                    height="25"
                                    fill="none"
                                    viewBox="0 0 25 25"
                                >
                                    <path
                                        fill="#F5F5F5"
                                        d="M6.184 11.868A5.684 5.684 0 1 1 6.184.5a5.684 5.684 0 0 1 0 11.368Zm0 12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368Zm12.632-12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368Zm0 12.632a5.684 5.684 0 1 1 0-11.368 5.684 5.684 0 0 1 0 11.368ZM6.184 9.342a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Zm0 12.632a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316ZM18.816 9.342a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Zm0 12.632a3.158 3.158 0 1 0 0-6.316 3.158 3.158 0 0 0 0 6.316Z"
                                    />
                                </svg>
                                <p className="text-text-1">Multiple Choice</p>
                            </button>
                            <button
                                onClick={() => handleTypeSelection("Identification")}
                                className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#F5F5F5"
                                        d="M2 3v2h2v14H2v2h6v-2H6V5h2V3H2Zm8.2 15h2.154l1.2-3h4.892l1.2 3H21.8L17 6h-2l-4.8 12ZM16 8.885 17.646 13h-3.292L16 8.885Z"
                                    />
                                </svg>
                                <p className="text-text-1">Identification</p>
                            </button>
                            <button
                                onClick={() => handleTypeSelection("True or False")}
                                className="flex gap-2 items-center h-16 border-0 border-b-2 border-primary-3 p-4"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill="#F5F5F5"
                                        d="M12 21.997c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10Zm0-2v-16a8 8 0 0 0 0 16Z"
                                    />
                                </svg>
                                <p className="text-text-1">True or False</p>
                            </button>
                        </div>
                        <div className="flex gap-4 w-full justify-center mt-auto">
                            <button
                                onClick={() => setShowBank(false)}
                                className="w-[119px] h-[42px] rounded-full border-2 border-text-1 bg-transparent"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setShowBank(false)}
                                className="w-[119px] h-[42px] rounded-full border-0 bg-accent-1 text-primary-1"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                );
            case "Multiple Choice":
                return renderMultipleChoiceQuestions();
            case "True or False":
                return renderTrueOrFalseQuestions();
            case "Identification":
                return renderIdentificationQuestions();
            default:
                return null;
        }
    };

    return (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center z-50">
            <div className="p-6 bg-primary-1 border-2 flex flex-col border-primary-3 border-solid w-[991px] h-[686px] rounded-[10px]">
                <h1 className="font-semibold text-[38px] mb-[28px]">Choose from bank</h1>
                {renderContent()}
            </div>
        </div>
    );
};

export default ChooseFromDatabank;
