import React, { useState } from 'react';
import { View, FlatList, StatusBar, TouchableOpacity, Text } from 'react-native';
import PetCard from '../../components/PetCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// tailwind
import "../../css/global.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function MyPetsScreen({ navigation }) {
  const [pets, setPets] = useState([
    { id: 1, name: 'Buco', type: 'Dog', breed: 'Pekingese', gender: 'Male', imageUrl: require("../../img/Pekingese-1.jpg") },
    { id: 2, name: 'Luna', type: 'Cat', breed: 'Persian', gender: 'Female', imageUrl: require("../../img/Pekingese-1.jpg") }, // privremeno ista slika
  ]);

  return (
    <View className='flex-1 bg-background'>
      <StatusBar barStyle="light-content" backgroundColor='black' />
      
      <View className='flex my-4 items-center'>
        {/* Screen title */}
        <Text className='font-sfpro_regular text-2xl text-text'>
          My Pets
        </Text>
      </View>

      <FlatList
        data={pets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PetCard
            name={item.name}
            type={item.type}
            breed={item.breed}
            gender={item.gender}
            imageUrl={item.imageUrl}
          />
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

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
