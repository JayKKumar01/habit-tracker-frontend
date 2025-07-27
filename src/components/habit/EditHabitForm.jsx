import React, { useState } from "react";
import "../../styles/EditHabitForm.css"; // Reuse existing styles

const EditHabitForm = ({ habit, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(habit.title);
    const [description, setDescription] = useState(habit.description || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!title.trim()) {
            setError("Title is required.");
            setLoading(false);
            return;
        }

        if (title.length > 20) {
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

        onSubmit({
            ...habit,
            title: title.trim(),
            description: description.trim(),
        });

        setLoading(false);
    };

    return (
        <div className="habit-form-backdrop">
            <div className="habit-form-modal">
                <h3>Edit Habit</h3>

                {error && <p className="error">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        required
                    />

                    <div className="form-buttons">
                        <button type="submit" disabled={loading}>
                            {loading ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={onCancel} disabled={loading}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditHabitForm;
