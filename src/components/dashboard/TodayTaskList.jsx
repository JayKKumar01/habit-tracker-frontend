import React, { useEffect, useState } from "react";
import "../../styles/TodaysTaskList.css";
import { getTodayISTDateStr, getTodayISTDay } from "../../utils/dateUtils";
import AddHabitButton from "./AddHabitButton";
import { updateHabitLog, getAllHabitLogs } from "../../services/habitLogService";
import ConfirmModal from "../modals/ConfirmModal";

const TodayTaskList = ({ habits = [], loading, email, triggerRefresh }) => {
    const [todayHabits, setTodayHabits] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentHabit, setCurrentHabit] = useState(null);
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
                            completedToday: false,
                        };
                    }
                })
            );

            setTodayHabits(updatedHabits);
        };

        processHabits();
    }, [habits, loading, email]);

    const handleCheckboxChange = async () => {
        if (!currentHabit) return;
        console.log(`📦 Habit ID: ${currentHabit.id}, Checked: ${currentHabit.checked}`);

        try {
            const response = await updateHabitLog(email, {
                habitId: currentHabit.id,
                date: todayDateStr,
                completed: currentHabit.checked,
            });

            console.log("✅ Habit log updated:", response);
            triggerRefresh(); // Refresh the habits
        } catch (error) {
            console.error("❌ Failed to update habit log:", error.message);
        } finally {
            setModalOpen(false);
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
                                        onChange={(e) => {
                                            setCurrentHabit({
                                                ...habit,
                                                checked: e.target.checked,
                                            });
                                            setModalOpen(true);
                                        }}
                                    />
                                    <span className="task-title">{habit.title}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleCheckboxChange}
                message="Change this habit status?"
            />
        </div>
    );
};

export default TodayTaskList;
