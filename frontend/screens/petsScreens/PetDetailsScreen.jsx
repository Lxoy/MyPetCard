import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCheck, faCamera, faMars, faLeaf } from '@fortawesome/free-solid-svg-icons';

import { DatePickerField } from '../../components/newPetFormComponents/DatePickerField';
import TextInputField from '../../components/TextInputField.jsx';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import defaultImg from '../../img/default-pet.jpg';
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling';

import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


// tailwind
import "../../css/global.css";
import { useFocusEffect } from 'expo-router';

export default function PetDetailsScreen({ navigation }) {
    const route = useRoute();
    const { id } = route.params;

    const [name, setName] = useState(""); 
    const [color, setColor] = useState("");
    const [weight, setWeight] = useState("");
    const [microchipNumber, setMicrochipNumber] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [neutered, setNeutered] = useState();
    const [menuVisible, setMenuVisible] = useState(false);
    const [image, setImage] = useState(null);

    const [errorWeight, setErrorWeight] = useState("");

    const handleSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const data = {
                color,
                weight_kg: weight,
                microchip_number: microchipNumber,
                adoption_date: selectedDate ? selectedDate.toISOString().split('T')[0] : null,
                neutered: neutered,
            };
              
            const response = await axios.patch(`${BASE_URL_EMULATOR}/user/pets/${id}/add_details`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const petData = response.data.pet;
            setName(petData.name || "");
            setColor(petData.color || "");
            setWeight(petData.weight_kg?.toString() || "");
            setMicrochipNumber(petData.microchip_number || "");
            setSelectedDate(petData.adoption_date ? new Date(petData.adoption_date) : null);
            setNeutered(Boolean(petData.neutered));
    
            if (response.data.success_msg) {
                alert(response.data.success_msg);
                navigation.goBack();
            }
            
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Failed to add pet.");
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const handleWeightChange = (value) => {
        setWeight(value);
    
        const isValidFormat = /^[0-9]*\.?[0-9]*$/.test(value);
    
        if (
            value.length > 5 || 
            !isValidFormat ||
            parseFloat(value) > 999
        ) {
            setErrorWeight("Weight must be a number between 0 and 999 (use . for decimal)");
        } else {
            setErrorWeight(null);
        }
    };

    const data = [
        { id: '1', component: <TextInputField label="Color" placeholder="#000000" helper="Enter pet's HEX color" value={color} action={e => setColor(e)}  />},
        { id: '2', component: <TextInputField label="Weight" placeholder="Weight" helper="Enter pet's weight (kg)" size={5} value={weight} action={handleWeightChange} error={errorWeight} /> },
        { id: '3', component: <TextInputField label="Microchip Number" placeholder="Number" helper="Enter pet's microchip number" size={15} value={microchipNumber} action={e => setMicrochipNumber(e)}  /> },
        { id: '4', component: <DatePickerField label="Adoption Date" placeholder="Date" helper="Enter pet's adoption date" action={handleDateChange} value={selectedDate} /> },
    ];
    

    return (
        <View className="flex-1 bg-secondary">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
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
                            onPress={() => navigation.navigate("Pet", {id})}
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
                            <Text className="font-sfpro_regular text-2xl text-text">{name}</Text>
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

