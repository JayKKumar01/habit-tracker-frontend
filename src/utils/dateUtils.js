// Util to get today's date as local yyyy-mm-dd string
export const getLocalDateStr = (date = new Date()) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
};

export const getTodayWeekDay = () => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" }).toUpperCase();
}

// ✅ Get current week's dates (Monday to Sunday) based on IST
export const getCurrentWeekDates = () => {
    const date = new Date(); // already adjusted to IST
    const currentDayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Calculate how many days to subtract to reach Monday
    const diffFromMonday = (currentDayIndex + 6) % 7; // e.g. Sunday(0) → 6, Monday(1) → 0
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - diffFromMonday);

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
