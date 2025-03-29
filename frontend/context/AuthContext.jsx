import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from 'react-native';
import { BASE_URL, BASE_URL_EMULATOR } from '../config.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userData, setUserData] = useState(null);

    const [errorWhileLogin, setErrorWhileLogin] = useState(false);

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
            // Alert.alert("Login Failed", "Invalid credentials or server issue.");
        }

        setIsLoading(false);
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

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userData, errorWhileLogin }}>
            {children}
        </AuthContext.Provider>
    );
};
