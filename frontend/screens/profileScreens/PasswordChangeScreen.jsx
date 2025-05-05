import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';


export default function PasswordChangeScreen({ navigation }) {
    return (
        <View className="flex-1 bg-secondary">
            <StatusBar barStyle="dark-content" backgroundColor="white" />

            <View className="flex-1">
                {/* Back Button */}
                <TouchableOpacity
                    className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                    onPress={() => navigation.goBack()}
                >
                    <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity
                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                >
                    <FontAwesomeIcon icon={faCheck} size={18} color="#007AFF" />
                </TouchableOpacity>

                {/* Title */}
                <View className="mt-4 items-center">
                    <Text className="font-sfpro_regular text-2xl text-text">Password Settings</Text>
                </View>

            </View>
        </View>
    );
}
