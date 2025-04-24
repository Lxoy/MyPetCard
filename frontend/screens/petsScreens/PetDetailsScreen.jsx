import React, { useState, useEffect } from 'react';
import { View, FlatList, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCheck, faCamera, faMars, faLeaf } from '@fortawesome/free-solid-svg-icons';

import { InputField } from '../../components/newPetFormComponents/InputField';
import { DatePickerField } from '../../components/newPetFormComponents/DatePickerField';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import defaultImg from '../../img/default-pet.jpg';
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling';

import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import petData from '../../data/pets.json';

// tailwind
import "../../css/global.css";

export default function PetDetailsScreen({ navigation }) {
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [weight, setWeight] = useState("");
    const [microchipNumber, setMicrochipNumber] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [gender, setGender] = useState("Male");
    const [menuVisible, setMenuVisible] = useState(false);
    const [image, setImage] = useState(null);

    const speciesItems = petData.map(species => ({
        label: species.species,
        value: species.species
    }));

    useEffect(() => {
        setSelectedBreed(null);
    }, [selectedSpecies]);
    
    const breedItems = selectedSpecies ? petData.find(s => s.species === selectedSpecies)?.breeds.map(breed => ({
        label: breed,
        value: breed
    })) || [] : [];

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const data = [
        { id: '1', component: <InputField label="Color" placeholder="#000000" helper="Enter pet's HEX color" value={color} action={e => setColor(e)}  />},
        { id: '2', component: <InputField label="Weight" placeholder="Weight" helper="Enter pet's weight" size={30} value={weight} action={e => setWeight(e)}  /> },
        { id: '3', component: <InputField label="Microchip Number" placeholder="#" helper="Enter pet's microchip number" size={15} value={microchipNumber} action={e => setMicrochipNumber(e)}  /> },
        { id: '4', component: <DatePickerField label="Adoption Date" placeholder="Date" helper="Enter pet's adoption date" action={handleDateChange} value={selectedDate} /> },
    ];

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const formData = new FormData();
    
            formData.append('name', name.trim());
            formData.append('species', selectedSpecies);
            formData.append('breed', selectedBreed);
            formData.append('gender', gender);
            formData.append('date_of_birth', selectedDate.toISOString().split('T')[0]);
    
            if (image) {
                const uriParts = image.split('.');
                const fileType = uriParts[uriParts.length - 1];
    
                formData.append('image', {
                    uri: image,
                    type: `image/${fileType}`,
                    name: `photo.${fileType}`,
                });
            }
    
            const response = await axios.post(`${BASE_URL_EMULATOR}/user/pets/add`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
    
            if (response.data.success_msg) {
                alert(response.data.success_msg);
                navigation.goBack();
            }
            
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to add pet.");
        }
    };
    
    

    return (
        <View className="flex-1 bg-secondary">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => item.component}
                contentContainerStyle={{ flexGrow: 1 }}
                ListHeaderComponent={
                    <>
                        {/* Back Button */}
                        <TouchableOpacity
                            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size={18} color="#4A90E2" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                            onPress={handleSubmit}
                        >
                            <FontAwesomeIcon icon={faCheck} size={18} color="#4A90E2" />
                        </TouchableOpacity>

                        {/* Title */}
                        <View className="mt-4 items-center">
                            <Text className="font-sfpro_regular text-2xl text-text">New Pet</Text>
                        </View>
                        <View className="mt-2"/>
                        <ChooseMenu
                            visible={menuVisible}
                            onClose={() => setMenuVisible(false)}
                            onCamera={() => handleCamera(setImage, setMenuVisible)}
                            onGallery={() => handleGallery(setImage, setMenuVisible)}
                            onRemove={() => handleRemove(setImage, setMenuVisible)} />
                    </>                
                }
            />
        </View>
    );
}

