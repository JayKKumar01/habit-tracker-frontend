import React, { useState } from "react";
import "../../styles/AddHabitButton.css";
import HabitForm from "../habit/HabitForm";
import {addHabitLocally} from "../state/habitState";

const AddHabitButton = ({ email, setHabitsFromAddHabit }) => {
    const [open, setOpen] = useState(false);

    const handleCreated = (newHabit) => {
        console.log("New habit created:", newHabit);

        // Correctly update the local habit list using the state updater function
        setHabitsFromAddHabit(prev => addHabitLocally(prev, newHabit));

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
