// components/state/habitLogState.js
import { getLocalDateStr } from "../../utils/dateUtils";

/**
 * Update the habit log in the UI state locally
 * @param {Array} habits - Original habit list from Dashboard
 * @param {string} habitId - ID of the habit being updated
 * @param {boolean} completed - New completed status
 * @returns {Array} - Updated habits array (shallow copy)
 */
export const updateLocalLog = (habits, habitId, completed) => {
    const today = getLocalDateStr();

    return habits.map(habit => {
        if (habit.id !== habitId) return habit;

        const existingLogIndex = habit.logs?.findIndex(log => log.date === today);

        const updatedLogs = habit.logs ? [...habit.logs] : [];

        if (existingLogIndex !== -1) {
            // Update existing log
            updatedLogs[existingLogIndex] = {
                ...updatedLogs[existingLogIndex],
                completed,
            };
        } else {
            // Add new log
            updatedLogs.push({
                habitId,
                date: today,
                completed,
            });
        }

        return {
            ...habit,
            logs: updatedLogs,
        };
    });
};

// 🔁 Revert changes on failure
export const revertLocalLog = (habits, habitId) => {
    const today = getLocalDateStr();

    return habits.map(habit => {
        if (habit.id !== habitId) return habit;

        const updatedLogs = habit.logs?.filter(log => log.date !== today) || [];

        return {
            ...habit,
            logs: updatedLogs,
        };
    });
};

