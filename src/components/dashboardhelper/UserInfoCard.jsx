// components/dashboardhelper/UserInfoCard.jsx
import React from "react";
import "./UserInfoCard.css";

const UserInfoCard = ({ user }) => {
    return (
        <div className="user-info-card">
            <h2>👤 User Profile</h2>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
    );
};

export default UserInfoCard;
