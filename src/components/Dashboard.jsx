import React, { useEffect, useState } from "react";
import "../styles/Dashboard.css";

// UI Components
import UserInfoCard from "./profile/UserInfoCard";
import LogoutButton from "./authentication/LogoutButton";
import TodayTaskList from "./dashboard/TodayTaskList";
import CurrentWeekIndicator from "./header/CurrentWeekIndicator";
import AddHabitButton from "./dashboard/AddHabitButton";
import HabitOverviewGrid from "./habit/HabitOverviewGrid";
import WeeklyProgressBar from "./habit/WeeklyProgressBar";
import WeeklyLogList from "./report/WeeklyLogList";

// Utilities
import {getHabitsWithLogsByUserId} from "../services/habitService";
import TokenExpiryWatcher from "../services/TokenExpiryWatcher";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user: initialUser }) => {
    const [user, setUser] = useState(initialUser); // ✅ make user stateful
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [fullyLoaded, setFullyLoaded] = useState(false); // central spinner
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");




    useEffect(() => {
        const fetchHabitsThenLogs = async () => {
            setLoading(true);
            setFullyLoaded(false); // show spinner until all fetches done
            const totalStart = performance.now();

            try {
                const habitsWithLogs = await getHabitsWithLogsByUserId(user.id);
                setHabits(habitsWithLogs);
            } catch (err) {
                console.error("❌ Failed to load habits or logs:", err.message);
                setHabits([]);
            } finally {
                const totalEnd = performance.now();
                console.log(`🕒 Total fetch + update time: ${(totalEnd - totalStart).toFixed(2)} ms`);
                setLoading(false);
                setFullyLoaded(true); // hide spinner only after everything is ready
            }
        };

        fetchHabitsThenLogs();
    }, [user.userId, refreshKey]);

    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <div className="dashboard-wrapper">
            <TokenExpiryWatcher
                token={token}
                onExpire={() => {
                    localStorage.clear();
                    navigate("/login");
                }}
            />

            {!fullyLoaded && (
                <div className="full-screen-loader">
                    <div className="spinner" />
                </div>
            )}

            <div className="dashboard-title-row">
                <h1 className="app-title">Habit Tracker</h1>
                <LogoutButton />
            </div>

            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator user={user} />
                <AddHabitButton
                    userId={user.id}
                    setHabitsFromAddHabit={setHabits}
                />
            </div>

            <div className="dashboard-row">
                <UserInfoCard user={user} setUserFromProfile={setUser} />
                <TodayTaskList
                    habits={habits}
                    loading={loading}
                    user={user}
                    setHabitsFromChild={setHabits}
                />
            </div>

            <div className="habit-overview-section">
                <HabitOverviewGrid
                    habits={habits}
                    loading={loading}
                    user={user}
                    setHabitsFromHabitOverview={setHabits}
                />
            </div>

            <div className="weekly-progress-section">
                <WeeklyProgressBar
                    habits={habits}
                    loading={loading}
                    email={user.email}
                />
            </div>

            <WeeklyLogList habits={habits} loading={loading} user={user} />
        </div>
    );
};

export default Dashboard;
