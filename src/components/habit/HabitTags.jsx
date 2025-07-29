import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import ConfirmModal from "../modals/ConfirmModal";
import InputModal from "../modals/InputModal";
// import { addHabitTag, removeHabitTag } from "../../services/tagService";

const themeTags = [
    "mindfulness",
    "productivity",
    "health",
    "focus",
    "discipline",
    "routine",
    "fitness",
    "gratitude",
    "balance",
    "consistency",
];

const HabitTags = ({ user, habit, onChange }) => {
    const [selectedTagIndex, setSelectedTagIndex] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isInputOpen, setIsInputOpen] = useState(false);

    const tags = Array.isArray(habit.tags) ? habit.tags : [];

    const handleTagClick = (index) => {
        setSelectedTagIndex(prev => (prev === index ? null : index));
    };

    const requestDeleteSelected = () => {
        if (selectedTagIndex !== null) setIsConfirmOpen(true);
    };

    const openAddModal = () => setIsInputOpen(true);

    const handleAddTagConfirm = async (newTagName) => {
        const tagName = (newTagName || "").trim().toLowerCase();
        if (!tagName) return "Tag cannot be empty.";
        if (tags.some(tag => tag.name.toLowerCase() === tagName)) return "This tag already exists.";
        if (tags.length >= 10) return "Maximum limit exceeded.";

        const newTag = { id: null, name: tagName, habitId: habit.id };
        const updated = [...tags, newTag];

        try {
            // const res = await addHabitTag(user.id, newTag);
            // console.log(res);
            onChange(updated);
        } catch (err) {
            console.error("Failed to update tags:", err);
            return "Failed to update tags.";
        }

        return "";
    };

    const handleDeleteSelected = async () => {
        if (selectedTagIndex === null) return;

        const tagToDelete = tags[selectedTagIndex];
        if (tagToDelete.name.toLowerCase() === habit.frequency.toLowerCase()) {
            return `Cannot delete tag "${tagToDelete.name}" because it matches the habit's frequency.`;
        }

        const updated = tags.slice(0, selectedTagIndex).concat(tags.slice(selectedTagIndex + 1));

        try {
            // const res = await removeHabitTag(user.id, tagToDelete);
            // console.log(res);
            onChange(updated);
            setSelectedTagIndex(null);
        } catch (err) {
            console.error("Failed to delete tag:", err);
            return "Failed to delete tag.";
        }
    };

    return (
        <div className="tags-section">
            <div className="tags-header">
                <p className="tags-label">Tags:</p>
                {selectedTagIndex === null ? (
                    <button className="tag-action-btn" onClick={openAddModal}>
                        <Plus size={16} />
                    </button>
                ) : (
                    <button className="tag-action-btn" onClick={requestDeleteSelected}>
                        <Trash2 size={16} />
                    </button>
                )}
            </div>

            <div className="habit-tags-scroll">
                <div className="habit-tags-inner">
                    {tags.map((tag, index) => (
                        <span
                            key={`${tag.id ?? "new"}-${tag.name}-${index}`}
                            className={`habit-tag ${selectedTagIndex === index ? "selected" : ""}`}
                            onClick={() => handleTagClick(index)}
                        >
              {tag.name}
            </span>
                    ))}
                </div>
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={handleDeleteSelected}
                message={
                    selectedTagIndex !== null
                        ? `Delete tag "${tags[selectedTagIndex].name}"?`
                        : "Delete selected tag?"
                }
            />

            <InputModal
                isOpen={isInputOpen}
                onClose={() => setIsInputOpen(false)}
                onConfirm={handleAddTagConfirm}
                title="Enter a new tag:"
                placeholder="e.g., productivity"
                suggestions={themeTags}
            />
        </div>
    );
};

export default HabitTags;
