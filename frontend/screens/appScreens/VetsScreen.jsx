import { faGear, faListDots } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { StatusBar, FlatList, RefreshControl, ScrollView, SectionList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';


export default function VetsScreen() {
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

                <TouchableOpacity
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                >
                    <FontAwesomeIcon icon={faListDots} size={18} color="#007AFF" />
                </TouchableOpacity>

                <View className="mx-4 mt-4 p-4 bg-accent items-center rounded-3xl shadow-md">
                <Text className="font-sfpro_medium text-lg text-midnightblue">City</Text>
                </View>
            </ScrollView>
        </View>
    );
}
