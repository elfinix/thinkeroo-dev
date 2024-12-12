import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        const userRole = localStorage.getItem("role") || sessionStorage.getItem("role");

        console.log("Retrieved token:", token);
        console.log("Retrieved role:", userRole);

        if (token && userRole) {
            setIsAuthenticated(true);
            setRole(userRole.toLowerCase());
        } else {
            setIsAuthenticated(false);
            setRole(null);
        }
        setLoading(false); // Set loading to false after checking authentication
    }, [navigate]);

    return { isAuthenticated, role, loading };
};

export default useAuth;
