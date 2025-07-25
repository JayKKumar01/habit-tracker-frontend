import BASE_API_URL from "../config/config";

const HABIT_URL = `${BASE_API_URL}/habits`;

// Get token and email from localStorage helper
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// ✅ Create a new habit
export const createHabit = async (habitData, email) => {
    const res = await fetch(`${HABIT_URL}/create/${email}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(habitData),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to create habit.";
        throw new Error(errorMsg);
    }

    return data;
};

export const softDeleteHabit = async (email, id, endDateStr) => {
    const res = await fetch(`${HABIT_URL}/soft-delete/${email}`, {
        method: "PUT",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            endDate: endDateStr, // format: "YYYY-MM-DD"
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to soft delete habit.";
        throw new Error(errorMsg);
    }

    return data;
};



// ✅ Get all habits for a user
export const getUserHabits = async (email) => {
    const res = await fetch(`${HABIT_URL}/user/${email}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to fetch habits.";
        throw new Error(errorMsg);
    }

    return data;
};

// ✅ Get a habit by ID
export const getHabitById = async (id) => {
    const res = await fetch(`${HABIT_URL}/${id}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to fetch habit.";
        throw new Error(errorMsg);
    }

    return data;
};

// ✅ Delete a habit by ID
export const deleteHabit = async (id) => {
    const res = await fetch(`${HABIT_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!res.ok) {
        const data = await res.json();
        const errorMsg = data.error || data.message || "Failed to delete habit.";
        throw new Error(errorMsg);
    }

    return true; // Successfully deleted
};

