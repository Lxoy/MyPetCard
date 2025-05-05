import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext.jsx';
import { StatusBar, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { BASE_URL, BASE_URL_EMULATOR } from '../../config.js';
import TextInputField from '../../components/TextInputField.jsx';

export default function AccountSettingsScreen({ navigation }) {

  const { userData, setUserData } = useContext(AuthContext);

  const [username, setUsername] = useState(userData.username);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [phoneNumber, setPhoneNumber] = useState(userData.phone_number);

  const [errorUsername, setErrorUsername] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");

  const handleUsernameChange = (value) => {
    setUsername(value);
    if (!value) {
      setErrorUsername('Username is required');
    } else if (value.length < 3) {
      setErrorUsername('Username must be at least 3 characters');
    } else {
      setErrorUsername('');
    }
  };

  const handleNameChange = (value, setValue, setError) => {
    setValue(value);
    if (!value) {
      setError('');
    } else if (!/^[A-Za-zčćžšđČĆŽŠĐ\s-]+$/.test(value)) {
      setError('Only letters are allowed');
    } else {
      setError('');
    }
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (!value) {
      setErrorPhoneNumber('');
    } else if (!/^\+?[1-9]\d{7,14}$/.test(value)) {
      setErrorPhoneNumber('Invalid phone number format');
    } else {
      setErrorPhoneNumber('');
    }
  };

  const editData = async () => {
    try {
      setErrorUsername("");
      setErrorFirstName("");
      setErrorLastName("");
      setErrorPhoneNumber("");

      if (!username || username.length < 3) {
        setErrorUsername("Username must be at least 3 characters");
        return;
      }

      const payload = {
        username,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
      };

      let token = await AsyncStorage.getItem('userToken')
      console.log(token);
      const response = await axios.patch(BASE_URL_EMULATOR + '/user/edit', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ` + token 
        },
      });

      
      const updatedUser = response.data.user;
      setUserData(updatedUser);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser)); 

      if (response.status === 200) {
        alert("User updated successfully!");
      } else {
        alert("Update failed. Please try again.");
      }
    } catch (error) {
      // samo jedan error za username already in use
      if (error.response?.data?.error_msg) {
        alert(error.response.data.error_msg);
      } else {
        alert("An unexpected error occurred.");
      }
      console.error("Axios error:", error);
    }
  };

  

  return (
    <View className="flex-1 bg-secondary">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
          onPress={() => navigation.goBack()}
        >
          <FontAwesomeIcon icon={faChevronLeft} size={18} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
          onPress={editData}
        >
          <FontAwesomeIcon icon={faCheck} size={18} color="#007AFF" />
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-4 items-center">
          <Text className="font-sfpro_regular text-2xl text-text">Account Data</Text>
        </View>

        {/* Fields */}
        <View className="mt-4">
          <TextInputField
            label="Username"
            placeholder="Username"
            helper="Enter your username"
            value={username}
            size={30}
            action={handleUsernameChange}
            error={errorUsername}
          />

          <TextInputField
            label="First Name"
            placeholder="First Name"
            helper="Enter your first name"
            value={firstName}
            size={30}
            action={(text) => handleNameChange(text, setFirstName, setErrorFirstName)}
            error={errorFirstName} />

          <TextInputField
            label="Last Name"
            placeholder="Last Name"
            helper="Enter your last name"
            value={lastName}
            size={30}
            action={(text) => handleNameChange(text, setLastName, setErrorLastName)}
            error={errorLastName} />

          <TextInputField 
          label="Phone Number" 
          placeholder="+385912345678" 
          value={phoneNumber} 
          helper="Enter in format shown" 
          action={handlePhoneNumberChange} 
          error={errorPhoneNumber} />
        </View>
      </ScrollView>
    </View>
  );
}