import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import AvatarUploadForm from './AvatarUploadForm';

const User = ({ user, avatarUrl, handleUpdateUser }) => {
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(user.name);
    const [editedBio, setEditedBio] = useState(user.bio);

    // Store the current avatar data in a state variable
    const [currentAvatar, setCurrentAvatar] = useState(avatarUrl);

    const updateAvatar = (newAvatarUrl) => {
        newAvatarUrl = `http://localhost:3500/avatars/${user.avatar}?timestamp=${Date.now()}`;
        setCurrentAvatar(newAvatarUrl);
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
        // Reset edited data to current user data
        setEditedName(user.name);
        setEditedBio(user.bio);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the edited data
        const formData = new FormData();
        formData.append('name', editedName);
        formData.append('bio', editedBio);

        // Append the current avatar data to the FormData
        formData.append('avatar', currentAvatar);

        // Call the handleUpdateUser function to update user data
        handleUpdateUser(user.id, {
            name: editedName,
            bio: editedBio
            // You can also include other updated fields here
        });

        // Exit edit mode after successful update
        setEditMode(false);
    };

    return (
        <section className="user-profile">
            <div className="user-profile__info">
                <h2 className="user-profile__username">{user.username}</h2>
                <p className="user-profile__email">{user.email}</p>
                {editMode ? (
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <input
                            type="text"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="user-profile__input"
                        />
                        <textarea
                            value={editedBio}
                            onChange={(e) => setEditedBio(e.target.value)}
                            className="user-profile__input"
                        />
                        <div>
                            <button type="submit" className="user-profile__button">Save Changes</button>
                            <button type="button" onClick={handleCancel} className="user-profile__button">Cancel</button>
                        </div>
                    </form>
                ) : (
                    <>
                        <div className="user-profile__container">
                            <div style={{ display: 'inline-block', marginRight: '10px' }}>
                                <p className="user-profile__name">Name: {user.name}</p>
                                <p className="user-profile__bio">Bio: {user.bio}</p>
                            </div>
                            <div style={{ display: 'inline-block' }}>
                                {!editMode && (
                                    <button
                                        className="icon-button user-profile__edit-button"
                                        onClick={handleEdit}
                                    >
                                        <FontAwesomeIcon icon={faPenToSquare} />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="user-profile__info">
                            {/* ... (other content) ... */}
                            <div className="user-profile__avatar">
                                <img src={currentAvatar} alt={`${user.username}'s avatar`} />
                                <AvatarUploadForm
                                    setCurrentAvatar={setCurrentAvatar}
                                    updateAvatar={updateAvatar}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default User;