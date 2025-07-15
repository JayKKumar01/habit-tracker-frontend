// components/Dashboard.jsx
import React from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import TodayTaskList from "./dashboardhelper/TodaysTaskList";
import HabitOverviewGrid from "./dashboardhelper/HabitOverviewGrid";

// Dummy habits
const dummyHabits = [
    {
        id: 1,
        title: "Drink Water",
        completedToday: true,
        frequency: "Daily",
        currentStreak: 4,
        completionRate: 90
    },
    {
        id: 2,
        title: "Meditate",
        completedToday: false,
        frequency: "Daily",
        currentStreak: 2,
        completionRate: 70
    },
    {
        id: 3,
        title: "Read Book",
        completedToday: false,
        frequency: "Daily",
        currentStreak: 1,
        completionRate: 30
    },
];

const Dashboard = ({ user }) => {
    return (
        <div className="dashboard-wrapper">
            <LogoutButton />

            <div className="dashboard-header">
                <h1>🎯 Welcome, {user.name}</h1>
            </div>

            {/* Row: Profile and Today’s Tasks */}
            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList habits={dummyHabits} />
            </div>

            {/* Row: Horizontal Scrollable Habit Cards */}
            <HabitOverviewGrid habits={dummyHabits} />
        </div>
    );
};

export default Dashboard;
