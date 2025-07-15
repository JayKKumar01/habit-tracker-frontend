// components/dashboardhelper/WeeklyProgressBar.jsx
import React from "react";
import "./WeeklyProgressBar.css";

const WeeklyProgressBar = ({ habits }) => {
    return (
        <div className="weekly-progress-wrapper">
            <h2>📈 Weekly Progress</h2>
            <div className="progress-grid">
                {habits.map(habit => (
                    <div key={habit.id} className="progress-card">
                        <div className="progress-title">{habit.title}</div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${habit.completionRate}%` }}
                            ></div>
                        </div>
                        <div className="progress-percent">{habit.completionRate}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyProgressBar;
