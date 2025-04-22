import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native';
import PetCard from '../../components/PetCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// tailwind
import "../../css/global.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyPetsScreen({ navigation }) {
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
    <View className='flex-1 bg-background'>
      <StatusBar barStyle="light-content" backgroundColor='black' />
      
      <View className='flex my-4 items-center'>
        {/* Screen title */}
        <Text className='font-sfpro_regular text-2xl text-text'>
          My Pets
        </Text>
      </View>

      {emptyError ? (
        <View className="flex-1 justify-center items-center mt-4">
          <Text className="font-sfpro_regular text-text">{emptyError}</Text>
        </View>
      ) : (
        <FlatList
          data={pets}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PetCard
              name={item.name}
              type={item.type}
              breed={item.breed}
              gender={item.gender}
              imageUrl={item.photo_url ? { uri: BASE_URL_EMULATOR + item.photo_url } : defaultImg}
            />
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
