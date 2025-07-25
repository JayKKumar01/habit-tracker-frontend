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
