import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'

// tailwind
import "../css/global.css";

export default function WelcomeScreen({ navigation }) {
    return (
        <ImageBackground className='flex-1' source={require('../img/background.png')} resizeMode='fill'>
            <Image className='size-32' source={require('../img/logo-transparent.png')} />
            <View className='flex-1 justify-end mb-14'>
                <Text className='text-primary text-6xl ml-4 font-bold'>MyPetCard</Text>
                <Text className='text-secondary text-2xl ml-4 mb-20 font-bold italic'>All Your Pet’s Info, One Tap Away!</Text>
                <View className='items-center mb-5'>
                    <TouchableOpacity className='bg-primary items-center justify-center rounded-full w-80 h-12' onPress={() => navigation.navigate("LoginScreen")}>
                        <Text className='text-accent font-bold text-lg'>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='m-5 border-2 items-center justify-center rounded-full w-80 h-12' onPress={() => navigation.navigate("SignUpScreen")}>
                        <Text className='text-primary font-bold text-lg'>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}