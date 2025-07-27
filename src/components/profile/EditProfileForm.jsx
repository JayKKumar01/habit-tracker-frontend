import React, { useState } from "react";
import "../../styles/EditProfileForm.css";
import { saveOrUpdateProfile } from "../../services/profileService";

const EditProfileForm = ({ user, onSubmit, onCancel }) => {
    const [name, setName] = useState(user.name || "");
    const [bio, setBio] = useState(user.bio || "");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await saveOrUpdateProfile(user.email, bio);
            onSubmit({ name, bio });
        } catch (err) {
            setError(err.message || "Failed to save changes.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="edit-profile-form">
            <form onSubmit={handleSave}>
                <h2>✏️ Edit Profile</h2>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bio">Bio</label>
                    <textarea
                        id="bio"
                        rows={4}
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Write something about yourself..."
                    />
                </div>

                {error && <p className="form-error">{error}</p>}

                <div className="form-actions">
                    <button type="button" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
