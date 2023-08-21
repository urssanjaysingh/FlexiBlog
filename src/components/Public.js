import { Link } from 'react-router-dom';

const Welcome = () => {
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
                    <Link className='btn btn-link' to="/register">Sign Up</Link>
                    <Link className='btn btn-link' to="/login">Sign In</Link>
                    <Link className='btn btn-link' to="/blog">Explore Blog Posts</Link>
                </div>
            </footer>
        </section>
    );

    return content;
}

export default Welcome;
