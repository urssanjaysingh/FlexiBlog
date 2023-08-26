import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetPostByIdQuery } from './postApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const PostPage = () => {
    useTitle('Post Page')
    const { postId } = useParams();
    const { data: post, isLoading, isError, error } = useGetPostByIdQuery(postId);

    if (isLoading) return <PulseLoader color={"#FFF"} />

    if (isError) {
        return <div>Error: {error.message}</div>;
    }

    const formatContent = (content) => {
        return { __html: content.replace(/\n/g, '<br>') };
    }

    return (
        <>
            <header className="dash-header">
                <div className="dash-header__container">
                    <Link to="/"><h1 className="dash-header__title">FlexiBlog</h1></Link>

                    <nav className="dash-header__nav">
                        <Link to="/" className="btn btn-link">
                            <FontAwesomeIcon icon={faHome} /> Home
                        </Link>

                        <Link to="/register" className="btn btn-link">
                            <FontAwesomeIcon icon={faUserPlus} /> Sign Up
                        </Link>

                        <Link to="/login" className="btn btn-link">
                            <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                        </Link>
                    </nav>

                </div>
            </header>
            <section className="public">
                <div className='post-page-container'>
                    <div className="post-page">
                        <div className="post-page-meta">
                            <span className="created-at">
                                Created at: {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="tags">Tags: {post.tags.join(', ')}</span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="author">Author: {post.author && post.author.profile.name ? post.author.profile.name : 'Unknown'}</span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="space"></span>
                            <span className="updated-at">
                                Updated at: {new Date(post.updatedAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="post-page-title">{post.title}</h1>
                        {post.image && post.image.filename && post.image.path && (
                            <div className="post-page-image">
                                <img src={`https://flexiblog-api.onrender.com${post.image.path}`} alt={post.image.filename} />
                            </div>
                        )}
                        <div className="post-page-content">
                            <div dangerouslySetInnerHTML={formatContent(post.content)} />
                        </div>
                    </div>
                    <br />
                    <Link to={`/posts`} className="btn btn-link">Back</Link>
                </div>
            </section>
        </>
    );
};

export default PostPage;
