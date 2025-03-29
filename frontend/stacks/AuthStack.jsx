import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// nativewind
import "../css/global.css";

// screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen'

const Stack = createNativeStackNavigator();

export default function AuthStack({initialRoute = "WelcomeScreen"}) {
    
    return (
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        </Stack.Navigator>
    );
}
