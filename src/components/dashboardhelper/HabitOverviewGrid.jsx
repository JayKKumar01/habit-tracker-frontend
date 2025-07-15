// components/dashboardhelper/HabitOverviewGrid.jsx
import React from "react";
import "./HabitOverviewGrid.css";
import HabitCard from "./HabitCard";

const HabitOverviewGrid = ({ habits }) => {
    return (
        <div className="habit-overview-container">
            <h2>📋 Your Habits</h2>
            <div className="habit-scroll-row">
                {habits.map(habit => (
                    <HabitCard key={habit.id} habit={habit} />
                ))}
            </div>
        </div>
    );
};

export default HabitOverviewGrid;
