import React, { useState, useRef } from 'react';
import { useCreatePostMutation } from './postApiSlice';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Cookies from 'js-cookie';

const CreatePostForm = () => {
    useTitle('Create New Post');
    const userId = Cookies.get('userId');
    const [createPost] = useCreatePostMutation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const fileInputRef = useRef(null);

    const resetForm = () => {
        setTitle('');
        setContent('');
        setTags('');
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags);

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            // Call the createPost mutation with the postData
            const response = await createPost(formData).unwrap();

            // Handle successful post creation (if needed)
            console.log('Post created successfully:', response.message);

            // Reset the form
            resetForm();
            // Display success message to the user (you can use a state variable)
            setSuccessMessage('Post created successfully!');

            navigate(`/dash/post/user/${userId}`); // You can also provide a custom path here if needed

        } catch (error) {
            // Handle error
            console.error('Error creating post:', error);
        }
    };

    return (
        <div style={{ maxWidth: "100%" }} className="form-container">
            {successMessage && <div className="success-message">{successMessage}</div>}
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="create-post-form">
                <div className="create-form-group">
                    <input
                        placeholder='Post Title'
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        required
                        autoComplete='off'
                    />
                </div>
                <div className="create-form-group">
                    <textarea
                        placeholder='Content'
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="form-control"
                        rows="9"
                        required
                        autoComplete='off'
                        style={{
                            maxWidth: "100%",
                            maxHeight: 'none',
                            height: 'auto',
                            whiteSpace: 'pre-wrap', // This preserves line breaks and whitespace
                            wordWrap: 'break-word', // This ensures long words wrap correctly
                        }}
                    />
                </div>
                <div className="create-form-group">
                    <input
                        placeholder='Tags'
                        type="text"
                        id="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                        className="form-control"
                        autoComplete='off'
                    />
                </div>
                <div className="create-form-group">
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePostForm;
