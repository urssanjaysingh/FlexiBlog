import { useGetPostsQuery } from "./postsApiSlice";
import Post from "./Post"; // Assuming you have a Post component

const PostsList = () => {
    const {
        data: posts,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPostsQuery();

    let content;

    if (isLoading) content = <p>Loading...</p>;

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>;
    }

    if (isSuccess) {
        content = (
            <div className="posts-list">
                {posts.map((post) => (
                    <Post key={post.id} post={post} />
                ))}
            </div>
        );
    }

    return content;
};

export default PostsList;
