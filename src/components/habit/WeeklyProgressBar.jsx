import React from "react";
import "../../styles/WeeklyProgressBar.css";
import HabitProgress from "./HabitProgress";
import {getLocalDateStr} from "../../utils/dateUtils";

const WeeklyProgressBar = ({ habits, email }) => {
    const localDateStr = getLocalDateStr();

    const activeHabits = habits.filter(
        habit => !habit.endDate || habit.endDate > localDateStr
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
