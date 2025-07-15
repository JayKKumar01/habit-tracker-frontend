import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./dashboardhelper/UserInfoCard";
import LogoutButton from "./dashboardhelper/LogoutButton";
import TodayTaskList from "./dashboard/TodaysTaskList";
import CurrentWeekIndicator from "./dashboardhelper/CurrentWeekIndicator";
import AddHabitButton from "./dashboard/AddHabitButton";
import { getUserHabits } from "../services/habitAuthService";
import HabitOverviewGrid from "./dashboardhelper/HabitOverviewGrid";
import WeeklyProgressBar from "./dashboardhelper/WeeklyProgressBar";
import WeeklyLogCard from "./dashboardhelper/WeeklyLogCard";

const Dashboard = ({ user }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const fetchHabits = async () => {
        setLoading(true);
        try {
            const data = await getUserHabits(user.email);
            setHabits(data);
        } catch (err) {
            console.error("Failed to load habits:", err.message);
            setHabits([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHabits();

    }, [refreshKey]);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

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
                <AddHabitButton email={user.email} onHabitCreated={triggerRefresh} />
            </div>

            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList
                    habits={habits}
                    loading={loading}
                    email={user.email}
                    triggerRefresh={triggerRefresh}
                />
            </div>
            <div className="habit-overview-section">
                <HabitOverviewGrid habits={habits} />
            </div>
            <div className="weekly-progress-section">
                <WeeklyProgressBar habits={habits} />
            </div>

            <div className="weekly-logs-section">
                <WeeklyLogCard weekNumber={3} habits={habits} defaultOpen={true} />
                <WeeklyLogCard weekNumber={2} habits={habits} defaultOpen={false} />
                <WeeklyLogCard weekNumber={1} habits={habits} defaultOpen={false} />

            </div>
        </div>
    );
};

export default Dashboard;
