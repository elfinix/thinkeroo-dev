import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherArchiveClassItem from "./TeacherArchiveClassItem";
import { API_ENDPOINT } from "/constants/constants";

const TeacherArchiveList = () => {
    const [archivedClasses, setArchivedClasses] = useState([]);
    const [studentCounts, setStudentCounts] = useState({});

    useEffect(() => {
        const fetchArchivedClasses = async () => {
            try {
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");
                const response = await axios.get(`${API_ENDPOINT}/api/classes/archived/`, {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setArchivedClasses(response.data);
            } catch (error) {
                console.error("Failed to fetch archived classes:", error);
            }
        };

        fetchArchivedClasses();
    }, []);

    useEffect(() => {
        const fetchStudentCounts = async () => {
            try {
                const counts = {};
                for (const classItem of archivedClasses) {
                    const response = await axios.get(`${API_ENDPOINT}/api/user-class/total_students/${classItem.id}/`);
                    counts[classItem.id] = response.data.total_students;
                }
                setStudentCounts(counts);
            } catch (error) {
                console.error("Failed to fetch student counts:", error);
            }
        };

        if (archivedClasses.length > 0) {
            fetchStudentCounts();
        }
    }, [archivedClasses]);

    const handleUnarchive = (classId) => {
        setArchivedClasses((prev) => prev.filter((classItem) => classItem.id !== classId));
    };

    const handleDelete = (classId) => {
        setArchivedClasses((prev) => prev.filter((classItem) => classItem.id !== classId));
    };

    return (
        <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex gap-[50px] flex-wrap">
            {archivedClasses.map((cls) => (
                <TeacherArchiveClassItem
                    key={cls.id}
                    classData={cls}
                    onUnarchive={handleUnarchive}
                    onDelete={handleDelete}
                    studentCount={studentCounts[cls.id] || 0}
                />
            ))}
        </div>
    );
};

export default TeacherArchiveList;
