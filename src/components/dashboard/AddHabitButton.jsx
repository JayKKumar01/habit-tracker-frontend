import React, { useState } from "react";
import "../../styles/AddHabitButton.css";
import HabitForm from "../habit/HabitForm";

const AddHabitButton = ({ email, setHabitsFromAddHabit }) => {
    const [open, setOpen] = useState(false);

    const handleCreated = (newHabit) => {
        console.log("New habit created:", newHabit);

        // ✅ Locally add new habit to habit list in Dashboard
        setHabitsFromAddHabit(prev => [...prev, newHabit]);

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
