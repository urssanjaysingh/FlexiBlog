import React from 'react';
import User from './User';
import { useGetUsersQuery, useUpdateUserMutation } from "./userApiSlice";

const UserProfile = () => {
    const [updateUserMutation] = useUpdateUserMutation();

    const handleUpdateUser = async (userId, formData) => {
        try {
            const response = await updateUserMutation({
                id: userId,
                ...formData,
            });

            if (response.data) {
                // Handle successful update
            } else {
                // Handle error
            }
        } catch (error) {
            // Handle error
        }
    };

    const {
        data: userProfile,
        isLoading: isProfileLoading,
        isError: isProfileError,
        error: profileError
    } = useGetUsersQuery(null, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    });

    let content;

    if (isProfileLoading) {
        content = <p>Loading...</p>;
    } else if (isProfileError) {
        content = <p className="errmsg">{profileError?.data?.message}</p>;
    } else if (userProfile) {
        const { entities } = userProfile;
        const userId = userProfile.ids[0];
        const user = entities[userId];

        if (user) {
            const avatarUrl = `http://localhost:3500/avatars/${user.avatar}?timestamp=${Date.now()}`;

            content = (
                <User
                    user={user}
                    avatarUrl={avatarUrl}
                    handleUpdateUser={handleUpdateUser}
                />
            );
        }
    }

    return content;
}

export default UserProfile;
