import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native';
import PetCard from '../../components/PetCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

import { useRoute } from '@react-navigation/native';

// tailwind
import "../../css/global.css";
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import defaultImg from '../../img/default-pet.jpg';
import { LineChart } from 'react-native-chart-kit';

export default function NutritionScreen({ navigation }) {
    const route = useRoute();

    const { id } = route.params;

    const [pets, setPets] = useState([]);
    const [emptyError, setEmptyError] = useState('');

    const fetchPets = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(BASE_URL_EMULATOR + '/user/pets', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setEmptyError('');
                setPets(response.data.pets);
                console.log("Photo URL:", response.data.pets.map(p => p.photo_url));
            }

        } catch (error) {
            if (error.response?.data?.error_msg === "No pets added.") {
                setPets([]);
                setEmptyError(error.response.data.error_msg);
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPets();
        }, [])
    );

    return (
        <View className='flex-1 bg-secondary'>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            {/* Back Button */}
            <TouchableOpacity
                className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                onPress={() => navigation.navigate("Pet", { id: id })}
            >
                <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
            </TouchableOpacity>

            <View className='flex my-4 items-center'>
                {/* Screen title */}
                <Text className='font-sfpro_regular text-2xl text-text'>
                    Nutrition
                </Text>
                
                {/* Graph */}
                <LineChart
                    data={{
                        labels: ["1. week", "2. week", "3. week", "4. week"],
                        datasets: [
                            {
                                data: [20, 45, 0, 0],
                            },
                        ],
                    }}
                    width={300}
                    height={220}
                    yAxisSuffix=" kg"
                    chartConfig={{
                        backgroundColor: "#003366",
                        backgroundGradientFrom: "#003366",
                        backgroundGradientTo: "#000",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: () => "#fff",
                        propsForDots: {
                            r: "4",
                            strokeWidth: "2",
                            stroke: "#fff",
                        },
                        propsForBackgroundLines: {
                            stroke: "#ecf0f1",
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 16,
                        borderRadius: 20,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 6,
                        elevation: 4,
                    }}
                />
            </View>


            {emptyError ? (
                <View className="flex-1 justify-center items-center mt-4">
                    <Text className="text-base font-sfpro_regular text-text">{emptyError}</Text>
                </View>
            ) : (
                <FlatList
                    data={pets}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Data name={item.name} value="20" date="02. 04. 2042"/>
                    )}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            )}

            <TouchableOpacity
                className='absolute right-4 bottom-4 bg-midnightblue rounded-full w-16 h-16 justify-center items-center'
                style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 6,
                    elevation: 5,
                }}
                onPress={() => navigation.navigate('NewPet')}
            >
                <FontAwesomeIcon icon={faPlus} size={24} color="white" />
            </TouchableOpacity>
        </View>
    );
}

const Data = ({ name, date, value }) => {
    return (
      <View className="flex-row items-center justify-between bg-white p-4 my-2 rounded-xl shadow-sm">
        <View>
          <Text className="text-base text-jetblack font-sfpro_semibold">{name}</Text>
          <Text className="text-sm text-darkgrey font-sfpro_regular">{date}</Text>
        </View>
        <Text className="text-lg text-midnightblue font-sfpro_bold">{value} g</Text>
      </View>
    );
  };