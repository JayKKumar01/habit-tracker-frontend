import React, { useEffect, useState } from "react";
import "../../styles/TodaysTaskList.css";
import { getTodayISTDateStr, getTodayISTDay } from "../../utils/dateUtils";
import AddHabitButton from "./AddHabitButton";
import { updateHabitLog, getAllHabitLogs } from "../../services/habitLogService";

const TodayTaskList = ({ habits = [], loading, email, triggerRefresh }) => {
    const [todayHabits, setTodayHabits] = useState([]);
    const todayDay = getTodayISTDay();
    const todayDateStr = getTodayISTDateStr();

    useEffect(() => {
        if (loading || habits.length === 0) return;

        const processHabits = async () => {
            const validHabits = habits.filter((habit) => {
                return habit.startDate <= todayDateStr &&
                    (!habit.endDate || habit.endDate > todayDateStr) &&
                    (habit.frequency === "DAILY" || habit.targetDays?.includes(todayDay));
            });

            const updatedHabits = await Promise.all(
                validHabits.map(async (habit) => {
                    try {
                        const logs = await getAllHabitLogs(email, habit.id);
                        console.log(`📘 Logs for habit ${habit.id}:`, logs);

                        const todayLog = logs.find(log => log.date === todayDateStr);
                        return {
                            ...habit,
                            completedToday: todayLog?.completed || false,
                        };
                    } catch (err) {
                        console.error(`❌ Failed to fetch logs for habit ${habit.id}:`, err.message);
                        return {
                            ...habit,
                            completedToday: false, // fallback
                        };
                    }
                })
            );

            setTodayHabits(updatedHabits);
        };

        processHabits();
    }, [habits, loading, email]);

    const handleCheckboxChange = async (habitId, checked) => {
        console.log(`📦 Habit ID: ${habitId}, Checked: ${checked}`);

        try {
            const response = await updateHabitLog(email, {
                habitId: habitId,
                date: todayDateStr,
                completed: checked,
            });

            console.log("✅ Habit log updated:", response);
            triggerRefresh();
        } catch (error) {
            console.error("❌ Failed to update habit log:", error.message);
        }
    };

    const isEmpty = !loading && todayHabits.length === 0;

    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>

            {loading ? (
                <p>Loading...</p>
            ) : isEmpty ? (
                <div className="empty-task-placeholder">
                    <p className="no-habit-text">You haven’t added any habits yet.</p>
                    <AddHabitButton email={email} onHabitCreated={triggerRefresh} />
                </div>
            ) : (
                <div className="task-list-wrapper">
                    <ul className="task-list">
                        {todayHabits.map((habit) => (
                            <li
                                key={habit.id}
                                className={`task modern-task-item ${habit.completedToday ? "done" : "pending"}`}
                            >
                                <label className="task-label">
                                    <input
                                        type="checkbox"
                                        checked={habit.completedToday}
                                        onChange={(e) =>
                                            handleCheckboxChange(habit.id, e.target.checked)
                                        }
                                    />
                                    <span className="task-title">{habit.title}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TodayTaskList;
