import * as React from 'react';
import { useFonts } from 'expo-font';

// nativewind
import "./css/global.css";

import { AuthProvider } from './context/AuthContext';
import AppNav from './stacks/AppNav'

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
enableScreens();

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
    <SafeAreaProvider>
      <AuthProvider>
        <AppNav />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
