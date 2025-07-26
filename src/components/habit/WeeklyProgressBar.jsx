import React from "react";
import "../../styles/WeeklyProgressBar.css";
import HabitProgress from "./HabitProgress";

const WeeklyProgressBar = ({ habits, email }) => {
    const todayDateStr = new Date().toISOString().slice(0, 10);

    const activeHabits = habits.filter(
        habit => !habit.endDate || habit.endDate > todayDateStr
    );

    return (
        <div className="weekly-progress-wrapper">
            <h2>📈 Weekly Progress</h2>
            <div className="progress-grid">
                {activeHabits.map(habit => (
                    <HabitProgress key={habit.id} habit={habit} email={email} />
                ))}
            </div>
        </div>
    );
};

export default WeeklyProgressBar;
