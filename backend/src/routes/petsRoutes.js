import { Router } from "express";
import { upload } from '../middlewares/multerMiddleware.js'; 

const router = Router();

// controller
import { addPetData, getPetsByOwner, getPetDetails, updatePetDetails } from '../controllers/petsController.js';

// middleware
import { verifyToken } from '../middlewares/authMiddleware.js';

router.post("/user/pets/add", verifyToken, upload.single('image'), addPetData);
router.get("/user/pets", verifyToken, getPetsByOwner);
router.get("/user/pets/:id", verifyToken, getPetDetails);
router.patch("/user/pets/:id/add_details", verifyToken, updatePetDetails);


export default router;