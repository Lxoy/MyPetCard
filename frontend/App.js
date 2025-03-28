import * as React from 'react';
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';

// nativewind
import "./css/global.css";

import { AuthProvider } from './context/AuthContext';
import NavApp from './stacks/AppNav'

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
    <AuthProvider>
      <NavApp />
    </AuthProvider>

  );
}
