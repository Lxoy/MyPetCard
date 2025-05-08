import * as React from 'react';
import { useFonts } from 'expo-font';
import { StripeProvider } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISHABLE_KEY } from '@env';

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

    'SFPRODISPLAYBLACKITALIC': require('./assets/font/SFPRODISPLAYBLACKITALIC.otf'),
    'SFPRODISPLAYBOLD': require('./assets/font/SFPRODISPLAYBOLD.otf'),
    'SFPRODISPLAYHEAVYITALIC': require('./assets/font/SFPRODISPLAYHEAVYITALIC.otf'),
    'SFPRODISPLAYLIGHTITALIC': require('./assets/font/SFPRODISPLAYLIGHTITALIC.otf'),
    'SFPRODISPLAYMEDIUM': require('./assets/font/SFPRODISPLAYMEDIUM.otf'),
    'SFPRODISPLAYREGULAR': require('./assets/font/SFPRODISPLAYREGULAR.otf'),
    'SFPRODISPLAYSEMIBOLDITALIC': require('./assets/font/SFPRODISPLAYSEMIBOLDITALIC.otf'),
    'SFPRODISPLAYTHINITALIC': require('./assets/font/SFPRODISPLAYTHINITALIC.otf'),
    'SFPRODISPLAYULTRALIGHTITALIC': require('./assets/font/SFPRODISPLAYULTRALIGHTITALIC.otf'),
  });
  
      if (!fontsLoaded) return null;
      
  return (
    <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
      <SafeAreaProvider>
        <AuthProvider>
          <AppNav />
        </AuthProvider>
      </SafeAreaProvider>
    </StripeProvider>
  );
}
