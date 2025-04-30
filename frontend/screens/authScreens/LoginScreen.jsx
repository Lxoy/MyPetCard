import { View, Alert, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';


// tailwind
import "../../css/global.css";

export default function LoginScreen({ navigation }) {
  const { login, errorWhileLoginEmail, errorWhileLoginPassword, promptAsync } = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  // errors
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const handleLogin = async () => {
    setErrorEmail("");
    setErrorPassword("");

    let valid = true;

    if (!email) {
      setErrorEmail("Please enter your e-mail.");
      valid = false;
    }

    if (!password) {
      setErrorPassword("Please enter your password.");
      valid = false;
    }

    if (valid) {
      try {
        await login(email, password);
      } catch (error) {
        if (error.message === "E-mail doesn't exists.") {
          setErrorEmail(error.message);
        } else if (error.message === "This account uses Google login. Use Google to sign in.") {
          Alert.alert(
            "Google Login Required",
            "This account is registered using Google. Please sign in with Google.",
            [{ text: "OK" }]
          );
        } else if (error.message === "Invalid password.") {
          setErrorPassword(error.message);
        }
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1 bg-white">
          <StatusBar barStyle="light-content" backgroundColor='black' />

          <View className="flex-1 justify-center items-center">

            {/* Back button */}
            <TouchableOpacity
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
              onPress={() => navigation.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} size={18} color="#4A90E2" />
            </TouchableOpacity>

            <Image className='size-28' source={require('../../img/logo-transparent1.png')} />
            <Text className='text-midnightblue text-4xl mt-4 px-4 py-2 font-sfpro_regular'>Welcome Back</Text>

            {/* Form */}
            <View className="px-6 py-9 gap-4">
              {/* Email Field */}
              <View className="flex-row items-center bg-white px-4 py-4 rounded-2xl" style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
              }}>
                <Icon name="user" size={20} color="#6B7280" style={{ marginRight: 10 }} />
                <TextInput
                  className="flex-1 text-gray-900 font-sfpro_regular"
                  placeholder="E-mail"
                  placeholderTextColor="#A0AEC0"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textContentType="emailAddress"
                  value={email}
                  onChangeText={setEmail}
                  selectionColor="#007AFF"
                />
              </View>
              {errorEmail !== "" && (
                <Text className="text-red-600 text-sm ml-2">{errorEmail}</Text>
              )}
              {errorWhileLoginEmail && (
                <Text className="text-red-600 text-sm ml-2">This email does not exist.</Text>
              )}

              {/* Password Field */}
              <View className="flex-row items-center bg-white px-4 py-4 rounded-2xl shadow-lg w-[80%]" style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.1,
                shadowRadius: 10,
                elevation: 8,
              }}>
                <Icon name="lock" size={20} color="#6B7280" style={{ marginRight: 10 }} />
                <TextInput
                  secureTextEntry
                  className="flex-1 text-gray-900 font-sfpro_regular"
                  placeholder="Password"
                  placeholderTextColor="#A0AEC0"
                  value={password}
                  onChangeText={setPassword}
                  selectionColor="#007AFF"
                />
              </View>
              {errorPassword !== "" && (
                <Text className="text-red-600 text-sm ml-2">{errorPassword}</Text>
              )}
              {errorWhileLoginPassword && (
                <Text className="text-red-600 text-sm ml-2">Incorrect password.</Text>
              )}

              {/* Forgot Password */}
              <View className="flex-row justify-end">
                <TouchableOpacity>
                  <Text className="text-midnightblue font-sfpro_bold">Forgot password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Login Button */}
            <TouchableOpacity className='bg-midnightblue items-center justify-center rounded-2xl w-80 h-14 shadow-md' style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
            }}

              onPress={handleLogin}>
              <Text className='text-white font-poppins_bold text-lg'>Log In</Text>
            </TouchableOpacity>
            {/* Divider */}
            <Text className="text-center text-jetblack my-2">────────  OR  ────────</Text>
            {/* Google Login */}
            <TouchableOpacity
              className='items-center justify-center rounded-2xl w-80 h-14 bg-secondary border border-jetblack'
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 6,
              }}
              onPress={async () => await promptAsync()}
            >
              <Icon name="google" size={20} color="#003366" />
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

