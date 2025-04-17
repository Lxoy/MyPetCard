import { Router } from "express";

const router = Router();

// controller
import { addPetData } from '../controllers/petsController.js';

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';


router.post("/user/pets/add", verifyToken, addPetData);

export default router;