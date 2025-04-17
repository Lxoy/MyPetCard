import React, { useState } from 'react';
import {View,  ScrollView, ImageBackground, StatusBar, TouchableOpacity, Text } from 'react-native';
import PetCard from '../../components/PetCard';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

// tailwind
import "../../css/global.css";
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function MyPetsScreen() {
  return (
    <View className='flex-1 flex-col bg-background'>
      <StatusBar barStyle="light-content" backgroundColor='black' />
      <ScrollView contentContainerStyle={{ flexGrow: 1}}>
        <View className='flex my-4 items-center'>
          {/* Screen title */}
          <Text className='font-sfpro_regular text-2xl text-text'>
            My Pets
          </Text>
        </View>
        <PetCard name={"Buco"} type={"Dog"} breed={"Pekingese"} imageUrl={require("../../img/Pekingese-1.jpg")} />
        <PetCard />
        <PetCard />
        <PetCard />
      </ScrollView>
      <TouchableOpacity className='absolute right-4 bottom-4 bg-primary border-2 border-primary rounded-full w-16 h-16 justify-center items-center'>
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}