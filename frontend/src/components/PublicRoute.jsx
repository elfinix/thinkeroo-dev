import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PublicRoute = ({ children }) => {
    const { isAuthenticated, role, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    if (isAuthenticated) {
        const redirectPath = role === "teacher" ? "/teacher" : "/student";
        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default PublicRoute;
