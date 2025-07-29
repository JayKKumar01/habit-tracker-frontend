import React, { useState } from "react";
import "../../styles/ConfirmModal.css"; // Reuses the same styles

const InputModal = ({
                        isOpen,
                        onClose,
                        onConfirm,
                        title = "Enter value:",
                        placeholder = "",
                        confirmText = "Confirm",
                        cancelText = "Cancel",
                        initialValue = "",
                    }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [isProcessing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            setProcessing(true);
            await onConfirm(inputValue);
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{title}</p>
                <input
                    type="text"
                    className="modal-input"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    disabled={isProcessing}
                />
                <div className="modal-actions">
                    <button
                        className="confirm-btn"
                        onClick={handleConfirm}
                        disabled={isProcessing || !inputValue.trim()}
                    >
                        {isProcessing ? "Processing..." : confirmText}
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        {cancelText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputModal;
