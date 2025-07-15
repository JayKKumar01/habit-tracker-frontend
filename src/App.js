import React from "react";
import { Routes, Route } from "react-router-dom";
import SignupForm from "./components/SignupForm";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AuthLink from "./components/AuthLink";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <div className="container">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <h1>Habit Tracker - Signup</h1>
                            <SignupForm />
                            <AuthLink type="login" />
                        </>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <>
                            <h1>Habit Tracker - Login</h1>
                            <LoginForm />
                            <AuthLink type="signup" />
                        </>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            {(user) => (
                                <>
                                    <h1>Dashboard</h1>
                                    <Dashboard user={user} />
                                </>
                            )}
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
