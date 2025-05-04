import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function SubscriptionScreen({ navigation }) {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

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

      <View className='flex-1 items-center justify-center m-8 gap-4'>
        {/* Standard Subscription */}
        <TouchableOpacity
          className="p-4 w-full h-[50%] bg-white  rounded-2xl shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
          }}
        >
          <View className="absolute top-4 right-4">
            <FontAwesomeIcon icon={faCircle} size={20} color="#003366" />
          </View>

          <Text className='font-sfpro_bold text-midnightblue text-2xl'>Standard</Text>
          <Text className='font-sfpro_regular text-midnightblue text-xl mt-3'>Features:</Text>
          <Text className='font-sfpro_regular text-midnightblue text-base'>• Pet health records</Text>
          <Text className='font-sfpro_regular text-midnightblue text-base'>• Vaccination reminders</Text>
          <Text className='font-sfpro_regular text-midnightblue text-base'>• Local vet network</Text>
          <Text className='font-sfpro_regular text-midnightblue text-base'>• Pet profile</Text>
          <Text className='font-sfpro_regular text-midnightblue text-base'>• Up to 1 pet</Text>
        </TouchableOpacity>

        {/* Premium Subscription with Gradient Background */}
        <TouchableOpacity
          className="w-full h-[50%] rounded-2xl shadow-lg"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 6 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 5,
          }}
          activeOpacity={0.7}
        >
          {/* Gradient Background */}
          <LinearGradient
            className="flex-1 py-4 px-4 rounded-2xl"
            colors={['#003366', '#000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
            }}
          >
            <View className="absolute top-4 right-4">
              <FontAwesomeIcon icon={faCircle} size={20} color="#fff" />
            </View>
            <Text className="font-sfpro_bold text-2xl text-secondary">Premium</Text>
            <Text className="font-sfpro_regular text-xl text-secondary mt-3">Features:</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• All Standard Plan features</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Unlimited pet profiles</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Advanced health analytics</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Priority vet support</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Custom pet reminders</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Exclusive offers and discounts</Text>
            <Text className='font-sfpro_regular text-base text-secondary'>• Premium support</Text>
          </LinearGradient>
        </TouchableOpacity>


      </View>
    </View>
  );
}
