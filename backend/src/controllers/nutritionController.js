import { getPetNutritonById } from '../utils/dbAuthUtils.js';
import { insertNewPetNutrition } from '../utils/dbAuthUtils.js';

export const getPetNutritionDetails = async (req, res) => {
    const petId = req.params.id;

    try {
        const pet_nutrition = await getPetNutritonById(petId);

        if (!pet_nutrition) {
            return res.status(404).json({ error_msg: "No data." });
        }

        return res.status(200).json({ pet_nutrition });
    } catch (error) {
        console.error("Error fetching pet nutrition:", error);
        return res.status(500).json({ error_msg: "Server error while fetching pet nutriton." });
    }
};

export const addPetNutritionData = async (req, res) => {
    const pet_id = req.params.id;
    const { nutrition_name, nutrition_value } = req.body;

    if (!pet_id || !nutrition_name || !nutrition_value == null) {
        return res.status(400).json({ error_msg: "You need to provide all information." });
    }
    
    try {
        const insertedNutrition = await insertNewPetNutrition(nutrition_name, nutrition_value, pet_id);
    
        if (insertedNutrition.affectedRows > 0) {
            return res.status(201).json({ success_msg: "Pet nutrition added successfully!" });
        } else {
            return res.status(500).json({ error_msg: "Failed to add pet nutrition." });
        }
    } catch (error) {
        console.error("Insert pet error:", error);
        return res.status(500).json({ error_msg: "Server error while adding pet nutrition." });
    }
};