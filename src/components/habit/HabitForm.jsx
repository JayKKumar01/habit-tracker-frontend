import React, {useEffect, useState} from "react";
import {createHabit} from "../../services/habitService";
import {daysOfWeek, getLocalDateStr} from "../../utils/dateUtils";
import "../../styles/HabitForm.css";

const HabitForm = ({userId, onSuccess, onClose}) => {
    const localDateStr = getLocalDateStr();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [frequency, setFrequency] = useState("DAILY");
    const [targetDays, setTargetDays] = useState(new Set());
    const [startDate, setStartDate] = useState(localDateStr);
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (tags.length >= 5) {
            setError("You can only add up to 5 tags.");
        } else if (error === "You can only add up to 5 tags.") {
            setError(""); // clear tag limit error if back under limit
        }
    }, [tags, error]);

    const resetForm = () => {
        setTitle("");
        setDescription("");
        setFrequency("DAILY");
        setTargetDays(new Set());
        setStartDate(localDateStr);
        setTags([]);
        setTagInput("");
        setError("");
        setLoading(false);
    };

    const toggleDay = (day) => {
        setTargetDays((prev) => {
            const updated = new Set(prev);
            updated.has(day) ? updated.delete(day) : updated.add(day);
            return updated;
        });
    };

    const handleTagKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = tagInput.trim();
            if (!trimmed || tags.includes(trimmed) || tags.length >= 5) return;

            setTags([...tags, trimmed]);
            setTagInput("");
        }
    };



    const removeTag = (tagToRemove) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!title.trim()) {
            setError("Title is required.");
            setLoading(false);
            return;
        }

        if (title.length > 21) {
            setError("Title can't be too long.");
            setLoading(false);
            return;
        }

        if (!description.trim()) {
            setError("Description is required.");
            setLoading(false);
            return;
        }

        if (description.length > 100) {
            setError("That description is a bit too long.");
            setLoading(false);
            return;
        }

        if (frequency === "WEEKLY" && targetDays.size === 0) {
            setError("Please select at least one target day for weekly habit.");
            setLoading(false);
            return;
        }

        const payload = {
            title,
            description,
            frequency,
            targetDays: frequency === "DAILY"
                ? [...daysOfWeek]
                : Array.from(targetDays),
            startDate,
            tags, // ✅ include tag names
        };

        try {
            const createdHabit = await createHabit(payload, userId);
            onSuccess(createdHabit);
            onClose();
            resetForm();
        } catch (err) {
            setError(err.message || "Something went wrong.");
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
                                        key={day}
                                        type="button"
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
                        min={localDateStr}
                        required
                    />

                    {/* ✅ Tag input UI */}
                    <label>Tags</label>
                    <input
                        type="text"
                        placeholder="Add tag and press Enter"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        disabled={tags.length >= 5}
                    />
                    <div className="tag-container">
                        {tags.map((tag) => (
                            <span key={tag} className="tag-pill">
                                {tag}
                                <button type="button" onClick={() => removeTag(tag)}>×</button>
                            </span>
                        ))}
                    </div>


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
