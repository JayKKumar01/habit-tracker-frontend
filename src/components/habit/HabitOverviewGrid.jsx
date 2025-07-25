// components/dashboardhelper/HabitOverviewGrid.jsx
import React from "react";
import "../../styles/HabitOverviewGrid.css";
import HabitCard from "./HabitCard";
import { getTodayISTDateStr } from "../../utils/dateUtils";

const HabitOverviewGrid = ({ habits, email, triggerRefresh }) => {
    const today = getTodayISTDateStr();

    const activeHabits = habits.filter(
        (habit) => !habit.endDate || habit.endDate > today
    );

    return (
        <div className="habit-overview-container">
            <h2>📋 Your Habits</h2>
            <div className="habit-scroll-row">
                {activeHabits.map(habit => (
                    <HabitCard
                        key={habit.id}
                        habit={habit}
                        email={email}
                        triggerRefresh={triggerRefresh}
                    />
                ))}
            </div>
        </div>
    );
};

export default HabitOverviewGrid;
