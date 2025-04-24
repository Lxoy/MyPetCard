import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { StatusBar, ScrollView, Text, TouchableOpacity, View } from 'react-native';


export default function SubscriptionScreen({ navigation }) {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
        onPress={() => navigation.goBack()}
      >
        <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
      </TouchableOpacity>

      {/* Title */}
      <View className="mt-4 items-center">
        <Text className="font-sfpro_regular text-2xl text-text">Subscription</Text>
      </View>

      <View className='flex-1 items-center justify-center'>
        <View className="border-2 py-4 w-[80%] h-[270px] mb-4">
          <Text className='font-sfpro_regular text-lg'>Standard</Text>
          <Text className='font-sfpro_regular text-lg'>Features:</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 1</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 2</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 3</Text>

        <FontAwesomeIcon className="absolute top-2 right-2 px-3 py-1" icon={faCircle} size={18} color="#007AFF" />
        </View>
        <View className="border-2 py-4 w-[80%] h-[270px] mb-4">
          <Text className='font-sfpro_regular text-lg'>Premium</Text>
          <Text className='font-sfpro_regular text-lg'>Features:</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 1</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 2</Text>
          <Text className='font-sfpro_regular text-lg'>- feature 3</Text>
        </View>
      </View>


    </View>
  );
}
