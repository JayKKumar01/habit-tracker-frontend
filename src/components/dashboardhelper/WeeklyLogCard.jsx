// components/dashboardhelper/WeeklyLogCard.jsx
import React from "react";
import "./WeeklyLogCard.css";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklyLogCard = ({ weekNumber, habits }) => {
    return (
        <div className="weekly-log-card">
            <div className="log-card-header">
                <h3>📅 Week {weekNumber} Summary</h3>
                <div className="day-label-row">
                    <span className="habit-title-header">Habit</span>
                    {dayLabels.map((day) => (
                        <span key={day} className="day-label">{day}</span>
                    ))}
                </div>
            </div>

            <div className="habit-log-cards-scroll">
                {habits.map((habit) => (
                    <div key={habit.id} className="habit-log-card">
                        <span className="habit-name">{habit.title}</span>
                        {habit.weeklyLog.map((completed, idx) => (
                            <div
                                key={idx}
                                className={`day-status-box ${completed ? "done" : "missed"}`}
                            >
                                {completed ? "✔" : "✖"}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyLogCard;
