import React, { useState, useEffect } from "react";
import axios from "axios";

import TeacherClassOverviewHeader from "./TeacherClassOverviewHeader";
import TeacherClassOverviewRender from "./TeacherClassOverviewRender";
import TeacherClassQuizScores from "../Quiz/TeacherClassQuizScores";
import TeacherClassOverviewDetailsEdit from "./TeacherClassOverviewDetailsEdit";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClassOverview = ({ selectedClass }) => {
    const [render, setRender] = useState("Overview");
    const [showQuizScore, setShowQuizScore] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState();
    const [showEditDetails, setShowEditDetails] = useState(false);
    const [classDetails, setClassDetails] = useState(null);
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/classes/${selectedClass.id}/`);
                setClassDetails(response.data);
            } catch (error) {
                console.error("Failed to fetch class details:", error);
            }
        };

        const fetchStudentList = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/user-class/students/${selectedClass.id}/`);
                setStudentList(response.data);
                console.log("Fetched student list:", response.data);
            } catch (error) {
                console.error("Failed to fetch student list:", error);
            }
        };

        fetchClassDetails();
        fetchStudentList();
    }, [selectedClass]);

    const viewScore = (quiz) => {
        setShowQuizScore(true);
        setSelectedQuiz(quiz);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {!showQuizScore && classDetails && (
                <>
                    <TeacherClassOverviewHeader setRender={setRender} render={render} />
                    <TeacherClassOverviewRender
                        render={render}
                        viewScore={viewScore}
                        setShowEditDetails={setShowEditDetails}
                        classDetails={classDetails}
                        studentList={studentList} // Pass student list to the render component
                    />
                </>
            )}
            {showQuizScore && <TeacherClassQuizScores setShowQuizScore={setShowQuizScore} selectedQuiz={selectedQuiz} />}
            {showEditDetails && <TeacherClassOverviewDetailsEdit setShowEditDetails={setShowEditDetails} />}
        </div>
    );
};

export default TeacherClassOverview;
