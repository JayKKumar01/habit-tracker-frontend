import React from "react";
import "../../styles/TodaysTaskList.css";
import { getTodayISTDateStr, getTodayISTDay } from "../../utils/dateUtils";
import AddHabitButton from "./AddHabitButton";

const TodaysTaskList = ({ habits = [], loading, email, triggerRefresh }) => {
    const todayDay = getTodayISTDay();
    const todayDateStr = getTodayISTDateStr();

    const todayHabits = habits.filter(
        (habit) =>
            habit.startDate <= todayDateStr &&
            (!habit.endDate || habit.endDate >= todayDateStr) &&
            (habit.frequency === "DAILY" || habit.targetDays?.includes(todayDay))
    );


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
                                    <input type="checkbox" checked={habit.completedToday} readOnly />
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

export default TodaysTaskList;
