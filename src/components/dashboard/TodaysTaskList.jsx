import React, { useEffect, useState } from "react";
import "../../styles/TodaysTaskList.css";
import { getUserHabits } from "../../services/habitAuthService";
import {getTodayISTDateStr, getTodayISTDay} from "../../utils/dateUtils";

const TodaysTaskList = ({ user, refreshKey }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const todayDay = getTodayISTDay(); // e.g., "WEDNESDAY"
    const todayDateStr = getTodayISTDateStr(); // e.g., "2025-07-15"

    useEffect(() => {
        (async () => {
            try {
                const fetched = await getUserHabits(user.email);
                const applicable = fetched.filter((habit) => {
                    // ⛔ Skip habits that haven't started yet
                    if (habit.startDate > todayDateStr) return false;
                    if (habit.frequency === "DAILY") return true;
                    if (habit.frequency === "WEEKLY") {
                        return habit.targetDays.includes(todayDay);
                    }
                    return false;
                });

                setHabits(applicable);
            } catch (err) {
                console.error("Failed to fetch today's habits:", err.message);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        })();
    }, [user.email, todayDay, refreshKey]); // ✅ listen to refreshKey

    const isEmpty = !habits || habits.length === 0;

    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>

            {loading ? (
                <p>Loading...</p>
            ) : isEmpty ? (
                <div className="empty-task-placeholder">
                    <p className="no-habit-text">You haven’t added any habits yet.</p>
                    <button className="add-habit-btn-today">➕ Add Your First Habit</button>
                </div>
            ) : (
                <div className="task-list-wrapper">
                    <ul className="task-list">
                        {habits.map((habit) => (
                            <li
                                key={habit.id}
                                className={habit.completedToday ? "task done" : "task pending"}
                            >
                                {habit.title} {habit.completedToday ? "✅" : "❌"}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TodaysTaskList;
