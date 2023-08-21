import { apiSlice } from "../../app/api/apiSlice";

export const avatarApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        uploadAvatar: builder.mutation({
            query: (avatarData) => ({
                url: '/avatar/upload',
                method: 'POST',
                body: avatarData,
            }),
            invalidatesTags: ['User'],
        }),
    }),
});

export const { useUploadAvatarMutation } = avatarApiSlice;
