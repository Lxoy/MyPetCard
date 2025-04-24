import { Router } from "express";
import { upload } from '../middlewares/multerMiddleware.js'; 

const router = Router();

// controller
import { addPetData, getPetsByOwner, getPetDetails } from '../controllers/petsController.js';

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post("/user/pets/add", verifyToken, upload.single('image'), addPetData);
router.get("/user/pets", verifyToken, getPetsByOwner);
router.get("/user/pets/:id", verifyToken, getPetDetails);


export default router;