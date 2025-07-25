import React, { useEffect, useState } from "react";
import "../../styles/HabitProgress.css";
import { getCurrentWeekISTDates } from "../../utils/dateUtils";
import { getAllHabitLogs } from "../../services/habitLogService";

const HabitProgress = ({ habit, email }) => {
    const { title, completionRate, id } = habit;
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const fetchLogs = async () => {
            const weekDates = getCurrentWeekISTDates();
            const logs = await getAllHabitLogs(email, id);
            console.log("🔹 Current Week Dates:", weekDates);
            console.log("🔹 All Logs for Habit:", logs);
            setLogs(logs);
        };

        fetchLogs();
    }, [habit, email]);

    return (
        <div className="progress-card">
            <div className="progress-title">{title}</div>
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${completionRate}%` }}
                ></div>
            </div>
            <div className="progress-percent">{completionRate}%</div>
        </div>
    );
};

export default HabitProgress;
