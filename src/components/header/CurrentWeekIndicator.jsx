import React from "react";
import "../../styles/CurrentWeekIndicator.css";

const CurrentWeekIndicator = ({ user }) => {
    const getWeekAndDay = () => {
        const createdDate = new Date(user.createdAt);
        const now = new Date();

        const getMonday = (date) => {
            const result = new Date(date);
            const day = result.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
            const diff = (day === 0 ? -6 : 1) - day; // Shift so Monday is the start
            result.setDate(result.getDate() + diff);
            result.setHours(0, 0, 0, 0);
            return result;
        };

        const createdMonday = getMonday(createdDate);
        const todayMonday = getMonday(now);

        const weeksPassed = Math.floor((todayMonday - createdMonday) / (7 * 24 * 60 * 60 * 1000));
        const currentWeek = weeksPassed + 1;

        // Make week start from Monday
        const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        const adjustedDayIndex = (now.getDay() + 6) % 7; // Shift Sunday=0 to end
        const currentDay = daysOfWeek[adjustedDayIndex];

        return `Week ${currentWeek} - ${currentDay}`;
    };

    return <div className="current-week">{getWeekAndDay()}</div>;
};

export default CurrentWeekIndicator;
