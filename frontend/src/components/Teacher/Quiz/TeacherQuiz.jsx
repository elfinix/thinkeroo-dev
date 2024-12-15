import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherQuizList from "./QuizRender/TeacherQuizList";
import TeacherQuizCreateViewEdit from "./QuizRender/TeacherQuizCreateViewEdit";
import { API_ENDPOINT } from "/constants/constants";

const TeacherQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showSelected, setShowSelected] = useState(false);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const response = await axios.get(`${API_ENDPOINT}/api/quizzes/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setQuizzes(response.data);
            } catch (error) {
                console.error("Failed to fetch quizzes:", error);
            }
        };

        fetchQuizzes();
    }, []);

    const selectQuiz = (data) => {
        setSelectedQuiz(data);
        setShowSelected(true);
    };

    const unselectQuiz = () => {
        setShowSelected(false);
        setSelectedQuiz(null);
    };

    const handleDelete = (quizId) => {
        setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            {!showSelected && <TeacherQuizList selectQuiz={selectQuiz} quizzes={quizzes} onDelete={handleDelete} />}
            {showSelected && <TeacherQuizCreateViewEdit selectedQuiz={selectedQuiz} unselectQuiz={unselectQuiz} />}
        </div>
    );
};

export default TeacherQuiz;
