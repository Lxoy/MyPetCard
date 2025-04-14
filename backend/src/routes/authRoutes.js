import { Router } from "express";

const router = Router();

// controller
import { register, login, loginWithGoogle } from "../controllers/authController.js";

router.post("/register", register);
router.post("/login", login);
router.post("/login/google", loginWithGoogle);


export default router;