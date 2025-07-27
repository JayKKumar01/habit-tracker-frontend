// components/dashboardhelper/UserInfoCard.jsx
import React from "react";
import "../../styles/UserInfoCard.css";

const UserInfoCard = ({ user }) => {
    return (
        <div className="user-info-card">
            <div className="user-info-inner">
                <h2>👤 User Profile</h2>
                <div className="user-info-content">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
