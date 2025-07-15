import BASE_API_URL from "../config/config";

const AUTH_URL = `${BASE_API_URL}/auth`;
const USER_URL = `${BASE_API_URL}/users`;

export const signupUser = async (userData) => {
    const res = await fetch(`${AUTH_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Signup failed. Please try again.";
        throw new Error(errorMsg);
    }

    return data;
};

export const loginUser = async (credentials) => {
    const res = await fetch(`${AUTH_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        const errorMsg = data.error || data.message || "Login failed. Please try again.";
        throw new Error(errorMsg);
    }

    return data; // contains { token }
};

export const verifyToken = async () => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (!token || !email) return null;

    const res = await fetch(`${USER_URL}?email=${email}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) return null;

    return await res.json();
};
