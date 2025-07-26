import React, { useState } from "react";
import "../../styles/WeeklyLogCard.css";

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// ✅ Generate array of 7 date strings starting from given Monday date (yyyy-mm-dd)
const getWeekDateStrings = (startDateStr) => {
    if (!startDateStr) {
        console.warn("❌ Invalid startDate passed to getWeekDateStrings:", startDateStr);
        return [];
    }

    const [year, month, day] = startDateStr.split("-").map(Number);
    const start = new Date(year, month - 1, day);

    const dates = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        dates.push(`${yyyy}-${mm}-${dd}`);
    }
    return dates;
};

const WeeklyLogCard = ({ weekNumber, habits = [], startDate, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const weekDates = getWeekDateStrings(startDate);

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
                    {habits.map((habit) => {
                        const logsByDate = {};
                        (habit.logs || []).forEach(log => {
                            logsByDate[log.date] = log.completed;
                        });

                        const weeklyLog = weekDates.map(date => logsByDate[date] === true);

                        return (
                            <div key={habit.id} className="habit-log-card">
                                <span className="habit-name">{habit.title}</span>
                                {weeklyLog.map((completed, idx) => (
                                    <div
                                        key={idx}
                                        className={`day-status-box ${completed ? "done" : "missed"}`}
                                    >
                                        {completed ? "✔" : "✖"}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default WeeklyLogCard;
