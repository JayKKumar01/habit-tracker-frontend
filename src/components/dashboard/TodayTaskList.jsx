import React, { useEffect, useState } from "react";
import "../../styles/TodaysTaskList.css";
import { getTodayISTDateStr, getTodayISTDay } from "../../utils/dateUtils";
import AddHabitButton from "./AddHabitButton";
import { updateHabitLog, getAllHabitLogs } from "../../services/habitLogService";
import ConfirmModal from "../modals/ConfirmModal";

const TodayTaskList = ({ habits = [], loading, email, triggerRefresh }) => {
    const [todayHabits, setTodayHabits] = useState([]);
    const [isLogLoading, setIsLogLoading] = useState(true);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    const today = {
        day: getTodayISTDay(),
        dateStr: getTodayISTDateStr(),
    };

    useEffect(() => {
        const loadTodayHabits = async () => {
            if (loading || habits.length === 0) return;

            setIsLogLoading(true);

            const validHabits = habits.filter(habit =>
                habit.startDate <= today.dateStr &&
                (!habit.endDate || habit.endDate > today.dateStr) &&
                (habit.frequency === "DAILY" || habit.targetDays?.includes(today.day))
            );

            const enrichedHabits = await Promise.all(
                validHabits.map(async habit => {
                    try {
                        const logs = await getAllHabitLogs(email, habit.id);
                        const todayLog = logs.find(log => log.date === today.dateStr);

                        return {
                            ...habit,
                            completedToday: todayLog?.completed || false,
                        };
                    } catch (err) {
                        console.error(`❌ Error fetching logs for ${habit.title}:`, err.message);
                        return {
                            ...habit,
                            completedToday: false,
                        };
                    }
                })
            );

            setTodayHabits(enrichedHabits);
            setIsLogLoading(false);
        };

        loadTodayHabits();
    }, [habits, loading, email]);

    const handleCheckboxChange = async () => {
        if (!selectedHabit) return;

        try {
            const { id, checked } = selectedHabit;
            const response = await updateHabitLog(email, {
                habitId: id,
                date: today.dateStr,
                completed: checked,
            });

            console.log(`✅ Updated "${selectedHabit.title}" to ${checked ? "completed" : "incomplete"}`, response);
            triggerRefresh();
        } catch (err) {
            console.error("❌ Failed to update habit log:", err.message);
        } finally {
            setModalOpen(false);
        }
    };

    const isEmpty = !loading && !isLogLoading && todayHabits.length === 0;

    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>

            {loading || isLogLoading ? (
                <p>Loading habits...</p>
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
                                            setSelectedHabit({
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
                message={
                    selectedHabit
                        ? `Mark "${selectedHabit.title}" as ${selectedHabit.checked ? "completed" : "incomplete"}?`
                        : ""
                }
            />
        </div>
    );
};

export default TodayTaskList;
