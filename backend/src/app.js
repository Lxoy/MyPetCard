import express from 'express'; // Corrected import

const app = express();

import cors from 'cors';
const PORT = process.env.PORT || 3000;

import authRouter from './routes/authRoutes.js';

// Middleware
app.use(cors());
app.use(express.json());

// Register
app.use(authRouter);

app.listen(PORT, (request, response) => {
    console.log("Pokrenut na portu " + PORT);
});
