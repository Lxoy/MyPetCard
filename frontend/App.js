import * as React from 'react';
import {StatusBar} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// nativewind
import "./css/global.css";

// screens
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen'

const Stack = createNativeStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/font/Poppins-Regular.ttf'),
    'Poppins-ExtraBold': require('./assets/font/Poppins-ExtraBold.ttf'),
    'Poppins-Bold': require('./assets/font/Poppins-Bold.ttf'),
    'Poppins-Italic': require('./assets/font/Poppins-Italic.ttf'),
    'Poppins-BoldItalic': require('./assets/font/Poppins-BoldItalic.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor='black' />
      <Stack.Navigator initialRouteName='WelcomeScreen' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
