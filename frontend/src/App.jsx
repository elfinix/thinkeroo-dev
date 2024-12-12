import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Auth from "./pages/Auth";
import SignUpPage from "./pages/SignUpPage";
import Student from "./pages/Student";
import Teacher from "./pages/Teacher";
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRedirect from "./components/RoleBasedRedirect";
import PublicRoute from "./components/PublicRoute";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RoleBasedRedirect />} />
                <Route
                    path="/auth"
                    element={
                        <PublicRoute>
                            <Auth />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/main"
                    element={
                        <PublicRoute>
                            <LandingPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/student"
                    element={
                        <ProtectedRoute role="student">
                            <Student />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/teacher/*"
                    element={
                        <ProtectedRoute role="teacher">
                            <Teacher />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signup" element={<SignUpPage />} />
            </Routes>
        </Router>
    );
};

export default App;
