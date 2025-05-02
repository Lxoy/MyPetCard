import { View, Alert, Text, Image, TextInput, SafeAreaView, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faLock, faUser } from '@fortawesome/free-solid-svg-icons';



// tailwind
import "../../css/global.css";
import AuthInputField from '../../components/AuthInputField';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginScreen({ navigation }) {
  const { login, errorWhileLoginEmail, errorWhileLoginPassword, setErrorWhileLoginEmail, setErrorWhileLoginPassword, promptAsync } = useContext(AuthContext);

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
          setErrorWhileLoginEmail(error.message);
        } else if (error.message === "This account uses Google login. Use Google to sign in.") {
          Alert.alert(
            "Google Login Required",
            "This account is registered using Google. Please sign in with Google.",
            [{ text: "OK" }]
          );
        } else if (error.message === "Invalid password.") {
          setErrorWhileLoginPassword(error.message);
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
        <StatusBar barStyle="dark-content" backgroundColor="white" />
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
              <AuthInputField
              icon={faUser}
              placeholder="E-mail"
              error={errorEmail || errorWhileLoginEmail}
              keyboardType="email-address"
              action={setEmail}
              textContentType="emailAddress"
              value={email}
              />
             
              {/* Password Field */}
              <AuthInputField
              icon={faLock}
              placeholder="Password"
              error={errorPassword || errorWhileLoginPassword}
              action={setPassword}
              value={password}
              secureTextEntry={true}
              />

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
              <Text className='text-white font-sfpro_bold text-lg'>Log In</Text>
            </TouchableOpacity>
            {/* Divider */}
            <Text className="text-center text-jetblack my-2 font-sfpro_regular">────────  OR  ────────</Text>
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
              <FontAwesomeIcon icon={faGoogle} color="#003366" size={20}/>
            </TouchableOpacity>

          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

