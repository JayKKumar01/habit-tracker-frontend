import React, { useState } from "react";
import { createHabit } from "../../services/habitAuthService";
import "../../styles/HabitForm.css";

const daysOfWeek = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY", "SUNDAY"
];

const formatDateIST = (date) => {
    const istOffset = 5.5 * 60 * 60 * 1000; // 5 hours 30 minutes in ms
    const localDate = new Date(date.getTime() + istOffset);
    return localDate.toISOString().split("T")[0];
};

const getThisWeekSaturday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, Saturday = 6
    const daysUntilSaturday = 6 - dayOfWeek;
    const saturday = new Date(today);
    saturday.setDate(today.getDate() + daysUntilSaturday);
    return formatDateIST(saturday);
};


const HabitForm = ({ email, onSuccess, onClose }) => {
    const todayStr = formatDateIST(new Date());
    const maxDateStr = getThisWeekSaturday();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [targetDays, setTargetDays] = useState(new Set());
    const [startDate, setStartDate] = useState(todayStr);
    const [error, setError] = useState("");

    const toggleDay = (day) => {
        const updated = new Set(targetDays);
        updated.has(day) ? updated.delete(day) : updated.add(day);
        setTargetDays(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // clear previous error

        if (!description.trim()) {
            setError("Description is required.");
            return;
        }

        if (frequency === "WEEKLY" && targetDays.size === 0) {
            setError("Please select at least one target day for weekly habit.");
            return;
        }

        const payload = {
            title,
            description,
            frequency,
            startDate,
            targetDays:
                frequency === "DAILY"
                    ? [...daysOfWeek]
                    : Array.from(targetDays),
        };

        try {
            const createdHabit = await createHabit(payload, email);
            onSuccess(createdHabit);
            onClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="habit-form-backdrop">
            <div className="habit-form-modal">
                <h3>Create New Habit</h3>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                    />
                    <label>Frequency</label>
                    <select
                        value={frequency}
                        onChange={(e) => {
                            setFrequency(e.target.value);
                            setTargetDays(new Set()); // reset when switching
                        }}
                    >
                        <option value="DAILY">Daily</option>
                        <option value="WEEKLY">Weekly</option>
                    </select>

                    {frequency === "WEEKLY" && (
                        <>
                            <label>Target Days</label>
                            <div className="day-buttons">
                                {daysOfWeek.map((day) => (
                                    <button
                                        type="button"
                                        key={day}
                                        className={targetDays.has(day) ? "selected" : ""}
                                        onClick={() => toggleDay(day)}
                                    >
                                        {day.slice(0, 3)}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    <label>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        min={todayStr}
                        max={maxDateStr}
                        required
                    />


                    <div className="form-buttons">
                        <button type="submit">Create</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HabitForm;
