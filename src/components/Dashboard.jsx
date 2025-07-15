import React from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import TodayTaskList from "./dashboard/TodaysTaskList";
import CurrentWeekIndicator from "./dashboardhelper/CurrentWeekIndicator";
import AddHabitButton from "./dashboard/AddHabitButton";

const Dashboard = ({ user }) => {
    return (
        <div className="dashboard-wrapper">
            {/* 🔰 App Title Row */}
            <div className="dashboard-title-row">
                <h1 className="app-title">Habit Tracker</h1>
                <LogoutButton />
            </div>

            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator user={user} />
                <AddHabitButton/>
            </div>

            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList habits={null} />
            </div>
        </div>
    );
};

export default Dashboard;
