import { Router } from "express";

const router = Router();

// controller
import { getPaymentSheet } from "../controllers/paymentController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

router.post("/user/subscription/", verifyToken, getPaymentSheet);


export default router;