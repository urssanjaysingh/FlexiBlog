import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDeletePostMutation, useUpdatePostMutation } from './postApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle';

const UpdatePostForm = ({ postId, initialValues, onUpdateSuccess }) => {
    useTitle('Edit Post')
    const { userId } = useParams();

    const [deletePost, { isLoading }] = useDeletePostMutation();
    const navigate = useNavigate(); // Get the navigate function

    const handleDelete = async () => {
        try {
            await deletePost(postId);
            console.log('Post deleted successfully');
            // Navigate to the specified route after successful deletion
            navigate(`/dash/post/user/${userId}`);
            handleCancel();
        } catch (error) {
            // Handle error if deletion fails
            console.error('Error deleting post:', error);
        }
    };
    
    const [updatePost] = useUpdatePostMutation();
    const [title, setTitle] = useState(initialValues.title || '');
    const [content, setContent] = useState(initialValues.content || '');
    const [tags, setTags] = useState(initialValues.tags.join(', ') || '');
    const [selectedImage, setSelectedImage] = useState(initialValues.image ? initialValues.image.filename : '');

    const fileInputRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('tags', tags);

        if (selectedImage) {
            formData.append('image', selectedImage);
        }

        try {
            const response = await updatePost({ postId, postData: formData }).unwrap();
            // Handle successful post update (if needed)
            console.log('Post updated successfully:', response.message);

            if (response.post.image) {
                // Update selectedImage with the new image path from the response
                setSelectedImage(response.post.image.path);
            }

            // Call the callback function to notify the parent component
            onUpdateSuccess();
        } catch (error) {
            if (error.data) {
                // Handle error with response data (if available)
                console.error('Error updating post:', error.data.message);
            } else {
                // Handle error without response data
                console.error('Error updating post:', error);
            }
        }
    };

    const handleCancel = () => {
        setTitle(initialValues.title || '');
        setContent(initialValues.content || '');
        setTags(initialValues.tags.join(', ') || '');
        setSelectedImage(initialValues.image ? initialValues.image.filename : '');
        navigate(`/dash/post/user/${userId}`);
        // Call the handleSubmit function to submit the form with initial values
        handleSubmit(new Event('submit'));
    };

    return (
        <div style={{ maxWidth: "100%" }} className="form-container">
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
                        rows="8"
                        required
                        autoComplete='off'
                        style={{ maxHeight: 'none', height: 'auto' }}
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
                        accept="image/*"
                        onChange={(e) => {
                            const newImage = e.target.files[0];
                            if (newImage) {
                                setSelectedImage(newImage);
                            }
                        }}
                        id="image"
                        ref={fileInputRef}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Update Post
                </button>
                <span className="space"></span>
                <button
                    className='btn btn-link'
                    style={{
                        backgroundColor: "red",
                        borderColor: "red",
                        transition: "background-color 0.3s, border-color 0.3s", // Add a smooth transition
                    }}
                    onClick={handleDelete}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#d90000"; // Darker shade of red on hover
                        e.currentTarget.style.borderColor = "#d90000"; // Darker shade of red on hover
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "red"; // Restore original color on hover out
                        e.currentTarget.style.borderColor = "red"; // Restore original color on hover out
                    }}
                >
                    {isLoading ? <PulseLoader color={"#FFF"} /> : 'Delete'}
                </button>
                <span className="space"></span>
                <button
                    type="button"
                    className="btn btn-secondary"
                    style={{
                        color: "black",
                        backgroundColor: "white",
                        transition: "background-color 0.3s, color 0.3s", // Add a smooth transition
                    }}
                    onClick={handleCancel}
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
            </form>
        </div>
    );
};

export default UpdatePostForm;
