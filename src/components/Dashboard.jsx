// components/Dashboard.jsx
import React from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import TodayTaskList from "./dashboardhelper/TodaysTaskList";
import HabitOverviewGrid from "./dashboardhelper/HabitOverviewGrid";
import CurrentWeekIndicator from "./dashboardhelper/CurrentWeekIndicator";

// Generate 10 random dummy habits
const generateDummyHabits = () => {
    const titles = [
        "Drink Water", "Meditate", "Read Book", "Exercise",
        "Sleep Early", "No Sugar", "Stretch", "Plan Day",
        "Practice Gratitude", "Journal"
    ];

    return titles.map((title, index) => ({
        id: index + 1,
        title,
        completedToday: Math.random() > 0.5,
        frequency: "Daily",
        currentStreak: Math.floor(Math.random() * 7),
        completionRate: Math.floor(Math.random() * 100)
    }));
};

const dummyHabits = generateDummyHabits();

const Dashboard = ({ user }) => {
    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator createdAt={user.createdAt} />
                <LogoutButton />
            </div>

            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList habits={dummyHabits} />
            </div>

            <div className="habit-overview-section">
                <HabitOverviewGrid habits={dummyHabits} />
            </div>
        </div>
    );
};

export default Dashboard;
