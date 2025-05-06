import { Router } from "express";

const router = Router();

// controller
import { getPetNutritionDetails } from '../controllers/nutritionController.js';

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

router.get("/user/pets/:id/nutrition", verifyToken, getPetNutritionDetails);

export default router;