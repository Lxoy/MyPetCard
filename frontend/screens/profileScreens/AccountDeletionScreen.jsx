import React, { useState, useContext } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import TextInputField from '../../components/TextInputField';
import { AuthContext } from '../../context/AuthContext';


export default function AccountDeletionScreen({ navigation }) {
  const { userData, setUserData } = useContext(AuthContext);

  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");


  const [deleteErorUsername, setDeleteErrorUseranme] = useState("");
  const [deleteErrorPassword, setDeleteErrorPassword] = useState("");

  const deleteAccount = () => {
    if(inputEmail == email && inputPassword == password){
      
    }
  }

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
          onPress={deleteAccount}
        >
          <FontAwesomeIcon icon={faCheck} size={18} color="#007AFF" />
        </TouchableOpacity>

        {/* Title */}
        <View className="mt-4 items-center">
          <Text className="font-sfpro_regular text-2xl text-error">Account Deletion</Text>
        </View>

        {/* Fields */}
        <View className="mt-4">
          <TextInputField
            label="E-mail"
            placeholder="E-mail"
            helper="Enter your e-mail"
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
            error={deleteErorUsername}
          />

          <TextInputField
            label="Password"
            placeholder="Password"
            helper="Enter your password"
            value={inputEmail}
            onChange={(e) => setInputPassword(e.target.value)}
            error={deleteErrorPassword}
          />

        </View>
      </View>
    </View>
  );
}
