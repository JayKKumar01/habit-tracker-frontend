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
// ✅ Edit an existing habit
export const editHabit = async (updatedHabitData, email) => {
    const res = await fetch(`${HABIT_URL}/edit/${email}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedHabitData),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to update habit.";
        throw new Error(errorMsg);
    }

    return data;
};


// ✅ Get all habits by user ID (faster backend query)
export const getHabitsByUserId = async (userId) => {
    const res = await fetch(`${HABIT_URL}/user/${userId}`, {
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


// ✅ Hard delete a habit by ID
export const deleteHabit = async (email, habitId) => {
    const res = await fetch(`${HABIT_URL}/delete/${email}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
        body: JSON.stringify({
            habitId,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to delete habit.";
        throw new Error(errorMsg);
    }

    return data;
};



