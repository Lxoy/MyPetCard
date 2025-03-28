import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Image } from 'react-native'
import React from 'react'

// tailwind
import "../css/global.css";

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground className='flex-1' source={require('../img/background.png')} resizeMode='fill'>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View className='flex-1 justify-end mb-14'>
                <Image className='size-40 absolute top-0 left-0' source={require('../img/logo-transparent.png')} />
                <Text className='text-primary text-6xl px-4 py-2 font-poppins_bold'>MyPetCard</Text>
                <Text className='text-secondary text-xl px-4 mb-20 font-poppins_bold_italic'>All Your Pet’s Info, One Tap Away!</Text>
                <View className='items-center mb-5'>
                    <TouchableOpacity className='bg-primary items-center justify-center rounded-full w-80 h-12' onPress={() => navigation.navigate("LoginScreen")}>
                        <Text className='text-accent font-poppins_bold text-lg'>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='m-5 border-2 items-center justify-center rounded-full w-80 h-12' onPress={() => navigation.navigate("SignUpScreen")}>
                        <Text className='text-primary font-poppins_bold text-lg'>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}