import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import UserInfoCard from "./profile/UserInfoCard";
import LogoutButton from "./authentication/LogoutButton";
import TodayTaskList from "./dashboard/TodayTaskList";
import CurrentWeekIndicator from "./header/CurrentWeekIndicator";
import AddHabitButton from "./dashboard/AddHabitButton";
import { getUserHabits } from "../services/habitService";
import HabitOverviewGrid from "./habit/HabitOverviewGrid";
import WeeklyProgressBar from "./habit_log/WeeklyProgressBar";
import WeeklyLogCard from "./habit_log/WeeklyLogCard";
import TokenExpiryWatcher from "../services/TokenExpiryWatcher";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
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

        fetchHabits();
    }, [refreshKey, user.email]);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <div className="dashboard-wrapper">
            {/* ✅ Token watcher (auto logout) */}
            <TokenExpiryWatcher
                token={token}
                onExpire={() => {
                    localStorage.clear();
                    navigate("/login");
                }}
            />

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
                <HabitOverviewGrid habits={habits} email={user.email} triggerRefresh={triggerRefresh} />

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
