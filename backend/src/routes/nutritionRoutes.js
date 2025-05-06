import { Router } from "express";

const router = Router();

// controller
import { getPetNutritionDetails } from '../controllers/nutritionController.js';
import { addPetNutritionData } from "../controllers/nutritionController.js";

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post("/user/pets/:id/add/nutrition", verifyToken, addPetNutritionData);
router.get("/user/pets/:id/nutrition", verifyToken, getPetNutritionDetails);

export default router;