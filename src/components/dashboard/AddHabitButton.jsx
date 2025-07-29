import React, { useState } from "react";
import "../../styles/AddHabitButton.css";
import HabitForm from "../habit/HabitForm";
import {addHabitLocally} from "../state/habitState";

const AddHabitButton = ({ userId, setHabitsFromAddHabit }) => {
    const [open, setOpen] = useState(false);

    const handleCreated = (newHabit) => {
        newHabit.tags = [];
        const tag = {habitId: newHabit.id, name: newHabit.frequency}
        if (newHabit.frequency === "DAILY"){
            tag.id = 1;
        }else{
            tag.id = 3;
        }
        newHabit.tags.push(tag);
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
                    userId={userId}
                    onSuccess={handleCreated}
                    onClose={() => setOpen(false)}
                />
            )}
        </>
    );
};

export default AddHabitButton;
