import React, { useEffect } from "react";
import "../../styles/WeeklyLogList.css";
import WeeklyLogCard from "../habit/WeeklyLogCard";
import { getAllHabitLogs } from "../../services/habitLogService";

// Helper: Get local Monday for a given local Date object
const getMondayOfLocalDate = (localDate) => {
    const day = localDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const diff = (day + 6) % 7; // number of days to subtract to get Monday
    const newDate = new Date();
    newDate.setDate(localDate.getDate() - diff);
    return newDate;
};




const WeeklyLogList = ({ habits = [], user }) => {
    useEffect(() => {
        const fetchLogsAndLogDates = async () => {
            // Step 1: Convert UTC -> Local date
            const createdAtLocal = new Date(user.createdAt);
            // Step 2: Get the Monday of that local date
            const week1StartDate = getMondayOfLocalDate(createdAtLocal);
            //
            // // Step 3: Log them
            console.log("📍 user.createdAt (raw UTC):", user.createdAt);
            console.log("📅 Local version:", createdAtLocal.toString());
            console.log("📆 Week 1 starts on Monday:", week1StartDate.toString());

            if (habits.length === 0) return;

            // Step 4: Fetch and set logs
            await Promise.all(
                habits.map(async (habit) => {
                    try {
                        habit.logs = await getAllHabitLogs(user.email, habit.id);
                    } catch (err) {
                        console.error(`Failed to fetch logs for ${habit.title}`, err);
                        habit.logs = [];
                    }
                })
            );
        };

        fetchLogsAndLogDates();
    }, [user.email, habits]);

    return (
        <div className="weekly-logs-section">
            <WeeklyLogCard weekNumber={3} habits={habits} defaultOpen={true} />
            <WeeklyLogCard weekNumber={2} habits={habits} defaultOpen={false} />
            <WeeklyLogCard weekNumber={1} habits={habits} defaultOpen={false} />
        </div>
    );
};

export default WeeklyLogList;
