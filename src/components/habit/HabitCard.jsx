import React, { useState } from "react";
import "../../styles/HabitCard.css";
import { softDeleteHabit } from "../../services/habitService";
import { getTodayISTDateStr } from "../../utils/dateUtils";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";

const HabitCard = ({ habit, email, triggerRefresh }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleSoftDelete = async () => {
        try {
            const today = getTodayISTDateStr();
            await softDeleteHabit(email, habit.id, today);
            triggerRefresh();
            setModalOpen(false);
        } catch (error) {
            alert("Failed to delete habit: " + error.message);
        }
    };

    return (
        <div className="habit-card">
            <button className="delete-btn" onClick={() => setModalOpen(true)}>
                <Trash2 size={18} color="#e74c3c" strokeWidth={2} />
            </button>

            <h3>{habit.title}</h3>
            <p><strong>Frequency:</strong> {habit.frequency}</p>
            <p><strong>Streak:</strong> 🔥 {habit.currentStreak} days</p>
            <p><strong>Completion:</strong> {habit.completionRate}%</p>

            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={handleSoftDelete}
                message="Delete this habit?"
            />
        </div>
    );
};

export default HabitCard;
