import BASE_API_URL from "../config/config";

const HABIT_LOG_URL = `${BASE_API_URL}/habit-log`;

// Get token from localStorage helper
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// ✅ Update or Create Habit Log
export const updateHabitLog = async (email, habitLogData) => {
    const res = await fetch(`${HABIT_LOG_URL}/update/${email}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(habitLogData),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to update habit log.";
        throw new Error(errorMsg);
    }

    return data;
};

// ✅ Get all logs for a habit
export const getAllHabitLogs = async (email, habitId) => {
    const res = await fetch(`${HABIT_LOG_URL}/all/${email}/${habitId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to fetch habit logs.";
        throw new Error(errorMsg);
    }

    return data; // This will be an array of HabitLogResponse
};

// ✅ Get all logs for a user (used to batch fetch logs for all habits)
export const getAllLogsForUser = async (email) => {
    const res = await fetch(`${HABIT_LOG_URL}/all/${email}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to fetch user logs.";
        throw new Error(errorMsg);
    }

    return data; // Array of HabitLogResponse for all habits
};


