import React from "react";
import "./CurrentWeekIndicator.css";

const CurrentWeekIndicator = ({ user }) => {
    const getWeekAndDay = () => {
        const createdDate = new Date(user.createdAt);
        const now = new Date();

        const startOfWeek = (date) => {
            const day = date.getDay();
            const diff = (day === 0 ? -6 : 1) - day; // Adjust so week starts on Monday
            const monday = new Date(date);
            monday.setDate(date.getDate() + diff);
            monday.setHours(0, 0, 0, 0);
            return monday;
        };

        const createdMonday = startOfWeek(createdDate);
        const todayMonday = startOfWeek(now);

        const weeksPassed = Math.floor((todayMonday - createdMonday) / (7 * 24 * 60 * 60 * 1000));
        const currentWeek = weeksPassed + 1;

        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const currentDay = daysOfWeek[now.getDay()];

        return `Week ${currentWeek} - ${currentDay}`;
    };

    return <div className="current-week">{getWeekAndDay()}</div>;
};

export default CurrentWeekIndicator;
