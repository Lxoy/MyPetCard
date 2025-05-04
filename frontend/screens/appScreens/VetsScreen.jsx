import { faAngleDown, faGear, faListDots, faPhone, faRoad, faStar, faStarHalf, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { StatusBar, ScrollView, Dimensions, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHourglassHalf } from '@fortawesome/free-regular-svg-icons';

export default function VetsScreen() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    return (
        <View className="flex-1 flex-col bg-secondary">
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Title */}
                <View className="mt-4 items-center">
                    <Text className="font-sfpro_regular text-2xl text-text">
                        Vets
                    </Text>
                </View>

                <TouchableOpacity
                    className="relative mx-4 mt-4 h-12 px-4 bg-accent rounded-3xl shadow-md justify-center items-center"
                >
                    <Text className="font-sfpro_medium text-lg text-midnightblue">Zagreb</Text>

                    <View className="absolute right-4 top-1/2 -translate-y-1/2">
                        <FontAwesomeIcon icon={faAngleDown} size={18} color="#1e293b" />
                    </View>
                </TouchableOpacity>

                <ScrollView className="my-2">
                    {items.map((item, index) => (
                        <View
                            key={index}
                            className="justify-center items-center my-2"
                        >
                            <View
                                className="w-[95%] bg-white rounded-3xl p-5 shadow-md"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 8,
                                    elevation: 4,
                                }}
                            >
                                {/* Image */}
                                <View className="h-48 bg-gray-100 rounded-3xl mb-4 overflow-hidden">
                                    <Image
                                        source={require("../../img/vet.jpg")}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>

                                {/* Content */}
                                <View className="gap-2">
                                    {/* Name */}
                                    <Text className="text-xl font-sfpro_bold text-jetblack">{item}</Text>

                                    {/* Address */}
                                    <View className="flex-row items-center gap-2">
                                        <FontAwesomeIcon icon={faRoad} size={16} color="#808080" />
                                        <Text className="text-sm font-sfpro_regular text-darkgrey">Ulica</Text>
                                    </View>

                                    {/* Phone */}
                                    <View className="flex-row items-center gap-2">
                                        <FontAwesomeIcon icon={faPhone} size={16} color="#808080" />
                                        <Text className="text-sm font-sfpro_regular text-darkgrey">9242424</Text>
                                    </View>

                                    {/* Phone */}
                                    <View className="flex-row items-center gap-2">
                                        <FontAwesomeIcon icon={faHourglassHalf} size={16} color="#808080" />
                                        <Text className="text-sm font-sfpro_regular text-darkgrey">08:00 - 14:00</Text>
                                    </View>

                                    {/* Rating */}
                                    <View className="flex-row items-center gap-1 mt-1">
                                        {[...Array(4)].map((_, i) => (
                                            <FontAwesomeIcon key={i} icon={faStar} color="#FBBF24" />
                                        ))}
                                        <FontAwesomeIcon icon={faStarHalfStroke} color="#FBBF24" />
                                        <Text className="ml-2 ont-sfpro_regular text-darkgrey">(459)</Text>
                                    </View>

                                    {/* Open/Closed status */}
                                    <Text className="mt-1 text-red-500 font-sfpro_regular">Closed</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

            </ScrollView>
        </View>
    );
}
