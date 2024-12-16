import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentModal from "../../student-basic-components/student-modal-components/StudentModal";
import { API_ENDPOINT } from "/constants/constants";

function StudentPersonalInfo({ student }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        role: "Student",
        pronouns: "he/him",
        institution: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (student) {
            setFormData({
                firstName: student.first_name,
                lastName: student.last_name,
                username: student.username,
                role: student.role || "Student",
                pronouns: student.pronouns || "he/him",
                institution: student.institution,
                email: student.email,
            });
        }
    }, [student]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`); // Debugging line
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        const requiredFields = ["firstName", "lastName", "username", "role", "institution", "email"];
        const missingFields = requiredFields.filter((field) => !formData[field]);

        if (missingFields.length > 0) {
            newErrors.general = "Some required fields are empty";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email must be a valid email address";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsModalOpen(true);
        }
    };

    const handleDiscard = () => {
        if (student) {
            setFormData({
                firstName: student.first_name,
                lastName: student.last_name,
                username: student.username,
                role: student.role || "Student",
                pronouns: student.pronouns || "he/him",
                institution: student.institution,
                email: student.email,
            });
        }
        setErrors({});
    };

    const handleConfirmSave = async () => {
        try {
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            const response = await axios.put(`${API_ENDPOINT}/api/users/user/${student.id}/update/`, formData, {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            console.log("Form data saved:", response.data);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to save user data:", error);
        }
    };

    const handleCancelSave = () => {
        setIsModalOpen(false);
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h3 className="text-lg font-semibold mb-4">Personal Detail</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {/* First Name */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">First Name</label>
                        <input
                            className={`w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 
                ${
                    errors.firstName || errors.general
                        ? "focus:ring-red-500 focus:ring-0 border-red-500"
                        : "focus:ring-secondary-1"
                }`}
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Last Name */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">Last Name</label>
                        <input
                            className={`w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 
                ${
                    errors.lastName || errors.general
                        ? "focus:ring-red-500 focus:ring-0 border-red-500"
                        : "focus:ring-secondary-1"
                }`}
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Username */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">Username</label>
                        <input
                            className={`w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 
                ${
                    errors.username || errors.general
                        ? "focus:ring-red-500 focus:ring-0 border-red-500"
                        : "focus:ring-secondary-1"
                }`}
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">Role</label>
                        <input
                            className="w-full text-sm bg-primary-3 border border-primary-3 text-text-2 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-1"
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>

                    {/* Pronouns */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">
                            Pronouns <span className="text-text-2">(optional)</span>
                        </label>
                        <select
                            className="w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-secondary-1"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleInputChange}
                        >
                            <option value="he/him">He/Him</option>
                            <option value="she/her">She/Her</option>
                            <option value="they/them">They/Them</option>
                        </select>
                    </div>
                </div>

                <h3 className="text-lg font-semibold mb-4">Institution Detail</h3>
                <div className="grid grid-cols-1 gap-4 mb-6">
                    {/* Institution */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">Institution</label>
                        <input
                            className={`w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 
                ${
                    errors.institution || errors.general
                        ? "focus:ring-red-500 focus:ring-0 border-red-500"
                        : "focus:ring-secondary-1"
                }`}
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm text-text-2 mb-1">Email</label>
                        <input
                            className={`w-full text-sm bg-primary-1 border border-primary-3 text-text-1 rounded-lg p-2 focus:outline-none focus:ring-2 
                ${
                    errors.email || errors.general
                        ? "focus:ring-red-500 focus:ring-0 border-red-500"
                        : "focus:ring-secondary-1"
                }`}
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>

                {/* Render error */}
                {errors.general && !errors.email && (
                    <div className="text-red-500 mb-8 -mt-2 font-light text-sm">
                        <p>{errors.general}</p>
                    </div>
                )}

                {errors.email && (
                    <div className="text-red-500 mb-8 -mt-2 font-light text-sm">
                        <p>{errors.email}</p>
                    </div>
                )}

                <div className="flex justify-end space-x-4">
                    <button
                        className="bg-transparent border-2 font-semibold text-sm border-text-1 text-text-1 rounded-full px-4 py-2 w-[163px] hover:opacity-75"
                        onClick={handleDiscard}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-accent-1 text-primary-1 text-sm font-semibold rounded-full px-4 py-2 w-[163px] hover:bg-accent-2"
                        onClick={handleSaveChanges}
                    >
                        Save Changes
                    </button>
                </div>
            </div>

            <StudentModal isOpen={isModalOpen} onClose={handleCancelSave} onSave={handleConfirmSave} />
        </div>
    );
}

export default StudentPersonalInfo;
