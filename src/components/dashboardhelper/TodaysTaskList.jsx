// components/dashboardhelper/TodaysTaskList.jsx
import React from "react";
import "./TodaysTaskList.css";

const TodaysTaskList = ({ habits }) => {
    return (
        <div className="todays-task-card">
            <h2>✅ Today's Tasks</h2>
            {habits.length === 0 ? (
                <p>No habits for today 🎉</p>
            ) : (
                <ul className="task-list">
                    {habits.map((habit) => (
                        <li key={habit.id} className={habit.completedToday ? "task done" : "task pending"}>
                            {habit.title} {habit.completedToday ? "✅" : "❌"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TodaysTaskList;
