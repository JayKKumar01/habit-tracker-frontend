import React, { useState } from "react";
import "../../styles/WeeklyLogCard.css";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const WeeklyLogCard = ({ weekNumber, habits = [], defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div
            className="weekly-log-card"
            style={{ maxHeight: isOpen ? "280px" : "50px", overflow: "hidden" }}
        >
            <div className="log-card-header" onClick={() => setIsOpen((prev) => !prev)}>
                <h3>
                    📅 Week {weekNumber} Summary
                    <span className="toggle-icon">{isOpen ? "▲" : "▼"}</span>
                </h3>
                {isOpen && (
                    <div className="day-label-row">
                        <span className="habit-title-header">Habit</span>
                        {dayLabels.map((day) => (
                            <span key={day} className="day-label">
                                {day}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {isOpen && (
                <div className="habit-log-cards-scroll">
                    {habits.map((habit) => (
                        <div key={habit.id} className="habit-log-card">
                            <span className="habit-name">{habit.title}</span>
                            {(habit.weeklyLog || Array(7).fill(false)).map((completed, idx) => (
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
            )}
        </div>
    );
};

export default WeeklyLogCard;
