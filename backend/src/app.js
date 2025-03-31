const express = require('express');
require('dotenv').config();
const cors = require('cors'); // samo zato da nam omoguci spajanje s frontendom jer mozda blokira firewall bez ovog
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Database
const db = require('./database');

// CONST
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Register
app.post("/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Provjera zauzetog emaila
        const checkEmailSql = "SELECT id FROM users WHERE email = ?";
        const emailResults = await new Promise((resolve, reject) => {
            db.query(checkEmailSql, [email], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });

        if (emailResults.length > 0) {
            return res.status(409).json({ error_msg: "Email already in use" });
        }

        // Provjera zauzetog korisničkog imena
        const checkUsernameSql = "SELECT id FROM users WHERE username = ?";
        const usernameResults = await new Promise((resolve, reject) => {
            db.query(checkUsernameSql, [username], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });

        if (usernameResults.length > 0) {
            return res.status(409).json({ error_msg: "Username already taken" });
        }

        // Hashiranje lozinke
        const hashedPassword = await bcrypt.hash(password, 12);

        // Kreiranje novog korisnika u bazi
        const createUserSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const createUserResult = await new Promise((resolve, reject) => {
            db.query(createUserSql, [username, email, hashedPassword], (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });

        // Dohvaćanje podataka novog korisnika
        const getUserSql = "SELECT id, username, email FROM users WHERE id = ?";
        const userData = await new Promise((resolve, reject) => {
            db.query(getUserSql, [createUserResult.insertId], (error, result) => {
                if (error) reject(error);
                resolve(result);
            });
        });

        // Provjera postoji li korisnik i generiranje tokena
        if (userData.length > 0) {
            const user = userData[0];

            // Generiraj JWT token
            const token = jwt.sign(
                { id: user.id, username: user.username, email: user.email },
                SECRET_KEY,
                { expiresIn: '30d' }
            );

            return res.status(201).json({
                message: "User registered successfully!",
                user: user,
                token: token
            });
        } else {
            return res.status(500).json({ error_msg: "Error retrieving user data after registration" });
        }
    } catch (err) {
        console.error("Registration error:", err);
        return res.status(500).json({ error_msg: "Internal server error" });
    }
});


// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], async (error, data) => {
            if (error) return res.status(500).json({ error_msg: "Database error." });

            if (data.length === 0) return res.status(404).json({ error_msg: "User not found." });

            const user = data[0];
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ error_msg: "Invalid password." });

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "30d" });

            res.status(200).json({ message: "Login successful!", token, user });
        });
    } catch (err) {
        res.status(500).json({ error_msg: "Server error." });
    }
});

// server
app.listen(PORT, (request, response) => {
    console.log("Pokrenut na portu " + PORT);
});