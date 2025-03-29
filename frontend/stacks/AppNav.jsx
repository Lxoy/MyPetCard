import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// nativewind
import "../css/global.css";

import { AuthContext } from '../context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

const Stack = createNativeStackNavigator();
``
export default function AppNav() {
    const { isLoading, userToken, errorWhileLogin } = useContext(AuthContext);

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={'large'} />
            </View>
        );

    }

    return (
        <NavigationContainer>
            {
                userToken !== null ? <AppStack /> : <AuthStack initialRoute= { errorWhileLogin ? "LoginScreen" : "WelcomeScreen" } />
            }
        </NavigationContainer>
    );
}
