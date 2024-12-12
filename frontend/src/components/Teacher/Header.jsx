import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear the token from storage
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        localStorage.removeItem("role");
        sessionStorage.removeItem("role");
        // Redirect to the login page
        navigate("/auth");
    };

    return (
        <div className="header-container flex justify-end items-center p-4">
            <button className="w-[42px] h-[42px] rounded-full overflow-hidden mr-4" type="button">
                <img src="https://placehold.co/80x80" alt="profile-menu" />
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-full" type="button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
};

export default Header;
