// components/dashboardhelper/HabitOverviewGrid.jsx
import React from "react";
import "../../styles/HabitOverviewGrid.css";
import HabitCard from "./HabitCard";

const HabitOverviewGrid = ({ habits, email, triggerRefresh }) => {
    return (
        <div className="habit-overview-container">
            <h2>📋 Your Habits</h2>
            <div className="habit-scroll-row">
                {habits.map(habit => (
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
