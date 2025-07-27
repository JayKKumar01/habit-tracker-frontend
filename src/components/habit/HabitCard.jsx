import React, { useEffect, useState } from "react";
import "../../styles/HabitCard.css";
import { softDeleteHabit } from "../../services/habitService";
import { getCurrentWeekDates, getLocalDateStr } from "../../utils/dateUtils";
import { Trash2, Pencil } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";
import { updateHabitInList } from "../state/habitState";
import EditHabitForm from "./EditHabitForm"; // ✅ NEW

const daysShort = ["M", "T", "W", "T", "F", "S", "S"];
const daysLong = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY", "SUNDAY"
];

const HabitCard = ({ habit, email, setHabitsFromHabitCard }) => {
    const localDateStr = getLocalDateStr();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // ✅ NEW
    const [weekStatus, setWeekStatus] = useState([]);
    const [todayIndex, setTodayIndex] = useState(null);
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        const fetchLogsAndSetStatus = async () => {
            const currentWeekDates = getCurrentWeekDates();
            const status = [];
            let todayIdx = null;

            currentWeekDates.forEach((dateStr, idx) => {
                if (dateStr === localDateStr) todayIdx = idx;

                if (!habit.targetDays.includes(daysLong[idx])) {
                    status.push("grey-na");
                } else if (dateStr > localDateStr) {
                    status.push("grey");
                } else {
                    const log = habit.logs?.find(log => log.date === dateStr);
                    status.push(log ? (log.completed ? "green" : "red") : "red");
                }
            });

            setWeekStatus(status);
            setTodayIndex(todayIdx);
        };

        fetchLogsAndSetStatus();
    }, [habit, email]);

    useEffect(() => {
        if (todayIndex === null || weekStatus.length === 0) return;

        let streakCount = 0;
        for (let i = todayIndex; i >= 0; i--) {
            const day = daysLong[i];
            if (!habit.targetDays.includes(day)) continue;
            if (weekStatus[i] !== "green") break;
            streakCount++;
        }

        setStreak(streakCount);
    }, [habit, todayIndex, weekStatus]);

    const handleSoftDelete = async () => {
        try {
            await softDeleteHabit(email, habit.id, localDateStr);
            setHabitsFromHabitCard(prev =>
                updateHabitInList(prev, habit.id, { endDate: localDateStr })
            );
            setModalOpen(false);
        } catch (error) {
            alert("Failed to delete habit: " + error.message);
        }
    };

    const handleEditSubmit = (updatedHabit) => {
        setHabitsFromHabitCard(prev =>
            updateHabitInList(prev, habit.id, updatedHabit)
        );
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditHabitForm
                habit={habit}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="habit-card">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
                <Pencil size={18} color="#f39c12" strokeWidth={2} />
            </button>

            <button className="delete-btn" onClick={() => setModalOpen(true)}>
                <Trash2 size={18} color="#e74c3c" strokeWidth={2} />
            </button>

            <h3>{habit.title}</h3>
            {habit.description && <p className="habit-description">{habit.description}</p>}
            <p><strong>Frequency:</strong> {habit.frequency}</p>
            <p><strong>Streak:</strong> {streak} 🔥</p>

            <div className="weekly-tracker">
                {daysShort.map((day, idx) => (
                    <div
                        key={idx}
                        className={`day-indicator ${weekStatus[idx] || "grey"} ${todayIndex === idx ? "today-border" : ""}`}
                    >
                        {day}
                    </div>
                ))}
            </div>

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
