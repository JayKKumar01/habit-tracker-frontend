import React, { useEffect, useState } from "react";
import "../../styles/HabitCard.css";
import { deleteHabit, updateHabit } from "../../services/habitService";
import { getCurrentWeekDates, getLocalDateStr } from "../../utils/dateUtils";
import { Trash2, Pencil, Plus } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";
import InputModal from "../modals/InputModal";
import { updateHabitInList, deleteHabitInList } from "../state/habitState";
import EditHabitForm from "./EditHabitForm";
import {updateHabitTag} from "../../services/habitTagService";

const daysShort = ["M", "T", "W", "T", "F", "S", "S"];
const daysLong = [
    "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY", "SUNDAY"
];
const defaultTags = ["daily", "weekly", "focus", "mindset", "routine", "discipline", "wellness"];
const themeTags = [
    "mindfulness", "productivity", "health", "focus", "discipline",
    "routine", "fitness", "gratitude", "balance", "consistency"
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
    const [deleteMode, setDeleteMode] = useState("habit");
    const [inputModalOpen, setInputModalOpen] = useState(false);

    useEffect(() => {
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
                status.push(log?.completed ? "green" : "red");
            }
        });

        setWeekStatus(status);
        setTodayIndex(todayIdx);

        // ✅ Set default tags if needed and sync with parent state
        let normalizedTags;
        if (!Array.isArray(habit.tags) || habit.tags.length === 0) {
            normalizedTags = defaultTags;
            habit.tags = defaultTags;
            setHabitsFromHabitCard(prev =>
                updateHabitInList(prev, habit.id, { tags: defaultTags })
            );
        } else {
            normalizedTags = habit.tags.map(tag => tag.toLowerCase());
        }

        setTags(normalizedTags);
    }, [habit, user.id, localDateStr]);


    useEffect(() => {
        if (todayIndex === null || weekStatus.length === 0) return;

        let count = 0;
        for (let i = todayIndex; i >= 0; i--) {
            if (!habit.targetDays.includes(daysLong[i])) continue;
            if (weekStatus[i] !== "green") break;
            count++;
        }
        setStreak(count);
    }, [habit, todayIndex, weekStatus]);

    const handleDelete = async () => {
        if (deleteMode === "habit") {
            try {
                const res = await deleteHabit(user.id, habit.id);
                setHabitsFromHabitCard(prev => deleteHabitInList(prev, habit.id));
                console.log(res);
            } catch (error) {
                return "Failed to delete habit: " + error.message;
            }
        } else if (deleteMode === "tag" && selectedTagIndex !== null) {
        const tagToDelete = tags[selectedTagIndex];
        if (tagToDelete.toLowerCase() === habit.frequency.toLowerCase()) {
            return `Cannot delete tag "${tagToDelete}" because it matches the habit's frequency.`;
        }

        const updated = [...tags];
        updated.splice(selectedTagIndex, 1);
        setTags(updated);
        setSelectedTagIndex(null);
        habit.tags = updated;

        try {
            const res = await updateHabitTag(user.id,{ habitId: habit.id, tags: updated });
            console.log(res);
            setHabitsFromHabitCard(prev => updateHabitInList(prev, habit.id, { tags: updated }));
        } catch (err) {
            console.error("Failed to update tags:", err);
        }
    }

};

    const handleEditSubmit = async (updates) => {
        const updatedData = {
            habitId: habit.id,
            title: updates.title,
            description: updates.description,
            endDate: updates.endDate
        };

        const res = await updateHabit(updatedData, user.id);
        console.log(res);
        setHabitsFromHabitCard(prev => updateHabitInList(prev, habit.id, updates));
        setIsEditing(false);
    };

    const handleTagClick = (index) => {
        setSelectedTagIndex(prev => (prev === index ? null : index));
    };

    const handleAddTagClick = () => {
        setInputModalOpen(true);
    };

    const handleDeleteTagRequest = () => {
        if (selectedTagIndex !== null) {
            setDeleteMode("tag");
            setModalOpen(true);
        }
    };

    const handleAddTagConfirm = async (newTag) => {
        const tag = newTag.trim().toLowerCase();
        if (!tag) return "Tag cannot be empty.";
        if (tags.includes(tag)) return "This tag already exists.";
        if (tags.length >= 10) return "Maximum limit exceeded.";

        const updated = [...tags, tag];
        setTags(updated);
        habit.tags = updated;

        try {
            const res = await updateHabitTag(user.id,{ habitId: habit.id, tags: updated });
            console.log(res);
            setHabitsFromHabitCard(prev => updateHabitInList(prev, habit.id, { tags: updated }));
        } catch (err) {
            console.error("Failed to update tags:", err);
            return "Failed to update tags.";
        }

        return "";
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

            <button
                className="delete-btn"
                onClick={() => {
                    setDeleteMode("habit");
                    setModalOpen(true);
                }}
            >
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
                        <button className="tag-action-btn" onClick={handleDeleteTagRequest}>
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
                message={
                    deleteMode === "habit"
                        ? `Delete habit "${habit.title}"?`
                        : selectedTagIndex !== null
                            ? `Delete tag "${tags[selectedTagIndex]}"?`
                            : "Delete selected tag?"
                }
            />

            <InputModal
                isOpen={inputModalOpen}
                onClose={() => setInputModalOpen(false)}
                onConfirm={handleAddTagConfirm}
                title="Enter a new tag:"
                placeholder="e.g., productivity"
                suggestions={themeTags}
            />
        </div>
    );
};

export default HabitCard;
