// habitState.js

/**
 * Add the newly created habit optimistically to the habit list.
 * @param {Array} currentHabits - Existing habits.
 * @param {Object} newHabit - Habit returned from backend.
 * @returns {Array} - New habit list with added habit.
 */
export const addHabitLocally = (currentHabits, newHabit) => {
    return [...currentHabits, { ...newHabit, logs: [] }];
};

/**
 * Revert habit list to original state if the add failed.
 * @param {Array} originalHabits - Previous stable list before add.
 * @returns {Array}
 */
export const revertHabitAdd = (originalHabits) => {
    return [...originalHabits];
};
