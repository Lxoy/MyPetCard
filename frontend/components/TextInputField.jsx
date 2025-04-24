import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';


// tailwind
import "../css/global.css";

export default function TextInputField({ label, placeholder, value, helper, size, action, error, secureTextEntry, passwordValidation }) {
    const [isFocused, setIsFocused] = useState(false);

    const passwordRules = {
        minLength: {
            description: 'At least 8 characters',
            validator: (password) => password.length >= 8,
        },
        hasUpperCase: {
            description: 'At least one uppercase letter',
            validator: (password) => /[A-Z]/.test(password),
        },
        hasLowerCase: {
            description: 'At least one lowercase letter',
            validator: (password) => /[a-z]/.test(password),
        },
        hasNumber: {
            description: 'At least one number',
            validator: (password) => /[0-9]/.test(password),
        },
        hasSpecialChar: {
            description: 'At least one special character',
            validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
    };


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
                secureTextEntry={secureTextEntry}
            />


            {/* Helper + Character Count */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
                {(label !== 'Phone Number' && label !== 'Color') && <Text className="text-xs text-darkgrey">{value.length}/{size}</Text>}
            </View>
            
            {label === "Password" && passwordValidation && (
                <View className="mt-2">
                    {Object.entries(passwordValidation.results).map(([ruleName, rule]) => (
                        <Text
                            key={ruleName}
                            className={`text-xs ${rule.valid ? 'text-green-500' : 'text-gray-500'}`}
                        >
                            {rule.valid ? '✓' : '•'} {rule.description}
                        </Text>
                    ))}
                </View>
            )}
        </View>
    );
}
