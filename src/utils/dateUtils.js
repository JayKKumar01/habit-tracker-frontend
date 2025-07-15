// ✅ Get a Date object adjusted to IST
export const getISTDate = () => {
    const now = new Date();
    const istOffsetMs = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes
    return new Date(now.getTime() + istOffsetMs);
};

// ✅ Get today in IST as 'YYYY-MM-DD'
export const getTodayISTDateStr = () => {
    const istDate = getISTDate();
    return istDate.toISOString().split("T")[0];
};

// ✅ Get today's day in IST as uppercase string: 'MONDAY', 'TUESDAY', ...
export const getTodayISTDay = () => {
    const istDate = getISTDate();
    return istDate.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "Asia/Kolkata",
    }).toUpperCase();
};

// ✅ Get this week's Saturday date (YYYY-MM-DD) in IST
export const getThisWeekSaturdayIST = () => {
    const today = getISTDate();
    const dayOfWeek = today.getDay(); // Sunday = 0, Saturday = 6
    const offset = 6 - dayOfWeek;
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + offset);
    return saturday.toISOString().split("T")[0];
};

// ✅ Export constant list of all days in order
export const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];
