import React, { useState, useEffect } from "react";
import axios from "axios";

import TeacherClassOverviewHeader from "./TeacherClassOverviewHeader";
import TeacherClassOverviewRender from "./TeacherClassOverviewRender";
import TeacherClassQuizScores from "../Quiz/TeacherClassQuizScores";
import TeacherClassOverviewDetailsEdit from "./TeacherClassOverviewDetailsEdit";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClassOverview = ({ selectedClass, setShowOverview }) => {
    const [render, setRender] = useState("Overview");
    const [showQuizScore, setShowQuizScore] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState();
    const [showEditDetails, setShowEditDetails] = useState(false);
    const [classDetails, setClassDetails] = useState(null);
    const [studentList, setStudentList] = useState([]);
    const [totalStudents, setTotalStudents] = useState(0); // State to track the total number of students
    const [classLimit, setClassLimit] = useState(0); // State to track the class limit

    useEffect(() => {
        const fetchClassDetails = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/classes/${selectedClass.id}/`);
                setClassDetails(response.data);
                setClassLimit(response.data.class_limit); // Set class limit
            } catch (error) {
                console.error("Failed to fetch class details:", error);
            }
        };

        const fetchStudentList = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/user-class/students/${selectedClass.id}/`);
                setStudentList(response.data);
            } catch (error) {
                console.error("Failed to fetch student list:", error);
            }
        };

        const fetchTotalStudents = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/user-class/total_students/${selectedClass.id}/`);
                setTotalStudents(response.data.total_students);
            } catch (error) {
                console.error("Failed to fetch total students:", error);
            }
        };

        fetchClassDetails();
        fetchStudentList();
        fetchTotalStudents();
    }, [selectedClass]);

    const viewScore = (quiz) => {
        setShowQuizScore(true);
        setSelectedQuiz(quiz);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-start">
            {!showQuizScore && classDetails && (
                <>
                    <TeacherClassOverviewHeader setRender={setRender} render={render} setShowOverview={setShowOverview} />
                    <TeacherClassOverviewRender
                        render={render}
                        viewScore={viewScore}
                        setShowEditDetails={setShowEditDetails}
                        classDetails={classDetails}
                        studentList={studentList} // Pass student list to the render component
                        totalStudents={totalStudents} // Pass total students to the render component
                        setStudentList={setStudentList} // Pass setStudentList to the render component
                        setTotalStudents={setTotalStudents} // Pass setTotalStudents to the render component
                        classLimit={classLimit} // Pass class limit to the render component
                    />
                </>
            )}
            {showQuizScore && <TeacherClassQuizScores setShowQuizScore={setShowQuizScore} selectedQuiz={selectedQuiz} />}
            {showEditDetails && (
                <TeacherClassOverviewDetailsEdit
                    setShowEditDetails={setShowEditDetails}
                    classDetails={classDetails}
                    setClassDetails={setClassDetails}
                    totalStudents={totalStudents} // Pass total students to the edit component
                />
            )}
        </div>
    );
};

export default TeacherClassOverview;
