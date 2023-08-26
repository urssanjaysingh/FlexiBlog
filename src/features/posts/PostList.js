import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useGetPostsQuery, selectAllPosts } from './postApiSlice';
import PulseLoader from 'react-spinners/PulseLoader'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUserPlus, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const PostList = () => {
    const { data: postsData, isLoading, isError, error } = useGetPostsQuery();
    const normalizedPosts = useSelector(selectAllPosts);

    if (isLoading) return <PulseLoader color={"#FFF"} />

    if (isError) {
        if (error.status === 404) {
            return <div>Posts not found</div>;
        } else {
            return <div>Error: {error.message}</div>;
        }
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
                <div className="post-list">
                    {normalizedPosts.length === 0 ? (
                        <div>No posts found</div>
                    ) : (
                        normalizedPosts
                            .slice()
                            .reverse()
                            .map(post => (
                                <div className="post-card" key={post.id}>
                                    {post.image && post.image.filename && post.image.path && (
                                        <div className="post-image">
                                            <img src={`http://localhost:3500${post.image.path}`} alt={post.image.filename} />
                                        </div>
                                    )}
                                    <div className="post-meta">
                                        <span className="author">Author: {post.author && post.author.profile.name ? post.author.profile.name : 'Unknown'}</span><br />
                                        <span className="tags">Tags: {post.tags.join(', ')}</span><br />
                                        <span className="created-at">
                                            Created at: {new Date(post.createdAt).toLocaleDateString()}
                                        </span>&nbsp;&nbsp;
                                        <span className="updated-at">
                                            Updated at: {new Date(post.updatedAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="post-title">{post.title}</h3>
                                    <div className="post-content">
                                        <p style={{ marginBottom: "5px" }}>
                                            {post.content.length > 150
                                                ? `${post.content.substring(0, 150)}...`
                                                : post.content}
                                        </p>
                                        <button className="btn btn-link">
                                            <Link to={`/posts/${post.id}`}>
                                                Read More
                                            </Link>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                </div>
            </section>
        </>
    );
};

export default PostList;
