import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

// tailwind
import "../css/global.css";

export default function SignupScreen({navigation}) {
  return (
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ImageBackground className='absolute w-full h-full' source={require('../img/background3.png')} resizeMode='cover'>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}>
              {/* Back button */}
              <TouchableOpacity
                className='absolute top-5 left-5 bg-accent w-12 h-12 items-center justify-center rounded-full'
                onPress={() => navigation.goBack()}
              >
                <Text className='text-4xl text-secondary font-extrabold'>{`<`}</Text>
              </TouchableOpacity>
  
              {/* Logo and Welcome Text */}
              <View className='flex-1 justify-center items-center'>
                <Image className="size-64" source={require('../img/logo-transparent.png')} />
                <Text className="text-primary text-6xl font-bold mb-12">Create Account</Text>
              </View>
  
              {/* Form Inputs */}
              <View className='flex-2 justify-center items-center mb-12'>
                <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96'>
                  <Icon className='flex-4 p-2' color={'#112D4E'} name="user" size={24} />
                  <TextInput
                    className='flex-1 color-secondary'
                    selectionColor={'#112D4E'}
                    placeholder="E-mail"
                    placeholderTextColor={'#3F72AF'}
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
                  />
                </View>
              </View>

              {/* Login and Social Buttons */}
              <View className='flex-2 items-center justify-center'>
                <TouchableOpacity
                  className='m-5 bg-primary items-center justify-center rounded-full w-80 h-12'
                  onPress={() => navigation.navigate("SignUpScreen")}
                >
                  <Text className='text-accent font-bold text-lg'>Sign Up</Text>
                </TouchableOpacity>
  
                <Text className="text-primary font-bold">━━━━━━━━━━━━ OR ━━━━━━━━━━━━</Text>
  
                <TouchableOpacity
                  className='m-5 border-2 items-center justify-center rounded-full w-80 h-12'
                  onPress={() => navigation.navigate("SignUpScreen")}
                >
                  <Icon className='flex-4' name="google" size={24} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
}