import { View, Text, ImageBackground, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import React, { useContext, useCallback } from 'react';

// tailwind
import "../../css/global.css";

import { AuthContext } from '../../context/AuthContext';

export default function WelcomeScreen({ navigation }) {

    const {
        setErrorWhileLogin,
        setErrorWhileLoginEmail,
        setErrorWhileLoginPassword,
        setErrorWhileRegisterUsername,
        setErrorWhileRegisterEmail,
        setErrorWhileRegisterPassword,
    } = useContext(AuthContext);

    // resetira errorWhileLogin kad se vrati na welcome page da nam nebi onaj error text ostajo cijelo vrijeme
    useFocusEffect(
        useCallback(() => {
            setErrorWhileLogin(false);
            setErrorWhileLoginEmail(false);
            setErrorWhileLoginPassword(false);

            setErrorWhileRegisterUsername(false);
            setErrorWhileRegisterEmail(false);
            setErrorWhileRegisterPassword(false);
        }, []));

    return (
        <ImageBackground className='flex-1' source={require('../../img/background.png')} resizeMode='fill'>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View className='flex-1 justify-end mb-14'>
                <Image className='size-40 absolute top-0 left-0' source={require('../../img/logo-transparent.png')} />
                <Text className='text-midnightblue text-7xl px-4 py-2 font-sfpro_bold'>MyPetCard</Text>
                <Text className='text-midnightblue text-xl px-4 mb-14 font-sfpro_heavy_italic'>All Your Pet’s Info, One Tap Away!</Text>
                <View className='items-center'>
                    <TouchableOpacity className='bg-midnightblue items-center justify-center rounded-2xl w-80 h-14 shadow-md' style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.1,
                        shadowRadius: 10,
                        elevation: 8,
                    }} onPress={() => navigation.navigate("LoginScreen")}>
                        <Text className='text-white font-poppins_bold text-lg'>Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className='m-3 items-center justify-center rounded-2xl w-80 h-14 border border-1 bg-secondary'
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: 0.05,
                            shadowRadius: 6,
                            elevation: 3,
                        }}
                        onPress={() => navigation.navigate("SignupScreen")}
                    >
                        <Text className='text-midnightblue font-poppins_bold text-lg'>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    )
}