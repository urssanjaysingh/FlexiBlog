import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignInAlt, faBookOpen } from '@fortawesome/free-solid-svg-icons';

const Public = () => {
    const content = (
        <section className="home">
            <header className='home__header'>
                <h1>Welcome to FlexiBlog!</h1>
            </header>
            <main className="home__main">
                <p>Explore a world of informative and captivating blog posts.</p>
                <p>Discover topics that interest you and stay updated with the latest content.</p>
            </main>
            <footer className="home__footer">
                <div className="footer-links">
                    <div className="button-container">
                        <Link className="btn btn-link" to="/register">
                            <FontAwesomeIcon icon={faUser} /> Sign Up
                        </Link>
                        <span className="space"></span>
                        <Link className="btn btn-link" to="/login">
                            <FontAwesomeIcon icon={faSignInAlt} /> Sign In
                        </Link>
                        <span className="space"></span>
                        <Link className="btn btn-link" to="/posts">
                            <FontAwesomeIcon icon={faBookOpen} /> Explore Blog Posts
                        </Link>
                    </div>
                </div>
            </footer>
        </section>
    );

    return content;
}

export default Public;
