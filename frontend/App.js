// client ID: 429290716571-uml2b2bg2n16kjh9ks96t2h2id41j37q.apps.googleusercontent.com

import * as React from 'react';
import { useFonts } from 'expo-font';

// nativewind
import "./css/global.css";

import { AuthProvider } from './context/AuthContext';
import AppNav from './stacks/AppNav'

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
        <AppNav />
    </AuthProvider>

  );
}
