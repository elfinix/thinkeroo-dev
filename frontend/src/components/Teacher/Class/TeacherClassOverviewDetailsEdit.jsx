import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_ENDPOINT } from "/constants/constants";

const TeacherClassOverviewDetailsEdit = ({ setShowEditDetails, classDetails, setClassDetails, totalStudents }) => {
    const [className, setClassName] = useState(classDetails ? classDetails.name : "");
    const [classImage, setClassImage] = useState(null);
    const [studentLimit, setStudentLimit] = useState(classDetails ? classDetails.class_limit : 0);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (classDetails) {
            setClassName(classDetails.name);
            setStudentLimit(classDetails.class_limit);
        }
    }, [classDetails]);

    const handleFileChange = (e) => {
        setClassImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation check for student limit
        if (studentLimit < totalStudents) {
            setError(`Student limit cannot be less than the current number of students (${totalStudents}).`);
            return;
        }

        // Validation check for class name
        if (!className || !className.trim()) {
            setError("Please provide a class name.");
            return;
        }

        const formData = new FormData();
        formData.append("name", className);
        if (classImage) {
            formData.append("banner_img", classImage);
        }
        formData.append("class_limit", studentLimit);

        try {
            const response = await axios.put(`${API_ENDPOINT}/api/classes/${classDetails.id}/update/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setClassDetails(response.data);
            setShowEditDetails(false);
        } catch (error) {
            console.error("Failed to update class details:", error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center">
            <div className="p-6 bg-primary-1 border-2 border-primary-3 border-solid w-[745px] rounded-[10px]">
                <h1 className="text-[38px] font-semibold text-text-1 mb-6">Edit Class</h1>
                <h2 className="text-[20px] font-semibold text-text-1 mb-4">Class Detail</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p className="text-text-2 mb-[10px]">Class Name</p>
                        <input
                            value={className}
                            onChange={(e) => setClassName(e.target.value)}
                            placeholder="What's the name of the class"
                            className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                            type="text"
                        />
                    </label>
                    <label>
                        <p className="text-text-2">Class Image</p>
                        <input
                            onChange={handleFileChange}
                            className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                            type="file"
                            accept="image/*"
                        />
                    </label>
                    <label>
                        <p className="text-text-2 mb-[10px]">Student Limit</p>
                        <input
                            value={studentLimit}
                            onChange={(e) => setStudentLimit(e.target.value)}
                            placeholder="Number of students allowed"
                            className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                            type="number"
                            min={1}
                        />
                    </label>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <div className="flex gap-4 mt-[20px] w-full">
                        <button
                            type="button"
                            onClick={() => setShowEditDetails(false)}
                            className="ml-auto w-[119px] h-[42px] border-solid border-2 border-text-1 rounded-[50px] text-text-1 font-medium text-base flex items-center justify-center"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="w-[119px] h-[42px] bg-accent-1 border-none rounded-[50px] text-primary-1 font-medium text-base flex items-center justify-center"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeacherClassOverviewDetailsEdit;
