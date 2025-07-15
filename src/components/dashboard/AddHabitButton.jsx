import React, { useState } from "react";
import "../../styles/AddHabitButton.css";
import HabitForm from "../habit/HabitForm";

const AddHabitButton = ({ email, onHabitCreated }) => {
    const [showForm, setShowForm] = useState(false);

    const handleOpenForm = () => setShowForm(true);
    const handleCloseForm = () => setShowForm(false);

    const handleHabitCreated = (habit) => {
        console.log("New habit created:", habit);
        onHabitCreated?.(); // ✅ Notify parent to refresh
        handleCloseForm();
    };

    return (
        <>
            <button className="add-habit-btn" onClick={handleOpenForm}>
                ➕ Add Habit
            </button>

            {showForm && (
                <HabitForm
                    email={email}
                    onSuccess={handleHabitCreated}
                    onClose={handleCloseForm}
                />
            )}
        </>
    );
};

export default AddHabitButton;
