import React, { useEffect, useState } from "react";
import "../../styles/TodaysTaskList.css";
import { getUserHabits } from "../../services/habitAuthService";
import { getTodayISTDateStr, getTodayISTDay } from "../../utils/dateUtils";
import AddHabitButton from "./AddHabitButton";

const TodaysTaskList = ({ user, refreshKey, triggerRefresh }) => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);

    const todayDay = getTodayISTDay();
    const todayDateStr = getTodayISTDateStr();

    useEffect(() => {
        const fetchHabits = async () => {
            setLoading(true);
            try {
                const fetched = await getUserHabits(user.email);
                const filtered = fetched.filter((habit) =>
                    habit.startDate <= todayDateStr &&
                    (habit.frequency === "DAILY" || habit.targetDays?.includes(todayDay))
                );
                setHabits(filtered);
            } catch (err) {
                console.error("Failed to load habits:", err.message);
                setHabits([]);
            } finally {
                setLoading(false);
            }
        };
        fetchHabits();
    }, [user.email, todayDay, refreshKey]);

    const isEmpty = habits.length === 0;

    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>

            {loading ? (
                <p>Loading...</p>
            ) : isEmpty ? (
                <div className="empty-task-placeholder">
                    <p className="no-habit-text">You haven’t added any habits yet.</p>
                    <AddHabitButton email={user.email} onHabitCreated={triggerRefresh} />
                </div>
            ) : (
                <>
                    <div className="task-list-wrapper">
                        <ul className="task-list">
                            {habits.map((habit) => (
                                <li
                                    key={habit.id}
                                    className={`task modern-task-item ${habit.completedToday ? "done" : "pending"}`}
                                >
                                    <label className="task-label">
                                        <input
                                            type="checkbox"
                                            checked={habit.completedToday}
                                            readOnly
                                        />
                                        <span className="task-title">{habit.title}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                </>
            )}
        </div>
    );
};

export default TodaysTaskList;
