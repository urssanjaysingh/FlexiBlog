import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import useTitle from '../../hooks/useTitle';
import { useUpdateUserMutation } from './userApiSlice';
import { useNavigate } from 'react-router-dom';

const User = ({ user, avatar }) => {
    useTitle('Your Profile');

    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [editedName, setEditedName] = useState(user.profile.name);
    const [editedBio, setEditedBio] = useState(user.profile.bio);
    const [selectedImage, setSelectedImage] = useState(avatar);
    const [imageRefreshKey, setImageRefreshKey] = useState(Date.now());
    const [updateUser] = useUpdateUserMutation();

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', editedName);
            formData.append('bio', editedBio);

            if (selectedImage) {
                formData.append('avatar', selectedImage);
            }

            const response = await updateUser({ userData: formData });

            if (response.data.user.profile.avatar) {
                setSelectedImage((response.data.user.profile.avatar));

                // Update the key to force a refresh of the image
                setImageRefreshKey(Date.now());
            } else {
                console.error('Avatar update failed. Response structure does not match expectations.');
            }

            setEditMode(false);
        } catch (error) {
            console.error('Profile update failed:', error);
        }
    };

    return (
        <section className="user-profile">
            <div className="user-profile__info">
                <h2 className="user-profile__username">{user.username}</h2>
                <p className="user-profile__email">{user.email}</p>
                {editMode ? (
                    <div className="form-container">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <input
                                    placeholder='Full Name'
                                    type="text"
                                    value={editedName}
                                    onChange={(e) => setEditedName(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <textarea
                                    placeholder='Write your bio'
                                    value={editedBio}
                                    onChange={(e) => setEditedBio(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="avatar">Choose an Avatar Image:</label>
                                <input
                                    type="file"
                                    id="avatar"  // Make sure this matches the key in FormData
                                    accept="image/*"
                                    onChange={(e) => {
                                        const newImage = e.target.files[0];
                                        if (newImage) {
                                            setSelectedImage(newImage);
                                        }
                                    }}
                                    className="avatar-input"
                                />
                            </div>
                            <div className="button-container">
                                <button type="submit" className="btn btn-primary">Save Changes</button>
                                <span className="space"></span>
                                <button
                                    className="btn btn-secondary"
                                    style={{
                                        color: "black",
                                        backgroundColor: "white",
                                        transition: "background-color 0.3s, color 0.3s", // Add a smooth transition
                                    }}
                                    onClick={() => navigate("/dash/users")}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.backgroundColor = "#ccc"; // Change background to black on hover
                                        e.currentTarget.style.color = "white"; // Change text color to white on hover
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.backgroundColor = "white"; // Restore original background color on hover out
                                        e.currentTarget.style.color = "black"; // Restore original text color on hover out
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                        <>
                            <div className="user-profile__info">
                                <div className="user-profile__avatar">
                                    <br />
                                    <img
                                        key={imageRefreshKey} // Use the key to force image refresh
                                        src={`https://flexiblog-api.onrender.com/avatars/${selectedImage}?refreshKey=${imageRefreshKey}`} // Append a query parameter
                                        alt=''
                                    />
                                </div>
                            </div>
                        <div className="user-profile__container">
                            <div style={{ display: 'inline-block', marginRight: '10px' }}>
                                <p className="user-profile__name">Name: {user.profile.name}</p>
                                <p className="user-profile__bio">Bio: {user.profile.bio}</p>
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
                    </>
                )}
            </div>
        </section >
    );
};

export default User;
