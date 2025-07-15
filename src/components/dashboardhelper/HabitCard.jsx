// components/dashboardhelper/HabitCard.jsx
import React from "react";
import "./HabitCard.css";

const HabitCard = ({ habit }) => {
    return (
        <div className="habit-card">
            <h3>{habit.title}</h3>
            <p><strong>Frequency:</strong> {habit.frequency}</p>
            <p><strong>Streak:</strong> 🔥 {habit.currentStreak} days</p>
            <p><strong>Completion:</strong> {habit.completionRate}%</p>
        </div>
    );
};

export default HabitCard;
