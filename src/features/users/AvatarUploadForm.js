import React, { useState, useRef } from 'react';
import { useUploadAvatarMutation } from './avatarApiSlice';

const AvatarUploadForm = ({ updateAvatar }) => {
    const [uploadAvatar] = useUploadAvatarMutation();
    const [selectedFile, setSelectedFile] = useState(null);

    // Create a ref for the file input element
    const fileInputRef = useRef(null);

    const resetFileInput = () => {
        // Reset the file input field to empty
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (selectedFile) {
            const formData = new FormData();
            formData.append('avatar', selectedFile);

            try {
                // Use the uploadAvatar mutation to upload the avatar
                const response = await uploadAvatar(formData);

                // Get the new avatar URL from the response
                const newAvatarUrl = response.data.user.profile.avatar;

                // Call the updateAvatar function to update the avatar
                updateAvatar(newAvatarUrl);

                // Reset the file input field
                resetFileInput();

                // Handle successful avatar upload (if needed)
                console.log('Avatar uploaded successfully.');
            } catch (error) {
                // Handle error
                console.error('Avatar upload failed:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="avatar-upload-form">
            <label htmlFor="avatar">Choose an Avatar Image:</label>
            <input
                type="file"
                id="avatar"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="avatar-input"
            />
            <button type="submit" className="btn btn-primary">
                Upload Avatar
            </button>
        </form>
    );
};

export default AvatarUploadForm;
