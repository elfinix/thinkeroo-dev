import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, role }) => {
    const { isAuthenticated, role: userRole, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while checking authentication
    }

    console.log("ProtectedRoute - isAuthenticated:", isAuthenticated);
    console.log("ProtectedRoute - userRole:", userRole);
    console.log("ProtectedRoute - requiredRole:", role);

    if (!isAuthenticated) {
        console.warn("ProtectedRoute: User is not authenticated. Redirecting to /auth.");
        return <Navigate to="/auth" replace />;
    }

    if (role && userRole !== role) {
        console.warn(`ProtectedRoute: User role mismatch. Expected: ${role}, Got: ${userRole}`);
        const redirectPath = userRole === "teacher" ? "/teacher" : "/student"; // Redirect to the appropriate route based on the user role

        return <Navigate to={redirectPath} replace />;
    }

    return children;
};

export default ProtectedRoute;
