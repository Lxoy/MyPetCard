import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo, faVenus, faVenusMars, faMars } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';

// tailwind
import "../css/global.css";

export default function PetCard({id, name, breed, gender, imageUrl }) {

    const navigation = useNavigation();

    const genderIcon = {
        Male: faMars,
        Female: faVenus
    };

    const genderIconColor = {
        Male: "#4A90E2",
        Female: "#FF69B4"
    };


    return (
        <TouchableOpacity className='mx-4 my-3 rounded-lg shadow-lg shadow-midnightblue'
            onPress={() =>{ console.log('Pet ID:', id); navigation.navigate('Pet', { id })}}
        >
            <View className='absolute inset-0 ' />
            <View className='flex-1 rounded-3xl py-1 flex-row items-center bg-secondary'>
                <View className='rounded-full'>
                    <Image
                        className='size-36 rounded-full mx-4 my-4 shadow-black shadow-md'
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            elevation: 5,
                        }}
                        source={imageUrl || require('../img/default-pet.jpg')}
                    />
                </View>

                <View className='flex-1 ml-2'>
                    <Text className='color-text font-sfpro_bold text-xl'>
                        {name || 'Unknown Pet'}
                    </Text>
                    <View className='flex-row gap-1 mr-2'>
                        <Text className='color-text font-sfpro_regular text-md'>
                            {breed || 'Unknown Breed'}
                        </Text>
                        <Text>
                            |
                        </Text>
                        <FontAwesomeIcon icon={gender ? genderIcon[gender] : faVenusMars} size={18} color={gender ? genderIconColor[gender] : "#000"} />
                    </View>
                    <Text className="color-text font-sfpro_regular text-sm">
                        2 years old
                    </Text>
                </View>
                <View className='absolute top-2 right-2'>
                    <FontAwesomeIcon icon={faCircleInfo} size={24} color="#4A90E2" />
                </View>
            </View>
        </TouchableOpacity>
    );
}
