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
import { getUserHabits } from "../services/habitService";
import { getAllLogsForUser } from "../services/habitLogService";
import TokenExpiryWatcher from "../services/TokenExpiryWatcher";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // ✅ Fetch habits + logs
    useEffect(() => {
        const fetchHabitsAndLogs = async () => {
            setLoading(true);
            try {
                const [habitsData, logsData] = await Promise.all([
                    getUserHabits(user.email),
                    getAllLogsForUser(user.email),
                ]);

                console.log(logsData);

                // Group logs by habitId
                const logsByHabit = logsData.reduce((acc, log) => {
                    const habitId = log.habitId;
                    if (!acc[habitId]) acc[habitId] = [];
                    acc[habitId].push(log);
                    return acc;
                }, {});

                // Attach logs to each habit
                const habitsWithLogs = habitsData.map(habit => ({
                    ...habit,
                    logs: logsByHabit[habit.id] || [],
                }));

                setHabits(habitsWithLogs);
            } catch (err) {
                console.error("❌ Failed to load habits or logs:", err.message);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHabitsAndLogs();
    }, [user.email, refreshKey]);

    // ✅ Trigger refresh by changing key
    const triggerRefresh = () => setRefreshKey(prev => prev + 1);

    return (
        <div className="dashboard-wrapper">
            {/* ✅ Auto logout on token expiry */}
            <TokenExpiryWatcher
                token={token}
                onExpire={() => {
                    localStorage.clear();
                    navigate("/login");
                }}
            />

            {/* 🔰 Header Row */}
            <div className="dashboard-title-row">
                <h1 className="app-title">Habit Tracker</h1>
                <LogoutButton />
            </div>

            {/* 👋 Welcome Row */}
            <div className="dashboard-header-row">
                <h1 className="welcome-text">🎯 Welcome, {user.name}</h1>
                <CurrentWeekIndicator user={user} />
                <AddHabitButton email={user.email} onHabitCreated={triggerRefresh} />
            </div>

            {/* 📋 Today’s Task + User Info */}
            <div className="dashboard-row">
                <UserInfoCard user={user} />
                <TodayTaskList
                    habits={habits}
                    loading={loading}
                    email={user.email}
                    triggerRefresh={triggerRefresh}
                />
            </div>

            {/*/!* 📊 Habit Overview *!/*/}
            {/*<div className="habit-overview-section">*/}
            {/*    <HabitOverviewGrid habits={habits} email={user.email} triggerRefresh={triggerRefresh} />*/}
            {/*</div>*/}

            {/*/!* 📈 Weekly Progress *!/*/}
            {/*<div className="weekly-progress-section">*/}
            {/*    <WeeklyProgressBar habits={habits} email={user.email} />*/}
            {/*</div>*/}

            {/*/!* 📆 Weekly Logs *!/*/}
            {/*<WeeklyLogList habits={habits} user={user} />*/}
        </div>
    );
};

export default Dashboard;
