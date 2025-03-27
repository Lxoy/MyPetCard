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
    
        const hashedPassword = await bcrypt.hash(password, 12);

        const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashedPassword], (error, result) => {
            if (error) return res.status(500).json({ error_msg: "Error inserting user." });

            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        res.status(500).json({ error_msg: "Server error." });
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

            res.status(200).json({ message: "Login successful!", token });
        });
    } catch (err) {
        res.status(500).json({ error_msg: "Server error." });
    }
});

// server
app.listen(PORT, (request, response) => {
    console.log("Pokrenut na portu " + PORT);
});