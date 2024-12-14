import React, { useState, useEffect } from "react";
import axios from "axios";
import TeacherClassHeader from "./TeacherClassHeader";
import TeacherClassList from "./TeacherClassList";
import TeacherCreateClass from "./TeacherCreateClass";
import TeacherClassOverview from "./TeacherClassOverview";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClass = () => {
    const [showCreateClass, setShowCreateClass] = useState(false);
    const [selectedClass, setSelectedClass] = useState(null);
    const [showOverview, setShowOverview] = useState(false);
    const [classList, setClassList] = useState([]);
    const [studentCounts, setStudentCounts] = useState({});

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get(`${API_ENDPOINT}/api/classes/`);
                setClassList(response.data);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
            }
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        const fetchStudentCounts = async () => {
            try {
                const counts = {};
                for (const classItem of classList) {
                    const response = await axios.get(`${API_ENDPOINT}/api/user-class/total_students/${classItem.id}/`);
                    counts[classItem.id] = response.data.total_students;
                }
                setStudentCounts(counts);
            } catch (error) {
                console.error("Failed to fetch student counts:", error);
            }
        };

        if (classList.length > 0) {
            fetchStudentCounts();
        }
    }, [classList]);

    const handleArchive = (classId) => {
        setClassList((prevList) => prevList.filter((classItem) => classItem.id !== classId));
    };

    return (
        <div className="w-full h-full flex flex-col items-center">
            {!showOverview && (
                <>
                    <TeacherClassHeader setShowCreateClass={setShowCreateClass} />
                    <TeacherClassList
                        classes={classList}
                        studentCounts={studentCounts}
                        setSelectedClass={setSelectedClass}
                        setShowOverview={setShowOverview}
                        onArchive={handleArchive}
                    />
                </>
            )}
            {showOverview && <TeacherClassOverview selectedClass={selectedClass} />}

            {showCreateClass && (
                <TeacherCreateClass
                    setShowCreateClass={setShowCreateClass}
                    setShowOverview={setShowOverview}
                    setSelectedClass={setSelectedClass}
                />
            )}
        </div>
    );
};

export default TeacherClass;
