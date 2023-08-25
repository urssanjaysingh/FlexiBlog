import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const postsAdapter = createEntityAdapter({});

const initialState = postsAdapter.getInitialState();

export const postApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/post/all',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                // Transform the response data into normalized format

                const transformedPosts = responseData.map((postData) => ({
                    id: postData._id,
                    ...postData
                }));

                // Use postsAdapter.setAll to add or update the posts in the Redux store
                return postsAdapter.setAll(initialState, transformedPosts);
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ];
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),
        getPostById: builder.query({
            query: (postId) => `/post/${postId}`, // Adjust the API endpoint URL
            transformResponse: (responseData) => ({
                id: responseData._id,
                ...responseData
            }),
        }),
        getPostsByUser: builder.query({
            query: (userId) => `/post/user/${userId}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError;
            },
            transformResponse: (responseData) => {
                // Transform the response data into normalized format
                const transformedPosts = responseData.map((postData) => ({
                    id: postData._id,
                    ...postData
                }));

                // Use postsAdapter.upsertMany to update or insert posts
                postsAdapter.upsertMany(initialState, transformedPosts);

                return transformedPosts;
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Post', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Post', id }))
                    ];
                } else return [{ type: 'Post', id: 'LIST' }];
            }
        }),
        createPost: builder.mutation({
            query: (postData) => ({
                url: '/post/create', // Adjust the API endpoint URL
                method: 'POST',
                body: postData,
            }),
            // Use transformResponse to transform the response data if needed
            // This example assumes the response contains the created post data
            transformResponse: (responseData) => ({
                id: responseData._id,
                ...responseData
            }),
            // Provide tags for invalidation
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
        updatePost: builder.mutation({
            query: ({ postId, postData }) => ({
                url: `/post/${postId}/update`, // Adjust the API endpoint URL
                method: 'PUT', // Use the appropriate HTTP method
                body: postData,
            }),
            transformResponse: (responseData) => ({
                id: responseData._id,
                ...responseData
            }),
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
        deletePost: builder.mutation({
            query: (postId) => ({
                url: `/post/${postId}/delete`, // Adjust the API endpoint URL
                method: 'DELETE',
            }),
            // No need for transformResponse in deletion
            // Provide tags for invalidation
            invalidatesTags: [{ type: 'Post', id: 'LIST' }],
        }),
    }),
});

export const {
    useGetPostsQuery,
    useGetPostByIdQuery,
    useGetPostsByUserQuery,
    useCreatePostMutation,
    useUpdatePostMutation,
    useDeletePostMutation,
} = postApiSlice;

// Returns the query result object
export const selectPostsResult = postApiSlice.endpoints.getPosts.select();

// Creates memoized selector
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data // normalized state object with ids & entities
);

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState);

// Export the selectPostsData selector too
export { selectPostsData };
