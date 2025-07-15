import React, { useState } from "react";
import { createHabit } from "../../services/habitAuthService";
import {
    getTodayISTDateStr,
    getThisWeekSaturdayIST,
    daysOfWeek,
} from "../../utils/dateUtils";
import "../../styles/HabitForm.css";

const HabitForm = ({ email, onSuccess, onClose }) => {
    const todayStr = getTodayISTDateStr();
    const maxDateStr = getThisWeekSaturdayIST();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [targetDays, setTargetDays] = useState(new Set());
    const [startDate, setStartDate] = useState(todayStr);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleDay = (day) => {
        const updated = new Set(targetDays);
        updated.has(day) ? updated.delete(day) : updated.add(day);
        setTargetDays(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!description.trim()) {
            setError("Description is required.");
            setLoading(false);
            return;
        }

        if (frequency === "WEEKLY") {
            if (targetDays.size === 0) {
                setError("Please select at least one target day for weekly habit.");
                setLoading(false);
                return;
            }

            // ✅ Reject if any selected day is before startDate's day
            const startDateObj = new Date(startDate);
            const startDayIndex = startDateObj.getDay(); // 0 (Sun) to 6 (Sat)
            const startDayName = daysOfWeek[startDayIndex === 0 ? 6 : startDayIndex - 1]; // Map to "MONDAY"...

            const dayIndex = (day) => daysOfWeek.indexOf(day);
            const invalidDays = Array.from(targetDays).filter(
                (day) => dayIndex(day) < dayIndex(startDayName)
            );

            if (invalidDays.length > 0) {
                setError(
                    `Selected day(s) [${invalidDays.join(
                        ", "
                    )}] occur before the start date. Please adjust the start date or selected days.`
                );
                setLoading(false);
                return;
            }
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
        } finally {
            setLoading(false);
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
                            setTargetDays(new Set());
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
                        <button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create"}
                        </button>
                        <button type="button" onClick={onClose} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HabitForm;
