import BASE_API_URL from "../config/config";

const HABIT_TAG_URL = `${BASE_API_URL}/habit-tag`;

// Get token from localStorage helper
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};
//await updateHabitTag({ habitId: habit.id, tags: updated });

export const updateHabitTag = async (userId, habitTagData) => {
    const res = await fetch(`${HABIT_TAG_URL}/update/${userId}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(habitTagData),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to update habit tag.";
        throw new Error(errorMsg);
    }

    return data;
}


