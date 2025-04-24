import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export const TouchField = ({ label, placeholder, value, helper, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleToggle = () => {
        const newGender = value === 'Male' ? 'Female' : 'Male';
        action(newGender);
        setIsFocused(true);
    };

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>
                {label}
            </Text>

            {/* Touchable Box */}
            <TouchableOpacity
                onPress={handleToggle}
                className={`w-full bg-white rounded-xl px-4 py-2 shadow-sm border items-center flex-row gap-1 ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
            >
                <Text className={`${value ? 'text-gray-900' : 'text-darkgrey'} text-base`}>
                    {value || placeholder}
                </Text>
                <FontAwesomeIcon icon={value == "Male" ? faMars : faVenus} color={value == "Male" ? "#4A90E2" : "#FF69B4"} size={18} />
            </TouchableOpacity>

            {/* Helper Text */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? (
                    <Text className="text-xs text-darkgrey">{helper}</Text>
                ) : (
                    <Text className="text-xs text-error">{error}</Text>
                )}
            </View>
        </View>
    );
};
