import { getPetNutritonById } from '../utils/dbAuthUtils.js';

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