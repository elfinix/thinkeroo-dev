import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherClassQuizCard from "./TeacherClassQuizCard";

import { API_ENDPOINT } from "/constants/constants";
import { setClassSelector } from "/src/global/globals";

const TeacherClassQuiz = ({ viewScore, classId }) => {
    const [quizzes, setQuizzes] = useState([]);
    setClassSelector(classId);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/quizzes/class/${classId}/`);
                setQuizzes(response.data);
            } catch (error) {
                console.error("Failed to fetch quizzes:", error);
            }
        };

        fetchQuizzes();
    }, [classId]);

    return (
        <div className="w-full h-5/6 flex flex-wrap gap-12 overflow-y-auto">
            {quizzes.map((quiz) => (
                <TeacherClassQuizCard key={quiz.id} quiz={quiz} viewScore={viewScore} classId={classId} />
            ))}
        </div>
    );
};

export default TeacherClassQuiz;
