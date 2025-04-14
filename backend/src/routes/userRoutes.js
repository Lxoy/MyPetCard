import { Router } from "express";

const router = Router();

// controller
import { editData } from '../controllers/editDataController.js';

router.patch("/edit", editData);

export default router;