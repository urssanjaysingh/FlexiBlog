import React from 'react';
import { useParams } from 'react-router-dom';
import User from './User'; // Import the User component
import UserPostList from './UserPostList'; // Import the UserPostList component
import PulseLoader from 'react-spinners/PulseLoader';
import useTitle from '../../hooks/useTitle';

const AuthorPage = () => {
    useTitle('Author Page');
    const { userId } = useParams();

    return (
        <div className="author-page">
            <User userId={userId} editMode={false} /> {/* Pass editMode as false to disable editing */}
            {/* Render UserPostList with conditional PulseLoader */}
            <div className="user-post-list-container">
                <UserPostList userId={userId} editMode={false} />
                {UserPostList.isLoading && (
                    <div className="spinner-container">
                        <PulseLoader color={"#fff"} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthorPage;
