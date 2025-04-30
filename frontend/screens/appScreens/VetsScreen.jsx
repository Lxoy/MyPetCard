import { faGear, faListDots, faStar, faStarHalf, faStarHalfStroke } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { StatusBar, ScrollView, Dimensions, Text, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function VetsScreen() {
    const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

    const { width } = Dimensions.get('window');

    return (
        <View className="flex-1 flex-col bg-secondary">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Title */}
                <View className="mt-4 items-center">
                    <Text className="font-sfpro_regular text-2xl text-text">
                        Vets
                    </Text>
                </View>

                <View className="mx-4 mt-4 p-2 bg-accent items-center rounded-3xl shadow-md">
                    <Text className="font-sfpro_medium text-lg text-midnightblue">Zagreb</Text>
                </View>

                {/* Horizontal ScrollView */}
                <ScrollView
                    horizontal
                    pagingEnabled
                    snapToInterval={width}
                    snapToAlignment="center"
                    className="flex-row my-1"
                >
                    {items.map((item, index) => (
                        <View
                            key={index}
                            className="flex justify-center items-center"
                            style={{ width }}
                        >
                            {/* Card container with subtle shadow and rounded corners */}
                            <View className="w-[95%] h-[95%] bg-white shadow-lg rounded-xl p-4">
                                {/* Image */}
                                <View className="flex-1 bg-gray-200 rounded-2xl mb-4 overflow-hidden">
                                    <Image
                                        source={require("../../img/vet.jpg")}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>


                                {/* Text content section */}
                                <View className="flex-1">
                                    {/* Name */}
                                    <Text className="text-lg font-sfpro_bold text-jetblack">{item}</Text>

                                    {/* Street */}
                                    <Text className="text-sm text-darkgrey mt-1">Ulica</Text>

                                    {/* Rating */}
                                    <View className="flex-row mt-1 items-center">
                                        <FontAwesomeIcon icon={faStar} color="#D4AF37"/><FontAwesomeIcon icon={faStar} color="#D4AF37"/><FontAwesomeIcon icon={faStar} color="#D4AF37"/><FontAwesomeIcon icon={faStar} color="#D4AF37"/><FontAwesomeIcon icon={faStarHalfStroke} color="#D4AF37"/><Text className="ml-2">(459)</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                    ))}
                </ScrollView>
            </ScrollView>
        </View>
    );
}
