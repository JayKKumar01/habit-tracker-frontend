import React, { useState } from "react";
import "../../styles/EditProfileForm.css";

const EditProfileForm = ({ user, onSubmit, onCancel, loading, error }) => {
    const [name, setName] = useState(user.name || "");
    const [bio, setBio] = useState(user.bio || "");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, bio });
    };

    return (
        <div className="edit-profile-form">
            <form onSubmit={handleSubmit}>
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
                    <button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save"}
                    </button>
                    <button type="button" onClick={onCancel} disabled={loading}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditProfileForm;
