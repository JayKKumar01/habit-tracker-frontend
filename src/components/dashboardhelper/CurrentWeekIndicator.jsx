import React from "react";
import "./CurrentWeekIndicator.css";

const CurrentWeekIndicator = ({ createdAt }) => {
    const getCurrentWeek = () => {
        const createdDate = new Date(createdAt);
        const now = new Date();

        const startOfWeek = (date) => {
            const day = date.getDay();
            const diff = (day === 0 ? -6 : 1) - day; // convert Sunday (0) to Monday-start
            const monday = new Date(date);
            monday.setDate(date.getDate() + diff);
            monday.setHours(0, 0, 0, 0);
            return monday;
        };

        const createdMonday = startOfWeek(createdDate);
        const todayMonday = startOfWeek(now);

        const weeksPassed = Math.floor((todayMonday - createdMonday) / (7 * 24 * 60 * 60 * 1000));
        return `Week ${weeksPassed + 1}`;
    };

    return <div className="current-week">{getCurrentWeek()}</div>;
};

export default CurrentWeekIndicator;
