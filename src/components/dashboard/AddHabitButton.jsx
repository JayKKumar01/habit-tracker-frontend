import React from "react";
import "../../styles/AddHabitButton.css";

const AddHabitButton = () => {
    const handleClick = () => {
        alert("Open add habit form (coming soon)");
    };

    return (
        <button className="add-habit-btn" onClick={handleClick}>
            ➕ Add Habit
        </button>
    );
};

export default AddHabitButton;
