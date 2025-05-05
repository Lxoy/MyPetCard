import React, { useState, useCallback } from 'react';
import { View, StatusBar, TouchableOpacity, Text, Image, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCakeCandles, faCamera, faGear, faMarsAndVenus, faDna, faCircle, faDroplet, faWeightScale, faAngleRight, faEraser, faBowlFood, faFile, faSyringe, faDisease, faFileCirclePlus, faNoteSticky, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { useFocusEffect } from '@react-navigation/native';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import defaultImg from '../../img/default-pet.jpg';
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling';

import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

// tailwind
import "../../css/global.css";
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

export default function PetScreen({ navigation }) {
    const route = useRoute();

    const { id } = route.params;
    
    const [menuVisible, setMenuVisible] = useState(false);
    const [image, setImage] = useState();
    const [pet, setPet] = useState([]);

    const fetchPet = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const res = await axios.get(`${BASE_URL_EMULATOR}/user/pets/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            setPet(res.data.pet);
            setImage(res.data.pet.photo_url)
        } catch (err) {
            console.error("Failed to fetch pet:", err);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPet();
        }, [id])
    );


    return (
        <View className="flex-1 bg-secondary">
            <StatusBar barStyle="light-content" backgroundColor="black" />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Back Button */}
                <TouchableOpacity
                    className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                    onPress={() => navigation.navigate("MyPetsMain")}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
                </TouchableOpacity>

                {/* Title */}
                <View className="mt-6 items-center">
                    <Text className="font-sfpro_regular text-2xl text-text">{pet.name}</Text>
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
                            source={image ? { uri: BASE_URL_EMULATOR + image } : defaultImg}
                        />
                        <TouchableOpacity
                            className="absolute bottom-2 right-2 bg-accent p-2 rounded-full shadow-md"
                        >
                            <FontAwesomeIcon icon={faCamera} size={18} color="#003366" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View className="mx-4 mt-4 p-4 bg-white rounded-3xl shadow-md">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-lg font-sfpro_semibold text-jetblack">General Information</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('PetDetails', { id: id })}>
                            <FontAwesomeIcon icon={faGear} size={20} color="#2C2C2E" />
                        </TouchableOpacity>

                    </View>

                    <View className="border-b border-gray-200 mb-2" />

                    {/* Breed */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faDna} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Breed</Text>
                        </View>
                        <Text className="text-base font-sfpro_regular text-text">{pet.breed}</Text>
                    </View>

                    {/* Gender */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faMarsAndVenus} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Gender</Text>
                        </View>
                        <Text className={`text-base font-sfpro_regular ${pet.gender === 'Male' ? 'text-[#4A90E2]' : 'text-[#FF69B4]'}`}>
                            {pet.gender}
                        </Text>


                    </View>

                    {/* Date of Birth */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faCakeCandles} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Date of Birth</Text>
                        </View>
                        <Text className="text-base font-sfpro_regular text-text">{pet.date_of_birth ? new Date(pet.date_of_birth).toLocaleDateString('hr-HR') : "/"}</Text>
                    </View>

                    {/* Color */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faDroplet} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Color</Text>
                        </View>
                        <FontAwesomeIcon icon={faCircle} size={24} color={pet.color || "#D3D3D3"} />
                    </View>

                    {/* Weight */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faWeightScale} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Weight</Text>
                        </View>
                        <Text className="text-base font-sfpro_regular text-text">{pet.weight_kg ? pet.weight_kg + ' kg' : "-"}</Text>
                    </View>

                    {/* Weight */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faMicrochip} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Microchip Number</Text>
                        </View>
                        <Text className="text-base font-sfpro_regular text-text">{pet.microchip_number || "-"}</Text>
                    </View>

                    {/* Adoption Date */}
                    <View className="flex-row items-center justify-between py-3">
                        <View className="flex-row items-center gap-1">
                            <FontAwesomeIcon icon={faCalendar} size={20} color="#003366" />
                            <Text className="text-base font-sfpro_regular text-jetblack">Adoption Date</Text>
                        </View>
                        <Text className="text-base font-sfpro_regular text-text">{pet.adoption_date ? new Date(pet.adoption_date).toLocaleDateString('hr-HR') : "-"}</Text>
                    </View>
                </View>

                <View className="mx-4 my-2 p-2 bg-secondary rounded-3xl shadow-md">
                    <View className="items-center justify-center">

                        {/* Buttons Group 1 */}
                        <View className="my-3">
                            <ProfileButton icon={faBowlFood} label="Nutrition" />
                            <ProfileButton icon={faSyringe} label="Vaccination" />
                            <ProfileButton icon={faDisease} label="Allergy" />
                            <ProfileButton icon={faFile} label="Files" />
                            <ProfileButton icon={faNoteSticky} label="Notes" />
                        </View>

                        <View className="w-[90%] border-black" style={{ borderWidth: 0.5 }} />

                        {/* Buttons Group 2 */}
                        <View className="my-3">
                            <ProfileButton icon={faFileCirclePlus} label="Generete file" />
                            <ProfileButton
                                icon={faEraser}
                                label="Delete Pet"
                                labelClass="text-error"
                                iconColor="#D0021B"
                            />
                        </View>
                    </View>
                </View>


            </ScrollView>
        </View>
    );
}

const ProfileButton = ({ icon, label, onPress, labelClass = 'text-text font-sfpro_regular', iconColor = '#003366' }) => (
    <TouchableOpacity
        className="flex-row items-center justify-start w-full h-12 rounded-xl px-4 active:bg-gray-100"
        activeOpacity={0.7}
        onPress={onPress}
    >
        <View style={{ flex: 1 }} className="flex-row gap-4 items-center">
            <FontAwesomeIcon icon={icon} size={20} color={iconColor} />
            <Text className={`${labelClass} text-base font-sfpro_regular`}>
                {label}
            </Text>
        </View>
        <View style={{ flex: 1 }} className="justify-center items-end">
            <FontAwesomeIcon icon={faAngleRight} size={20} color={iconColor} />
        </View>
    </TouchableOpacity>
);