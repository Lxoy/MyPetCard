import express from 'express'; 
import path from 'path';

const app = express();

import cors from 'cors';
const PORT = process.env.PORT || 3000;

import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import petsRouter from './routes/petsRoutes.js';
import nutritionsRouter from './routes/nutritionRoutes.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads/pets', express.static(path.join(__dirname, '../uploads/pets')));

// Register
app.use(authRouter);

// User
app.use(userRouter);

// Pets 
app.use(petsRouter);

// Nutrition
app.use(nutritionsRouter);

app.listen(PORT, (request, response) => {
    console.log("Pokrenut na portu " + PORT);
});
