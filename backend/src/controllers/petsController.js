import { insertNewPet } from '../utils/dbAuthUtils.js';

export const addPetData = async (req, res) => {
    const { name, species, breed, gender, date_of_birth } = req.body;
    const ownerId = req.user.id; 
    const imageUrl = req.file ? `./uploads/pets/${req.file.filename}` : null;

    
    if (!name || !species || !breed || !gender || !date_of_birth == null) {
        return res.status(400).json({ error_msg: "You need to provide all information." });
    }
    
    try {
        const insertedPet = await insertNewPet(name, species, breed, gender, date_of_birth, ownerId);
    
        if (insertedPet.affectedRows > 0) {
            return res.status(201).json({ success_msg: "Pet added successfully!" });
        } else {
            return res.status(500).json({ error_msg: "Failed to add pet." });
        }
    } catch (error) {
        console.error("Insert pet error:", error);
        return res.status(500).json({ error_msg: "Server error while adding pet." });
    }
};