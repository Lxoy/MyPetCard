import { View, Alert, Text, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// tailwind
import "../css/global.css";
import { AuthContext } from '../context/AuthContext';

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
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" backgroundColor='black' />

          {/* Background */}
          <ImageBackground
            source={require('../img/background3.png')}
            resizeMode="cover"
            style={{ position: 'absolute', width: '100%', height: '100%' }}
          />

          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}>
            {/* Back button */}
            <TouchableOpacity className='absolute top-5 left-5 bg-accent w-12 h-12 items-center justify-center rounded-full' onPress={() => navigation.navigate('WelcomeScreen')}>
              <View>
                <Icon name="angle-left" size={30} color="#3F72AF" />
              </View>
            </TouchableOpacity>

            {/* Logo and Welcome Text */}
            <View className='flex-1 justify-center items-center'>
              <Image className="size-64" source={require('../img/logo-transparent.png')} />
              <Text className="text-primary text-6xl font-poppins_bold py-1 px-2 text-center mb-12">Welcome Back</Text>
            </View>

            {/* Form Inputs */}
            <View className='flex-2 justify-center items-center'>
              <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96'>
                <Icon className='p-2' color={'#112D4E'} name="user" size={24} />
                <TextInput
                  className='flex-1 color-secondary'
                  selectionColor={'#112D4E'}
                  placeholder="E-mail"
                  placeholderTextColor={'#3F72AF'}
                  value={email}
                  onChangeText={email_text => setEmail(email_text)}
                />
              </View>

              {/* Error handling e-mail */}
              <View className='flex-row items-start justify-start w-96'>
                {
                  errorEmail !== "" ? (
                    <Text className="text-red-600 text-sm font-poppins_italic">{errorEmail}</Text>
                  ) : errorWhileLoginEmail ? (
                    <Text className="text-red-600 text-sm font-poppins_italic">This email does not exist.</Text>
                  ) : null
                }
              </View>

              <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96 mt-4'>
                <Icon className='p-2' color={'#112D4E'} name="lock" size={24} />
                <TextInput
                  secureTextEntry={true}
                  className='flex-1 color-secondary'
                  selectionColor={'#112D4E'}
                  placeholder="Password"
                  placeholderTextColor={'#3F72AF'}
                  value={password}
                  onChangeText={password_text => setPassword(password_text)}
                />
              </View>

              {/* Password handling e-mail */}
              <View className='flex-row items-start justify-start w-96'>
                {
                  errorPassword !== "" ? (
                    <Text className="text-red-600 text-sm font-poppins_italic">{errorPassword}</Text>
                  ) : errorWhileLoginPassword ? (
                    <Text className="text-red-600 text-sm font-poppins_italic">Incorrect password.</Text>
                  ) : null
                }
              </View>
            </View>

            {/* Forgot Password */}
            <View className='flex-row items-end justify-end m-2 mr-10'>
              <TouchableOpacity>
                <Text className='text-primary font-poppins_bold'>Forgot password?</Text>
              </TouchableOpacity>
            </View>

            {/* Login and Google button */}
            <View className='flex-2 items-center justify-center'>
              <TouchableOpacity
                className='m-5 bg-primary items-center justify-center rounded-full w-80 h-12'
                onPress={handleLogin}
              >
                <Text className='text-accent font-poppins_bold text-lg'>Log In</Text>
              </TouchableOpacity>

              <Text className="text-primary font-poppins_bold">━━━━━━━━━━━━ OR ━━━━━━━━━━━━</Text>

              <TouchableOpacity className='bg-white m-5 border-2 items-center justify-center rounded-full w-80 h-12' onPress={async () => await promptAsync() }>
                <Icon className='flex-4' name="google" size={24} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
