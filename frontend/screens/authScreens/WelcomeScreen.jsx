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
        <View className='flex-1 bg-secondary'>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <View className="flex-1 justify-center items-center">
                <Image className='size-44' source={require('../../img/logo-transparent1.png')} />
                <Text className='text-midnightblue text-5xl mt-10 px-4 py-2 font-sfpro_regular'>MyPetCard</Text>
                <Text className='text-midnightblue text-xl px-4 mb-10 font-sfpro_semi_bold_italic'>All Your Pet’s Info, One Tap Away!</Text>
                <TouchableOpacity className='bg-midnightblue items-center justify-center rounded-2xl w-80 h-14 shadow-md' style={{
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                }}

                    onPress={() => navigation.navigate("LoginScreen")}>
                    <Text className='text-white font-poppins_bold text-lg'>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className='m-3 items-center justify-center rounded-2xl w-80 h-14 bg-secondary border border-jetblack'
                    style={{
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                    }}
                    onPress={() => navigation.navigate("SignupScreen")}
                >
                    <Text className='text-midnightblue font-poppins_bold text-lg'>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}