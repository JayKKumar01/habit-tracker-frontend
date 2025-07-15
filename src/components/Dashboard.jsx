import React from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import TodayTaskList from "./dashboardhelper/TodaysTaskList";
import HabitOverviewGrid from "./dashboardhelper/HabitOverviewGrid";
import CurrentWeekIndicator from "./dashboardhelper/CurrentWeekIndicator";
import WeeklyProgressBar from "./dashboardhelper/WeeklyProgressBar";
import WeeklyLogCard from "./dashboardhelper/WeeklyLogCard";

// Helper to generate random dummy habits
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
        completionRate: Math.floor(Math.random() * 100),
        weeklyLog: Array.from({ length: 7 }, () => Math.random() > 0.5) // Mon–Sun log
    }));
};


// Prepare dummy data for weeks
const week1Habits = generateDummyHabits();
const week2Habits = generateDummyHabits();
const week3Habits = generateDummyHabits(); // Current week

const Dashboard = ({ user }) => {
    // 🔧 Temporarily hardcode createdAt for testing (exactly 2 weeks ago)
    const mockedUser = {
        ...user,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 14)).toISOString()
    };

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator user={mockedUser} />
                <LogoutButton />
            </div>

            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList habits={week3Habits} />
            </div>

            <div className="habit-overview-section">
                <HabitOverviewGrid habits={week3Habits} />
            </div>

            <div className="weekly-progress-section">
                <WeeklyProgressBar habits={week3Habits} />
            </div>

            {/* Weekly logs for previous weeks can be added below */}
            <div className="weekly-logs-section">
                <WeeklyLogCard weekNumber={3} habits={week3Habits} />
                <WeeklyLogCard weekNumber={2} habits={week2Habits} />
                <WeeklyLogCard weekNumber={1} habits={week1Habits} />
            </div>

        </div>
    );
};

export default Dashboard;
