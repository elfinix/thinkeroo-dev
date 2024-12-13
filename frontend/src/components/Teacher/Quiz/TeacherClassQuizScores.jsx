import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherClassQuizScoresHeader from "./TeacherClassQuizScoresHeader";
import TeacherQuizStudentScoresList from "./TeacherQuizStudentScoresList";
import TeacherQuizGradeReport from "./TeacherQuizGradeReport";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClassQuizScores = ({ selectedQuiz, classId, setShowQuizScore }) => {
    const [showReport, setShowReport] = useState(false);
    const [studentScores, setStudentScores] = useState([]);

    useEffect(() => {
        const fetchStudentScores = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/student-scores/quiz/${selectedQuiz.id}`);
                setStudentScores(response.data);
            } catch (error) {
                console.error("Failed to fetch student scores:", error);
            }
        };

        fetchStudentScores();
    }, [selectedQuiz.id]);

    return (
        <>
            <div className="w-full h-full flex flex-col items-center pb-4">
                <TeacherClassQuizScoresHeader setShowReport={setShowReport} setShowQuizScore={setShowQuizScore} />
                <div className="flex w-11/12 h-full mt-[20px] gap-4 overflow-hidden">
                    <div className="w-[277px] h-[323px] border-2 border-solid border-primary-3 rounded-[10px] p-4 flex flex-col gap-3 overflow-hidden">
                        <h4 className="font-medium text-xl text-text-1">Class Details</h4>
                        <div>
                            <p className="text-text-2">Quiz Name</p>
                            <h4 className="text-text-1 text-xl">{selectedQuiz.title}</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Timer</p>
                            <h4 className="text-text-1 text-xl">{selectedQuiz.duration} mins</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Items</p>
                            <h4 className="text-text-1 text-xl">{selectedQuiz.question_count}</h4>
                        </div>
                        <div>
                            <p className="text-text-2">Quiz Schedule</p>
                            <h4 className="text-text-1 text-xl">
                                {new Date(selectedQuiz.schedule).toLocaleTimeString("en-US", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    timeZone: "UTC",
                                })}{" "}
                                | {new Date(selectedQuiz.schedule).toLocaleDateString("en-US", { timeZone: "UTC" })}
                            </h4>
                        </div>
                    </div>
                    <div className="w-full h-[88%] border-2 border-solid border-primary-3 rounded-[10px]">
                        <TeacherQuizStudentScoresList studentScores={studentScores} classId={classId} />
                    </div>
                </div>
            </div>
            {showReport && <TeacherQuizGradeReport setShowReport={setShowReport} studentScores={studentScores} />}
        </>
    );
};

export default TeacherClassQuizScores;
