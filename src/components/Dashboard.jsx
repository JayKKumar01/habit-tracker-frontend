import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = ({ user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        navigate("/login");
    };

    return (
        <div className="dashboard-container">
            <h2>Welcome to your Dashboard 🎯</h2>

            <div className="user-card">
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            </div>

            <button className="logout-btn" onClick={handleLogout}>
                🔒 Logout
            </button>
        </div>
    );
};

export default Dashboard;
