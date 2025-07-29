import React, { useState } from "react";
import "../../styles/ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    const [isProcessing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            setProcessing(true);
            setError("");
            const result = await onConfirm(); // Can return an error message
            if (typeof result === "string" && result.length > 0) {
                setError(result);
            } else {
                onClose(); // only close on success
            }
        } catch (err) {
            setError(err.message || "Something went wrong.");
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{message}</p>
                {error && <p className="modal-error">{error}</p>}
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
