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
// ✅ Get current week's dates (Monday to Sunday) based on IST
export const getCurrentWeekISTDates = () => {
    const todayIST = getISTDate(); // already adjusted to IST
    const currentDayIndex = todayIST.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate how many days to subtract to reach Monday
    const diffFromMonday = (currentDayIndex + 6) % 7; // e.g. Sunday(0) → 6, Monday(1) → 0
    const startOfWeek = new Date(todayIST);
    startOfWeek.setDate(todayIST.getDate() - diffFromMonday);

    const result = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        result.push(day.toISOString().split("T")[0]); // format: yyyy-mm-dd
    }

    return result;
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
