import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import { StatusBar, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AccountSettingsScreen({ navigation }) {

  const { userData, logout } = useContext(AuthContext);

  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={18} color="#4A90E2" />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
        >
          <Text className="text-xl color-primary font-sfpro_medium">Save</Text>
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-4 items-center">
          <Text className="font-sfpro_regular text-2xl text-text">Account Data</Text>
        </View>

        {/* Fields */}
        <View className="mt-4">
          <InputField label="Username" placeholder="Username" helper="Enter your username" value={username} size={30} />
          <InputField label="First Name" placeholder="First Name" helper="Enter your first name" value={firstName} size={30}/>
          <InputField label="Last Name" placeholder="Last Name" helper="Enter your last name" value={lastName} size={30} />
          <InputField label="Phone Number" placeholder="+14155552671" value={phoneNumber} helper="Enter in format shown" />
        </View>
      </ScrollView>
    </View>
  );
}

const InputField = ({ label, placeholder, value, helper, size }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="w-full px-6 mb-4">
      {/* Label */}
      <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>{label}</Text>

      {/* Input */}
      <TextInput
        className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border ${
          isFocused ? 'border-primary' : 'border-lightgrey'
        }`}
        placeholder={placeholder}
        value={value}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {/* Helper + Character Count */}
      <View className="flex-row justify-between mt-1 px-1">
        <Text className="text-xs text-darkgrey">{helper}</Text>
        {label !== 'Phone Number' && <Text className="text-xs text-darkgrey">0/{size}</Text>}
      </View>
    </View>
  );
};
