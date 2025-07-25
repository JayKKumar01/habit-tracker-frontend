import "../../styles/ConfirmModal.css";

const ConfirmModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p className="modal-message">{message}</p>
                <div className="modal-actions">
                    <button className="confirm-btn" onClick={onConfirm}>Confirm</button>
                    <button className="cancel-btn" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
