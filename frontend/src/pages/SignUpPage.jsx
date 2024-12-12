import React, { useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/SingUpBg.png";
import { FaArrowLeft, FaEyeSlash, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import { API_ENDPOINT } from "../../constants/constants";

const SignUpPage = () => {
    const [isChecked, setIsChecked] = useState(false);
    const [error, setError] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        role: "teacher",
        institution: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isChecked) {
            setError("You must agree to the terms to proceed.");
        } else {
            setError("");
            try {
                const response = await axios.post(`${API_ENDPOINT}/api/users/register/`, formData);
                if (response.status === 201) {
                    alert("Registration successful!");
                    navigate("/auth");
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    if (error.response.data.username) {
                        alert("Username already exists. Please choose a different username.");
                    } else if (error.response.data.email) {
                        alert("Email already exists. Please use a different email.");
                    } else {
                        setError(error.response.data);
                    }
                } else {
                    setError("An error occurred. Please try again.");
                }
            }
        }
    };

    return (
        <div className="flex h-screen bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <div className="flex flex-row bg-primary-1 p-4 rounded-xl my-auto mx-auto w-[75vw] sm:w-[71vw] md:w-[75vw] h-[80vh] sm:h-[80vh] md:h-[90vh]">
                <div className="relative w-full">
                    <button className="flex items-center absolute top-[10%] sm:top-[42px] left-[5%] sm:left-[30px] z-10 justify-center gap-2 w-[35%] sm:w-[25%] md:w-[25%]] p-2 ml-[5%] sm:ml-[20px] border border-white text-white rounded-full">
                        <span>
                            <FaArrowLeft size={20} />
                        </span>
                        Go back
                    </button>
                    <img
                        src="src\assets\SignUpImg.png"
                        className="w-[85%] sm:w-[80%] md:w-[80%] object-cover my-6 ml-[5%] sm:ml-10 md:h-[95%]"
                    ></img>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col m-8 gap-y-4 md:ml-2 sm:mr-16 md:mr-10">
                    <div className="-mt-6 flex items-center justify-center w-full text-white font-lexend font-bold text-[2.5rem]">
                        Register Account
                    </div>
                    <div className="flex flex-row gap-x-4">
                        <div className="flex flex-col">
                            <label htmlFor="first_name" className="text-white text-sm mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                className="bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Juan"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="last_name" className="text-white text-sm mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                className="bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Dela Cruz"
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row gap-x-4">
                        <div className="flex flex-col">
                            <label htmlFor="username" className="text-white text-sm mb-1">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                className="bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="John"
                                value={formData.username}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col">
                            <label htmlFor="role" className="text-white text-sm mb-1">
                                Role
                            </label>
                            <select
                                id="role"
                                className="w-[12.1rem] bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="teacher">Teacher</option>
                                <option value="student">Student</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="institution" className="text-white text-sm mb-1">
                            Institution (Optional)
                        </label>
                        <input
                            type="text"
                            id="institution"
                            className="w-full bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="John"
                            value={formData.institution}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-white text-sm mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="w-full bg-gray-800 text-white border border-white rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="John"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-white text-sm mb-1">
                            Password
                        </label>
                        <div className="relative">
                            {/* Password Input */}
                            <input
                                type={isPasswordVisible ? "text" : "password"}
                                id="password"
                                className="w-full bg-gray-800 text-white border border-white rounded-lg p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                            {/* Eye Icon */}
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? <FaEye className="text-xl" /> : <FaEyeSlash className="text-xl" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="account-checkbox"
                                className="peer text-gray-500 border-purple-500 rounded focus:ring-purple-500 focus:ring-2 checked:bg-purple-500 checked:border-purple-500"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="account-checkbox" className="text-gray-500 text-sm ml-2" disabled={!isChecked}>
                                I agree to the Terms & Privacy.
                            </label>
                        </div>
                        <button
                            type="submit"
                            className={`w-full rounded-full p-2 bg-accent-1 font-bold font-lexend ${
                                isChecked ? "bg-accent-1" : "bg-gray-400 cursor-not-allowed"
                            }`}
                            disabled={!isChecked}
                        >
                            CREATE ACCOUNT
                        </button>
                        <Link to="/auth" className="underline text-gray-500 text-center w-full">
                            I already have an account
                        </Link>
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;
