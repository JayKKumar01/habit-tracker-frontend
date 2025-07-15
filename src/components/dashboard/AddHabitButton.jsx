import React, { useState } from "react";
import "../../styles/AddHabitButton.css";
import HabitForm from "../habit/HabitForm";

const AddHabitButton = ({ email, onHabitCreated }) => {
    const [open, setOpen] = useState(false);

    const handleCreated = (habit) => {
        console.log("New habit created:", habit);
        onHabitCreated?.(); // Notify parent
        setOpen(false);
    };

    return (
        <>
            <button className="add-habit-btn" onClick={() => setOpen(true)}>
                ➕ Add Habit
            </button>

            {open && (
                <HabitForm
                    email={email}
                    onSuccess={handleCreated}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default AddHabitButton;
