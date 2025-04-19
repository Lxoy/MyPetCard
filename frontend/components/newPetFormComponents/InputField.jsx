import { useState } from "react";
import { View, Text, TextInput } from "react-native";

export const InputField = ({ label, placeholder, value, helper, size, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>{label}</Text>

            {/* Input */}
            <TextInput
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
                placeholder={placeholder}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={action}
                maxLength={size}
            />

            {/* Helper + Character Count */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
                {label !== 'Phone Number' && <Text className="text-xs text-darkgrey">/{size}</Text>}
            </View>
        </View>
    );
};