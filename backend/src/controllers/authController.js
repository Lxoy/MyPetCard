import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// user validation
import { checkEmail, checkUsername, getUserById, insertNewUser, getUserByEmail, insertNewUserGoogleLogin } from '../utils/dbUtils.js';
import { generateUniqueUsername } from '../utils/usernameUtils.js';

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

const SECRET_KEY = process.env.SECRET_KEY;

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const emailResults = await checkEmail(email);
        if (emailResults.length > 0) {
            return res.status(409).json({ error_msg: "E-mail already in use." });
        }

        const usernameResults = await checkUsername(username);
        if (usernameResults.length > 0) {
            return res.status(409).json({ error_msg: "Username already taken." });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const createUserResult = await insertNewUser(username, email, hashedPassword);
        const userData = await getUserById(createUserResult.insertId);

        if (userData.length === 0) return res.status(404).json({ error_msg: "User not found after registration." });

        const user = userData[0];

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '30d' }
        );

        res.status(201).json({ message: "Register successful!", token, user });
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error_msg: "Internal server error" });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userData = await getUserByEmail(email);
        if (userData.length == 0) {
            return res.status(409).json({ error_msg: "User not found." });
        }
        
        const user = userData[0];
        
        if (user.provider !== 'local') {
            return res.status(403).json({ error_msg: "This account uses Google login. Use Google to sign in." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error_msg: "Invalid password." });

        const token = jwt.sign(
            { id: user.id, email: user.email },
            SECRET_KEY,
            { expiresIn: '30d' }
        );

        res.status(200).json({ message: "Login successful!", token, user });
    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ error_msg: "Server error." });
    }
}


export const loginWithGoogle = async (req, res) => {
    try {
        const { id_token } = req.body;

        console.log("Received id_token:", id_token);

        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: [
                process.env.GOOGLE_WEB_CLIENT_ID,
                process.env.GOOGLE_ANDROID_CLIENT_ID,
                process.env.GOOGLE_IOS_CLIENT_ID,
            ]
        });

        const { email, name, sub, given_name, family_name } = ticket.getPayload();

        const userData = await checkEmail(email);

        if (userData.length > 0) {
            const user = await getUserByEmail(email);
            const token = jwt.sign(
                { id: user[0].id, email: user[0].email },
                SECRET_KEY,
                { expiresIn: '30d' }
            );
            
            return res.status(200).json({ message: "Login successful!", token: token, user: user[0] });
        } else {
            const username = await generateUniqueUsername(name);

            await insertNewUserGoogleLogin(username, given_name, family_name, email, sub);

            const newUserData = await getUserByEmail(email);

            const token = jwt.sign(
                { id: newUserData[0].id, email: newUserData[0].email },
                SECRET_KEY,
                { expiresIn: '30d' }
            );

            return res.status(200).json({ message: "New user created and login successful!", token: token, user: newUserData[0] });
        }
    } catch (err) {
        console.error("Google login error:", err);
        res.status(500).json({ error_msg: "Internal server error" });
    }
};
