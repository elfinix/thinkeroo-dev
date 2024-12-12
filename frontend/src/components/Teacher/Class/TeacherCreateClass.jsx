import React, { useState } from "react";
import axios from "axios";

const TeacherCreateClass = ({ setShowCreateClass, setShowOverview, setSelectedClass }) => {
    const [className, setClassName] = useState("");
    const [classLimit, setClassLimit] = useState(1);
    const [classCode, setClassCode] = useState("");
    const [bannerImg, setBannerImg] = useState(null);

    const handleCreateClass = async () => {
        const classCode = Math.random().toString(36).substring(2, 8);
        setClassCode(classCode);

        const formData = new FormData();
        formData.append("name", className);
        formData.append("class_limit", classLimit);
        formData.append("class_code", classCode);
        if (bannerImg) {
            formData.append("banner_img", bannerImg);
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/classes/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setSelectedClass(response.data);
            setShowCreateClass(false);
            setShowOverview(true);
        } catch (error) {
            console.error("Failed to create class:", error);
        }
    };

    return (
        <div className="absolute top-0 left-0 w-screen h-screen bg-[#00000080] flex items-center justify-center">
            <div className="p-6 bg-primary-1 border-2 border-primary-3 border-solid w-[745px] rounded-[10px]">
                <h1 className="text-[38px] font-semibold text-text-1 mb-6">Create Class</h1>
                <h2 className="text-[20px] font-semibold text-text-1 mb-4">Class Detail</h2>
                <label>
                    <p className="text-text-2 mb-[10px]">Class Name</p>
                    <input
                        placeholder="What's the name of the class"
                        className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                        type="text"
                        value={className}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </label>
                <label>
                    <p className="text-text-2">Class Image</p>
                    <input
                        className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setBannerImg(e.target.files[0])}
                    />
                </label>
                <label>
                    <p className="text-text-2 mb-[10px]">Student Limit</p>
                    <input
                        placeholder="Number of students allowed"
                        className="mb-4 w-full text-xl text-text-1 bg-transparent border-2 border-solid border-primary-3 h-[57px] rounded-[10px] p-2 placeholder:text-text-2"
                        type="number"
                        min={1}
                        value={classLimit}
                        onChange={(e) => setClassLimit(e.target.value)}
                    />
                </label>
                <div className="flex gap-4 mt-[20px] w-full">
                    <button
                        onClick={() => setShowCreateClass(false)}
                        className="ml-auto w-[119px] h-[42px] border-solid border-2 border-text-1 rounded-[50px] text-text-1 font-medium text-base flex items-center justify-center"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateClass}
                        className="w-[119px] h-[42px] bg-accent-1 border-none rounded-[50px] text-primary-1 font-medium text-base flex items-center justify-center"
                    >
                        Create Class
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherCreateClass;
