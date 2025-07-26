import React, { useEffect, useState } from "react";
import "../../styles/WeeklyLogList.css";
import WeeklyLogCard from "../habit/WeeklyLogCard";
import { toLocalYYYYMMDD } from "../../utils/dateUtils";

// Get Monday of a given local date
const getMondayOfLocalDate = (localDate) => {
    const day = localDate.getDay();
    const diff = (day + 6) % 7;
    const monday = new Date(localDate);
    monday.setDate(localDate.getDate() - diff);
    return monday;
};

// Get weekly ranges from start to today (Monday to Sunday)
const getWeeklyDateRanges = (startDateLocal) => {
    const weeks = [];
    let current = getMondayOfLocalDate(startDateLocal);
    const todayMonday = getMondayOfLocalDate(new Date());

    while (current <= todayMonday) {
        const weekStart = new Date(current);
        const weekEnd = new Date(current);
        weekEnd.setDate(weekStart.getDate() + 6);
        weeks.unshift({
            startDate: toLocalYYYYMMDD(weekStart),
            endDate: toLocalYYYYMMDD(weekEnd)
        });
        current.setDate(current.getDate() + 7);
    }

    return weeks;
};

// Check if a habit is active in the week
const isHabitActiveInWeek = (habit, weekStart, weekEnd) => {
    return habit.startDate <= weekEnd && (!habit.endDate || habit.endDate >= weekStart);
};

const WeeklyLogList = ({ habits = [], loading, user }) => {
    const [weeklyHabitsList, setWeeklyHabitsList] = useState([]);

    useEffect(() => {
        if (loading || habits.length === 0) return;

        const createdAtLocal = new Date(user.createdAt);
        const weeks = getWeeklyDateRanges(createdAtLocal);

        const result = weeks.map((week, index) => {
            const habitsForWeek = habits.filter(habit =>
                isHabitActiveInWeek(habit, week.startDate, week.endDate)
            );
            return {
                weekNumber: weeks.length - index,
                habits: habitsForWeek,
                weekStartStr: week.startDate,
                weekEndStr: week.endDate
            };
        });

        setWeeklyHabitsList(result);
    }, [habits, loading]);

    if (loading) {
        return <div className="weekly-logs-section">Loading weekly logs...</div>;
    }

    return (
        <div className="weekly-logs-section">
            {weeklyHabitsList.map((week) => (
                <WeeklyLogCard
                    key={week.weekNumber}
                    weekNumber={week.weekNumber}
                    habits={week.habits}
                    startDate={week.weekStartStr}
                    defaultOpen={week.weekNumber === weeklyHabitsList.length}
                />
            ))}
        </div>
    );
};

export default WeeklyLogList;
