import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// nativewind
import "../css/global.css";

// screens
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen'

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
