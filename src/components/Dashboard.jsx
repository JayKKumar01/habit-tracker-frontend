import React, { useState } from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import CurrentWeekIndicator from "./dashboardhelper/CurrentWeekIndicator";
import TodaysTaskList from "./dashboard/TodaysTaskList";
import AddHabitButton from "./dashboard/AddHabitButton";

const Dashboard = ({ user }) => {
    const [refreshKey, setRefreshKey] = useState(0);

    const triggerRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="dashboard-wrapper">
            {/* 🔰 App Title Row */}
            <div className="dashboard-title-row">
                <h1 className="app-title">Habit Tracker</h1>
                <LogoutButton />
            </div>

            {/* 👤 Welcome and Controls Row */}
            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator user={user} />
                <AddHabitButton email={user.email} onHabitCreated={triggerRefresh} />
            </div>

            {/* 🗓️ Main Content Row */}
            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodaysTaskList user={user} refreshKey={refreshKey} triggerRefresh={triggerRefresh} />
            </div>
        </div>
    );
};

export default Dashboard;
