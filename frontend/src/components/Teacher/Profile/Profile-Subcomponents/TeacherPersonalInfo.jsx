import React, { useState, useEffect } from "react";
import TeacherModal from "../../Modals/TeacherModal";

function TeacherPersonalInfo({ teacher }) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        role: "Teacher",
        pronouns: "",
        institution: "",
        email: "",
    });

    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (teacher) {
            setFormData({
                firstName: teacher.personalDetail.firstName,
                lastName: teacher.personalDetail.lastName,
                username: teacher.personalDetail.username,
                role: teacher.personalDetail.role || "Teacher",
                pronouns: teacher.personalDetail.pronouns || "",
                institution: teacher.institutionDetail.institution || "",
                email: teacher.institutionDetail.email,
            });
        }
    }, [teacher]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        const requiredFields = ["firstName", "lastName", "username", "email"];
        const missingFields = requiredFields.filter((field) => !formData[field]);

        if (missingFields.length > 0) {
            newErrors.general = "Some required fields are empty";
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

    const handleConfirmSave = () => {
        // Logic for saving changes goes here
        console.log("Form data saved:", formData);
        setIsModalOpen(false);
    };

    const handleCancelSave = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="rounded-lg max-w-3xl mx-auto font-lexend">
            <h2 className="text-lg font-semibold text-text-1 mb-6">Personal Information</h2>
            <form onSubmit={handleSaveChanges}>
                <div className="space-y-4">
                    {/* First Name */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                    {/* Last Name */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                    {/* Username */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                    {/* Pronouns */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">Pronouns</label>
                        <input
                            type="text"
                            name="pronouns"
                            value={formData.pronouns}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                    {/* Institution */}
                    <div>
                        <label className="block text-text-2 mb-2 text-sm">Institution</label>
                        <input
                            type="text"
                            name="institution"
                            value={formData.institution}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-lg text-text-1 text-sm bg-primary-1 border border-primary-3 focus:outline-none focus:ring-2 focus:ring-primary-3"
                        />
                    </div>
                </div>
                {errors.general && <p className="text-red-500 text-sm mt-2">{errors.general}</p>}
                <div className="flex justify-end mt-6">
                    <button type="submit" className="bg-accent-1 text-primary-1 px-4 py-2 rounded-full hover:bg-accent-2">
                        Save Changes
                    </button>
                </div>
            </form>
            {isModalOpen && (
                <TeacherModal
                    isOpen={isModalOpen}
                    onClose={handleCancelSave}
                    onSave={handleConfirmSave}
                    modalTitle="Save Changes?"
                    modalDesc="Anything that you modify will be saved. Are you sure you want to save?"
                    bttnName="Save"
                />
            )}
        </div>
    );
}

export default TeacherPersonalInfo;
