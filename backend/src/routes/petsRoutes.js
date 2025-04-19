import { Router } from "express";

const router = Router();

// controller
import { addPetData, getPetsByOwner } from '../controllers/petsController.js';

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post("/user/pets/add", verifyToken, addPetData);
router.get("/user/pets", verifyToken, getPetsByOwner);

export default router;