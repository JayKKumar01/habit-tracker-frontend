import React, { useEffect, useState } from "react";
import "../../styles/HabitCard.css";
import { softDeleteHabit } from "../../services/habitService";
import {
    getTodayISTDateStr,
    getCurrentWeekISTDates,
    getISTDate
} from "../../utils/dateUtils";
import { getAllHabitLogs } from "../../services/habitLogService";
import { Trash2 } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";

const daysShort = ["M", "T", "W", "T", "F", "S", "S"];
// Used for comparison with habit.targetDays (uppercase like "MONDAY")
const daysLong = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
];

const HabitCard = ({ habit, email, triggerRefresh }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [weekStatus, setWeekStatus] = useState([]);
    const [todayIndex, setTodayIndex] = useState(null);

    useEffect(() => {
        const fetchLogsAndSetStatus = async () => {
            const currentWeekDates = getCurrentWeekISTDates();
            const logs = await getAllHabitLogs(email, habit.id);
            const todayStr = getTodayISTDateStr();

            const status = currentWeekDates.map((dateStr, idx) => {
                const istDate = getISTDate();


                if (dateStr === todayStr) setTodayIndex(idx);

                // 🔸 If weekday not in targetDays, grey
                if (!habit.targetDays.includes(daysLong[idx])) return "grey";

                // 🔸 Check if there's a log for this date
                const log = logs.find(log => log.date === dateStr);

                if (!log) return "red"; // target day but not completed

                return log.completed ? "green" : "red";
            });

            setWeekStatus(status);
        };

        fetchLogsAndSetStatus();
    }, [habit, email]);

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

            {habit.description && (
                <p className="habit-description">{habit.description}</p>
            )}

            <p><strong>Frequency:</strong> {habit.frequency}</p>

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
