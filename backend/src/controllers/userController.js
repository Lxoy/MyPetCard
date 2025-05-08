import { checkUsername, getUserById, updateUserInfo } from '../utils/dbUtils.js';

export const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, first_name, last_name, phone_number } = req.body;

        const userData = await getUserById(userId);
        if (userData.length === 0) {
            return res.status(404).json({ error_msg: "User not found." });
        }

        const user = userData[0];

        if (username && username !== user.username) {
            const existingUsername = await checkUsername(username);
            if (existingUsername.length > 0) {
                return res.status(409).json({ error_msg: "Username already in use." });
            }
        }

        const updatedFields = {};
        if (username !== undefined) updatedFields.username = username;
        if (first_name !== undefined) updatedFields.first_name = first_name;
        if (last_name !== undefined) updatedFields.last_name = last_name;
        if (phone_number !== undefined) updatedFields.phone_number = phone_number;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error_msg: "No data provided to update." });
        }

        await updateUserInfo(userId, updatedFields);

        const updatedUser = await getUserById(userId);
        res.status(200).json({ message: "User updated successfully!", user: updatedUser[0] });

    } catch (err) {
        console.error("Update user error:", err);
        res.status(500).json({ error_msg: "Internal server error" });
    }
};