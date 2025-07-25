import React, { useState } from "react";
import "../../styles/ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    const [isProcessing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            setProcessing(true);
            await onConfirm(); // Call the async handler from parent
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button
                        className="confirm-btn"
                        onClick={handleConfirm}
                        disabled={isProcessing}
                    >
                        {isProcessing ? "Processing..." : "Confirm"}
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={onClose}
                        disabled={isProcessing}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
