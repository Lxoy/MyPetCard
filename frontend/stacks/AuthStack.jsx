import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// nativewind
import "../css/global.css";

// screens
import LoginScreen from '../screens/authScreens/LoginScreen';
import SignupScreen from '../screens/authScreens/SignupScreen';
import WelcomeScreen from '../screens/authScreens/WelcomeScreen'

const Stack = createNativeStackNavigator();

export default function AuthStack({initialRoute = "WelcomeScreen"}) {
    
    return (
        <Stack.Navigator  initialRouteName={initialRoute} 
        screenOptions={{ 
            headerShown: false,
            animation: 'fade',
            gestureEnabled: true
        }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
    );
}
