import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AuthLink from "./components/AuthLink";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
    return (
        <Routes>
            {/* Signup Page */}
            <Route
                path="/"
                element={
                    <div className="container">
                        <h1>Habit Tracker - Login</h1>
                        <LoginForm />
                        <AuthLink type="signup" />
                    </div>
                }
            />

            {/* Login Page */}
            <Route
                path="/signup"
                element={
                    <div className="container">
                        <h1>Habit Tracker - Signup</h1>
                        <SignupForm />
                        <AuthLink type="login" />
                    </div>
                }
            />

            {/* Dashboard Page — no container wrapper */}
            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute>
                        {(user) => <Dashboard user={user} />}
                    </ProtectedRoute>
                }
            />
        </Routes>
    );
}

export default App;
