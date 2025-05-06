import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';


// tailwind
import "../css/global.css";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function AuthInputField({ icon, placeholder, value, action, error, secureTextEntry, keyboardType, textContentType, passwordValidation}) {

    return (
        <View>
            <View className="flex-row items-center bg-white px-4 py-4 rounded-2xl shadow-lg w-80" style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
            }}>
                <FontAwesomeIcon icon={icon} color="#6B7280" size={16} style={{ marginRight: 10 }} />
                <TextInput
                    className="flex-1 text-gray-900 font-sfpro_regular"
                    placeholder={placeholder}
                    placeholderTextColor="#A0AEC0"
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    textContentType={textContentType}
                    value={value}
                    onChangeText={action}
                    selectionColor="#007AFF"
                    secureTextEntry={secureTextEntry}
                />
            </View>
            <View className="mt-1 px-1">
                {!error ? null : <Text className="text-xs text-error">{error}</Text>}
            </View>
            {placeholder === "Password" && passwordValidation && (
                <View className="mt-2">
                    {Object.entries(passwordValidation.results).map(([ruleName, rule]) => (
                        <Text
                            key={ruleName}
                            className={`text-xs ${rule.valid ? 'text-success' : 'text-darkgrey'}`}
                        >
                            {rule.valid ? '✓' : '•'} {rule.description}
                        </Text>
                    ))}
                </View>
            )}
        </View>

    );
}
