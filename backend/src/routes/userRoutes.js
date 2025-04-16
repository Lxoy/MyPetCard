import { Router } from "express";

const router = Router();

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

// controller
import { updateUser } from '../controllers/userController.js';

router.patch("/user/edit", verifyToken, updateUser);

export default router;