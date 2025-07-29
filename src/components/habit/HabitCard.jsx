import React, { useEffect, useState } from "react";
import "../../styles/HabitCard.css";
import { deleteHabit, updateHabit } from "../../services/habitService";
import { getCurrentWeekDates, getLocalDateStr } from "../../utils/dateUtils";
import { Trash2, Pencil, Plus } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";
import { updateHabitInList, deleteHabitInList } from "../state/habitState";
import EditHabitForm from "./EditHabitForm";

const daysShort = ["M", "T", "W", "T", "F", "S", "S"];
const daysLong = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY", "SUNDAY"
];

const HabitCard = ({ habit, user, setHabitsFromHabitCard }) => {
    const localDateStr = getLocalDateStr();
    const [isModalOpen, setModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [weekStatus, setWeekStatus] = useState([]);
    const [todayIndex, setTodayIndex] = useState(null);
    const [streak, setStreak] = useState(0);
    const [tags, setTags] = useState([]);
    const [selectedTagIndex, setSelectedTagIndex] = useState(null);

    useEffect(() => {
        const updateCardData = async () => {
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

            const defaultTags = ["daily", "focus", "mindset", "routine", "discipline", "wellness"];
            if (Array.isArray(habit.tags) && habit.tags.length > 0) {
                setTags(habit.tags.map(tag => tag.toLowerCase()));
            } else {
                setTags(defaultTags);
            }
        };

        updateCardData();
    }, [habit, user.id]);

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

    const handleDelete = async () => {
        try {
            const res = await deleteHabit(user.id, habit.id);
            setHabitsFromHabitCard(prev => deleteHabitInList(prev, habit.id));
            console.log(res);
            setModalOpen(false);
        } catch (error) {
            alert("Failed to delete habit: " + error.message);
        }
    };

    const handleEditSubmit = async (updates) => {
        const updatedHabitData = {
            habitId: habit.id,
            title: updates.title,
            description: updates.description,
            endDate: updates.endDate
        };

        const res = await updateHabit(updatedHabitData, user.id);
        console.log(res);
        setHabitsFromHabitCard(prev => updateHabitInList(prev, habit.id, updates));
        setIsEditing(false);
    };

    const handleAddTagClick = () => {
        // TODO: implement add tag flow
        console.log("Add tag");
    };

    const handleDeleteTagClick = () => {
        if (selectedTagIndex !== null) {
            const updatedTags = [...tags];
            updatedTags.splice(selectedTagIndex, 1);
            setTags(updatedTags);
            setSelectedTagIndex(null);
        }
    };

    const handleTagClick = (index) => {
        if (selectedTagIndex === index) {
            setSelectedTagIndex(null); // Deselect if same tag tapped
        } else {
            setSelectedTagIndex(index);
        }
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

            <div className="tags-section">
                <div className="tags-header">
                    <p className="tags-label">Tags:</p>
                    {selectedTagIndex === null ? (
                        <button className="tag-action-btn" onClick={handleAddTagClick}>
                            <Plus size={16} />
                        </button>
                    ) : (
                        <button className="tag-action-btn" onClick={handleDeleteTagClick}>
                            <Trash2 size={16} />
                        </button>
                    )}
                </div>

                <div className="habit-tags-scroll">
                    <div className="habit-tags-inner">
                        {tags.map((tag, index) => (
                            <span
                                key={index}
                                className={`habit-tag ${selectedTagIndex === index ? "selected" : ""}`}
                                onClick={() => handleTagClick(index)}
                            >
                {tag}
              </span>
                        ))}
                    </div>
                </div>
            </div>

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
                onConfirm={handleDelete}
                message="Delete this habit?"
            />
        </div>
    );
};

export default HabitCard;
