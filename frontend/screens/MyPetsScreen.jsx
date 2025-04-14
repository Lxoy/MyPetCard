import React, { useState } from 'react';
import {View,  ScrollView, ImageBackground, StatusBar, TouchableOpacity, Text } from 'react-native';
import PetCard from '../components/PetCard';

// tailwind
import "../css/global.css";

export default function MyPetsScreen() {
  return (
    <View className='flex-1 flex-col bg-background'>
      <StatusBar barStyle="light-content" backgroundColor='black' />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className='flex mt-4 items-center'>
          {/* Screen title */}
          <Text className='font-poppins_regular text-[48px] text-text'>
            My Pets
          </Text>
        </View>
        <PetCard name={"Buco"} type={"Dog"} breed={"Pekingese"} imageUrl={require("../img/Pekingese-1.jpg")} />
        <PetCard />
        <PetCard />
        <PetCard />
      </ScrollView>
      <TouchableOpacity className='absolute right-10 bottom-10 bg-black border-2 rounded-xl w-16 h-8 justify-center items-center'>
        <Text className='color-white'>+</Text>
      </TouchableOpacity>
    </View>
  );
}