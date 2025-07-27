import React, { useState, useEffect } from "react";
import "../../styles/UserInfoCard.css";
import { Pencil } from "lucide-react";
import EditProfileForm from "./EditProfileForm";
import { getProfile } from "../../services/profileService";

const UserInfoCard = ({ user, setUserFromProfile }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState("Loading...");

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const profile = await getProfile(user.email);
                setBio(profile.bio?.trim() || "No bio set");
                setUserFromProfile((prev) => ({ ...prev, bio: profile.bio || "" }));
            } catch (err) {
                setBio("No bio set");
            }
        };

        if (!user.bio) {
            fetchBio();
        } else {
            setBio(user.bio.trim() || "No bio set");
        }
    }, [user.email, user.bio, setUserFromProfile]);

    const handleEditSubmit = async (updatedFields) => {
        setUserFromProfile((prevUser) => ({
            ...prevUser,
            ...updatedFields
        }));
        setBio(updatedFields.bio?.trim() || "No bio set");
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <EditProfileForm
                user={user}
                onSubmit={handleEditSubmit}
                onCancel={() => setIsEditing(false)}
            />
        );
    }

    return (
        <div className="user-info-card">
            <div className="user-info-inner">
                <div className="user-info-header">
                    <h2>👤 User Profile</h2>
                    <button className="edit-btn" onClick={() => setIsEditing(true)} title="Edit profile">
                        <Pencil size={20} color="#1976d2" strokeWidth={2.2} />
                    </button>
                </div>

                <div className="user-info-content">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p>
                        <strong>Bio:</strong>{" "}
                        {bio || <span className="no-bio">No bio set</span>}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default UserInfoCard;
