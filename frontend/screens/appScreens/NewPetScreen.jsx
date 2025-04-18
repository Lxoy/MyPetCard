import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, StatusBar, TouchableOpacity, Text, Image, Button, Modal } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCheck, faCamera, faMars } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


import petData from '../../data/pets.json';

// tailwind
import "../../css/global.css";

export default function NewPetScreen({ navigation }) {
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    const [selectedBreed, setSelectedBreed] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [gender, setGender] = useState("Male");

    useEffect(() => {
        setSelectedBreed(null);
    }, [selectedSpecies]);

    const speciesItems = petData.map(species => ({
        label: species.species,
        value: species.species
      }));
    
      const breedItems = selectedSpecies ? petData.find(s => s.species === selectedSpecies)?.breeds.map(breed => ({
            label: breed,
            value: breed
        })) || []
        : [];

    const handleDateChange = (date) => {
        const formattedDate = date.toLocaleDateString('hr-HR');
        setSelectedDate(formattedDate);
    };

    // Popis podataka za FlatList
    const data = [
        { id: '1', component: <InputField label="Name" placeholder="Name" helper="Enter pet's name" size={30} /> },
        { id: '2', component: <DropDownField label="Species" placeholder="Species" helper="Pick pet's species" selectedValue={selectedSpecies} setSelectedValue={setSelectedSpecies} items={speciesItems} /> },
        { id: '3', component: <DropDownField label="Breed" placeholder="Breed" helper="Pick pet's species" selectedValue={selectedBreed} setSelectedValue={setSelectedBreed} items={breedItems} disabled={!selectedSpecies} /> },
        { id: '4', component: <DatePickerField label="Birthday" placeholder="Date" helper="Enter pet's birthday" action={handleDateChange} value={selectedDate} /> },
        { id: '5', component: <TouchField label="Gender" value={gender} helper="Choose gender" action={setGender}/> }
    ];

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
                            onPress={handleAddNewPet}
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
                                    source={require('../../img/default-pet.jpg')}
                                />
                                <TouchableOpacity
                                    className="absolute bottom-2 right-2 bg-accent p-2 rounded-full shadow-md"
                                >
                                    <FontAwesomeIcon icon={faCamera} size={18} color="#003366" />
                                </TouchableOpacity>
                            </View>
                        </View>

                    </>
                }
            />
        </View>
    );
}

const InputField = ({ label, placeholder, value, helper, size, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>{label}</Text>

            {/* Input */}
            <TextInput
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
                placeholder={placeholder}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={action}
                maxLength={size}
            />

            {/* Helper + Character Count */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
                {label !== 'Phone Number' && <Text className="text-xs text-darkgrey">/{size}</Text>}
            </View>
        </View>
    );
};

const DropDownField = ({ label, placeholder, selectedValue, setSelectedValue, helper, error, items = [] }) => {
    const [open, setOpen] = useState(false);
    const [internalItems, setInternalItems] = useState(items);

    useEffect(() => {
        setInternalItems(items);
    }, [items]);

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${open ? 'text-primary' : 'text-jetblack'}`}>
                {label}
            </Text>

            {/* DropDownPicker */}
            <DropDownPicker
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border 
        ${error ? 'border-error' : open ? 'border-primary' : 'border-lightgrey'}`}
                open={open}
                setOpen={setOpen}
                value={selectedValue}
                setValue={setSelectedValue}
                items={items}
                containerStyle={{
                    paddingBottom: open ? 200 : 0,
                }}
                placeholder={placeholder}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                style={{
                    borderColor: open ? '#4A90E2' : '#d1d1d1',
                    borderWidth: 1, 
                }}
                dropDownStyle={{
                    backgroundColor: '#fafafa',
                    borderColor: '#d1d1d1',
                    borderWidth: 1,
                    borderRadius: 10,
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />

            {/* Helper + Error */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
            </View>
        </View>
    );
};

const DatePickerField = ({ label, placeholder, value, helper, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        action(date);
        setOpen(false);
        setIsFocused(false);
    };

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>{label}</Text>

            {/* Input */}
            <TouchableOpacity
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
                onPress={() => { setOpen(true); setIsFocused(true); }}
            >
                <Text className={`${value ? 'text-gray-900' : 'text-darkgrey'}`}>
                    {value ? value : placeholder}
                </Text>

            </TouchableOpacity>
            <Modal visible={open} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-xl p-6">
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="date"
                        />
                        <Button title="Done" onPress={handleConfirm} />
                    </View>
                </View>
            </Modal>
            {/* Helper + Character Count */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
            </View>
        </View>
    );
};

const TouchField = ({ label, placeholder, value, helper, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleToggle = () => {
        const newGender = value === 'Male' ? 'Female' : 'Male';
        action(newGender);
        setIsFocused(true);
    };

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>
                {label}
            </Text>

            {/* Touchable Box */}
            <TouchableOpacity
                onPress={handleToggle}
                className={`w-full bg-white rounded-xl px-4 py-2 shadow-sm border justify-center ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
            >
                <Text className={`${value ? 'text-gray-900' : 'text-darkgrey'} text-base`}>
                    {value || placeholder}
                </Text>
            </TouchableOpacity>

            {/* Helper Text */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? (
                    <Text className="text-xs text-darkgrey">{helper}</Text>
                ) : (
                    <Text className="text-xs text-error">{error}</Text>
                )}
            </View>
        </View>
    );
};
