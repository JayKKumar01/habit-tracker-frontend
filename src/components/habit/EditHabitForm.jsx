import React, { useState } from "react";
import "../../styles/EditHabitForm.css";

const EditHabitForm = ({ habit, onSubmit, onCancel }) => {
    const [title, setTitle] = useState(habit.title);
    const [description, setDescription] = useState(habit.description || "");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const trimmedTitle = title.trim();
        const trimmedDescription = description.trim();

        if (!trimmedTitle) {
            setError("Title is required.");
            return;
        }

        if (trimmedTitle.length > 20) {
            setError("Title can't be too long.");
            return;
        }

        if (!trimmedDescription) {
            setError("Description is required.");
            return;
        }

        if (trimmedDescription.length > 100) {
            setError("That description is a bit too long.");
            return;
        }

        const hasChanges =
            trimmedTitle !== habit.title || trimmedDescription !== habit.description;

        if (!hasChanges) {
            setError("No changes made.");
            return;
        }

        const updates = {
            title: trimmedTitle,
            description: trimmedDescription,
        };

        setLoading(true);
        try {
            await onSubmit(updates);
        } catch (err) {
            setError("Failed to update habit.");
        } finally {
            setLoading(false);
        }
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
