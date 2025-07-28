import BASE_API_URL from "../config/config";

const PROFILE_URL = `${BASE_API_URL}/profile`;

// Get token and email from localStorage helper
const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
};

// ✅ Get profile by user email
export const getProfile = async (userId) => {
    const res = await fetch(`${PROFILE_URL}/user/${userId}`, {
        method: "GET",
        headers: getAuthHeaders(),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to fetch profile.";
        throw new Error(errorMsg);
    }

    return data;
};

// ✅ Save or update profile bio
export const saveOrUpdateProfile = async (userId, bio) => {
    const res = await fetch(`${PROFILE_URL}/save/${userId}`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({ bio }),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Failed to save profile.";
        throw new Error(errorMsg);
    }

    return data;
};
