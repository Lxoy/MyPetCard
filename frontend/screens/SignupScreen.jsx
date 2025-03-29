import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// tailwind
import "../css/global.css";

export default function SignupScreen({navigation}) {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }
  }


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

          {/* Content */}
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}>
              {/* Back button */}
              <TouchableOpacity
                className='absolute top-5 left-5 bg-accent w-12 h-12 items-center justify-center rounded-full'
                onPress={() => navigation.goBack()}
              >
                <View>
                  <Icon name="angle-left" size={30} color="#3F72AF" />
                </View>
              </TouchableOpacity>
  
              {/* Logo and Welcome Text */}
              <View className='flex-1 justify-center items-center'>
                <Image className="size-64" source={require('../img/logo-transparent.png')} />
                <Text className="text-primary text-6xl font-poppins_bold text-center py-1 mb-12">Create Account</Text>
              </View>
  
              {/* Form Inputs */}
              <View className='flex-2 justify-center items-center mb-12'>
                <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96'>
                  <Icon className='flex-4 p-2' color={'#112D4E'} name="user" size={24} />
                  <TextInput
                    className='flex-1 color-secondary'
                    selectionColor={'#112D4E'}
                    placeholder="Username"
                    placeholderTextColor={'#3F72AF'}
                    value={username}
                    onChangeText={username_text => setUsername(username_text)}
                  />
                </View>
                <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96 mt-4'>
                  <Icon className='flex-4 p-2' color={'#112D4E'} name="envelope" size={20} />
                  <TextInput
                    keyboardType="email-address" 
                    className='flex-1 color-secondary'
                    selectionColor={'#112D4E'}
                    placeholder="E-mail"
                    placeholderTextColor={'#3F72AF'}
                    value={email}
                    onChangeText={email_text => setEmail(email_text)}
                  />
                </View>
                
                <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96 mt-4'>
                  <Icon className='flex-4 p-2' color={'#112D4E'} name="lock" size={24} />
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
              </View>

              {/* Login and Google button */}
              <View className='flex-2 items-center justify-center'>
                <TouchableOpacity
                  className='m-5 bg-primary items-center justify-center rounded-full w-80 h-12'
                  onPress={ register }
                >
                  <Text className='text-accent font-poppins_bold text-lg'>Sign Up</Text>
                </TouchableOpacity>
  
                <Text className="text-primary font-poppins_bold">━━━━━━━━━━━━ OR ━━━━━━━━━━━━</Text>
  
                <TouchableOpacity
                  className='bg-white m-5 border-2 items-center justify-center rounded-full w-80 h-12'
                  onPress={() => navigation.navigate("SignUpScreen")}
                >
                  <Icon className='flex-4' name="google" size={24} />
                </TouchableOpacity>
              </View>
            </ScrollView>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
