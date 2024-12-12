import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RoleBasedRedirect = () => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if (!isAuthenticated) {
        return <Navigate to="/main" replace />; // Allow access to the landing page
    }

    const redirectPath = role === "teacher" ? "/teacher" : "/student";
    return <Navigate to={redirectPath} replace />;
};

export default RoleBasedRedirect;
