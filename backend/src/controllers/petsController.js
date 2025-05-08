import { insertNewPet } from '../utils/dbUtils.js';
import { getPetsByOwnerId } from '../utils/dbUtils.js';
import { updatePetData } from '../utils/dbUtils.js';
import { getPetById } from '../utils/dbUtils.js';

export const addPetData = async (req, res) => {
    const { name, species, breed, gender, date_of_birth } = req.body;
    const ownerId = req.user.id; 
    const imageUrl = req.file ? `/uploads/pets/${req.file.filename}` : null;

    
    if (!name || !species || !breed || !gender || !date_of_birth == null) {
        return res.status(400).json({ error_msg: "You need to provide all information." });
    }
    
    try {
        const insertedPet = await insertNewPet(name, species, breed, gender, date_of_birth, ownerId, imageUrl);
    
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

export const updatePetDetails = async (req, res) => {
    const { color, weight_kg, microchip_number, adoption_date, neutered } = req.body;
    const ownerId = req.user.id; 
    const petId = req.params.id;

    console.log(req.body);
    
    try {
        const updatedFields = {};
        if (color !== undefined) updatedFields.color = color;
        if (weight_kg !== undefined) updatedFields.weight_kg = weight_kg;
        if (microchip_number !== undefined) updatedFields.microchip_number = microchip_number;
        if (adoption_date !== undefined) updatedFields.adoption_date = adoption_date;
        if (neutered !== undefined) updatedFields.neutered = neutered;

        if (Object.keys(updatedFields).length === 0) {
            return res.status(400).json({ error_msg: "No data provided to update." });
        }

        await updatePetData(ownerId, petId, updatedFields);

        const updatedPet = await getPetById(petId, ownerId);
        if (!updatedPet || updatedPet.length === 0) {
            return res.status(404).json({ error_msg: "Pet not found after update." });
        }
        res.status(200).json({
            success_msg: "Pet updated successfully!",
            pet: updatedPet
        });
    
    } catch (error) {
        console.error("Update pet error:", error);
        return res.status(500).json({ error_msg: "Server error while adding pet." });
    }
};

export const getPetsByOwner = async (req, res) => {
    const ownerId = req.user.id;

    try {
        const pets = await getPetsByOwnerId(ownerId);

        if (pets.length > 0) {
            return res.status(200).json({ pets });
        } else {
            return res.status(500).json({ error_msg: "No pets added." });
        }
    } catch (error) {
        console.error("Error fetching pets:", error);
        return res.status(500).json({ error_msg: "Server error while fetching pets." });
    }
};


export const getPetDetails = async (req, res) => {
    const petId = req.params.id;
    const ownerId = req.user.id;

    try {
        const pet = await getPetById(petId, ownerId);

        if (!pet) {
            return res.status(404).json({ error_msg: "Pet not found." });
        }

        return res.status(200).json({ pet });
    } catch (error) {
        console.error("Error fetching pet:", error);
        return res.status(500).json({ error_msg: "Server error while fetching pet." });
    }
};

