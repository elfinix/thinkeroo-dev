import React, { useEffect, useState } from "react";
import axios from "axios";
import TeacherClassCard from "./TeacherClassCard";

const TeacherClassList = ({ setSelectedClass, setShowOverview }) => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8000/api/classes/");
                setClasses(response.data);
            } catch (error) {
                console.error("Failed to fetch classes:", error);
            }
        };

        fetchClasses();
    }, []);

    return (
        <div className="w-11/12 mt-[20px] h-4/5 overflow-y-auto flex gap-[50px] flex-wrap">
            {classes.map((classItem) => (
                <TeacherClassCard
                    key={classItem.id}
                    classItem={classItem}
                    setSelectedClass={setSelectedClass}
                    setShowOverview={setShowOverview}
                />
            ))}
        </div>
    );
};

export default TeacherClassList;
