import React, { useState, useEffect } from 'react';
import { View, FlatList, StatusBar, TouchableOpacity, Text, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCheck, faCamera, faMars, faLeaf } from '@fortawesome/free-solid-svg-icons';

import TextInputField from '../../components/TextInputField.jsx';
import { InputField } from '../../components/newPetFormComponents/InputField';
import { DropDownField } from '../../components/newPetFormComponents/DropDownField';
import { DatePickerField } from '../../components/newPetFormComponents/DatePickerField';
import { TouchField } from '../../components/newPetFormComponents/TouchField';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import defaultImg from '../../img/default-pet.jpg';
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling';

import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import petData from '../../data/pets.json';

// tailwind
import "../../css/global.css";

export default function NewPetScreen({ navigation }) {
    const [name, setName] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [gender, setGender] = useState("Male");
    const [menuVisible, setMenuVisible] = useState(false);
    const [image, setImage] = useState(null);

    const [errorName, setErrorName] = useState("");

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

    const handleNameChange = (value) => {
        setName(value);
        if (!value) {
            setErrorName('Name is required');
        } else if (value.length < 2) {
            setErrorName('Name must be at least 3 characters');
        } else {
            setErrorName('');
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const data = [
        { id: '1', component: <TextInputField
            label="Name"
            placeholder="Name"
            helper="Enter pet's name"
            value={name}
            size={30}
            action={handleNameChange}
            error={errorName}
          /> },
        { id: '2', component: <DropDownField label="Species" placeholder="Species" helper="Pick pet's species" selectedValue={selectedSpecies} setSelectedValue={setSelectedSpecies} items={speciesItems} /> },
        { id: '3', component: <DropDownField label="Breed" placeholder="Breed" helper="Pick pet's species" selectedValue={selectedBreed} setSelectedValue={setSelectedBreed} items={breedItems} disabled={!selectedSpecies} /> },
        { id: '4', component: <DatePickerField label="Birthday" placeholder="Date" helper="Enter pet's birthday" action={handleDateChange} value={selectedDate} /> },
        { id: '5', component: <TouchField label="Gender" value={gender} helper="Choose gender" action={setGender}/> }
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
                        <View className="mt-4 items-center">
                            <View className="relative">
                                <Image
                                    className="size-36 rounded-full shadow-black shadow-md"
                                    style={{
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 6,
                                        elevation: 5,
                                    }}
                                    source={image ? { uri: image } : defaultImg }
                                />
                                <TouchableOpacity
                                    className="absolute bottom-2 right-2 bg-accent p-2 rounded-full shadow-md"
                                    onPress={() => setMenuVisible(true)}
                                >
                                    <FontAwesomeIcon icon={faCamera} size={18} color="#003366" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        
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

