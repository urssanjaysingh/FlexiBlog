import React from "react";

const Post = ({ post }) => {
    const { title, content, author, date } = post;

    return (
        <article className="post">
            <h2 className="post__title">{title}</h2>
            <p className="post__author">Author: {author}</p>
            <p className="post__date">Published on: {date}</p>
            <div className="post__content">{content}</div>
        </article>
    );
};

export default Post;
