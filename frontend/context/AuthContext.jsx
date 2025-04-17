import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL, BASE_URL_EMULATOR } from '../config.js';

import { GOOGLE_IOS_CLIENT_ID, GOOGLE_ANDROID_CLIENT_ID, GOOGLE_WEB_CLIENT_ID } from '@env';

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from 'expo-auth-session';
WebBrowser.maybeCompleteAuthSession();


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);
    
    const [errorWhileRegister, setErrorWhileRegister] = useState(false);
    const [errorWhileLogin, setErrorWhileLogin] = useState(false);

    const [errorWhileRegisterUsername, setErrorWhileRegisterUsername] = useState(false);
    const [errorWhileRegisterEmail, setErrorWhileRegisterEmail] = useState(false);
    const [errorWhileRegisterPassword, setErrorWhileRegisterPassword] = useState(false);

    const [errorWhileLoginEmail, setErrorWhileLoginEmail] = useState(false);
    const [errorWhileLoginPassword, setErrorWhileLoginPassword] = useState(false);

    const login = async (email, password) => {
        try {
            setIsLoading(true);

            const response = await axios.post(BASE_URL_EMULATOR + '/login', { email, password });

            const user = response.data.user;
            const token = response.data.token;

            setUserData(user);
            setUserToken(token);

            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user)); 

            console.log(JSON.stringify(user));
        } catch (error) {
            setErrorWhileLogin(true);

            if (error.response.data.error_msg === "User not found.") {
                setErrorWhileLoginEmail(true);
                throw new Error("E-mail doesn't exists.")
            } else if (error.response.data.error_msg === "Invalid password.") {
                setErrorWhileLoginPassword(true);
                throw new Error("Invalid password.");
            } else if (error.response.data.error_msg === "This account uses Google login. Use Google to sign in.") {
                throw new Error("This account uses Google login. Use Google to sign in.")
            } else {
                throw new Error(error.response?.data?.message || "Login failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        setUserToken(null);
        setUserData(null);

        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userData');

        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);

            let storedUserData = await AsyncStorage.getItem('userData');
            let storedUserToken = await AsyncStorage.getItem('userToken');

            const userData = storedUserData ? JSON.parse(storedUserData) : null;

            if (userData) {
                setUserToken(storedUserToken);
                setUserData(userData);
                console.log("User data loaded:", userData);
            }

        } catch (e) {
            console.log(`isLoggedIn error: ${e}`);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (username, email, password) => {
        try {
            setIsLoading(true);
        
            const response = await axios.post(BASE_URL_EMULATOR + '/register', { 
                username, 
                email, 
                password 
            });
    
            const user = response.data.user;
            const token = response.data.token;
    
            setUserData(user);
            setUserToken(token);
    
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userData', JSON.stringify(user)); 
    
        } catch (error) {
            setErrorWhileRegister(true);
            if (error.response.data.error_msg === "E-mail already in use.") {
                setErrorWhileRegisterEmail(true);
                throw new Error("Email already in use");
            } else if (error.response.data.error_msg === "Username already taken") {
                setErrorWhileRegisterUsername(true);
                throw new Error("Username already taken.");
            } else {
                throw new Error(error.response?.data?.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: GOOGLE_WEB_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
        androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        redirectUri: AuthSession.makeRedirectUri({
            scheme: 'com.mypetcard.mypetcard',  
        })
    });
    
    const sendGoogleLoginToBackend = async (id_token) => {
        try {
            setIsLoading(true);
            const response = await axios.post(BASE_URL_EMULATOR + "/login/google", { id_token });
    
            console.log("Backend response:", response.data);
            if (response.data.token) {
                const token = response.data.token;
                const user = response.data.user;
                
                setUserToken(token);
                setUserData(user);
    
                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userData', JSON.stringify(user));

                console.log("Google login successful:", user);
            }
        } catch (error) {
            console.error("Error in backend Google login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            console.log('ID Token:', id_token);
            sendGoogleLoginToBackend(id_token);
        }
    }, [response]);

    useEffect(() => {
        isLoggedIn();
    }, []);
``
    return (
        <AuthContext.Provider value={{ 
            login, 
            logout,
            register,
            isLoading, 
            userToken, 
            userData,
            setUserData,
            errorWhileRegister,
            setErrorWhileRegister,
            errorWhileRegisterUsername,
            setErrorWhileRegisterUsername,
            errorWhileRegisterEmail,
            setErrorWhileRegisterEmail,
            errorWhileRegisterPassword,
            setErrorWhileRegisterPassword,
            errorWhileLogin, 
            setErrorWhileLogin, 
            errorWhileLoginEmail, 
            setErrorWhileLoginEmail, 
            errorWhileLoginPassword, 
            setErrorWhileLoginPassword,
            promptAsync
        }}>
            {children}
        </AuthContext.Provider>
    );
};