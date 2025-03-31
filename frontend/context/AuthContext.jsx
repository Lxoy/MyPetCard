import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { BASE_URL, BASE_URL_EMULATOR } from '../config.js';

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
            if (error.response && error.response.data.error_msg === "Email already in use") {
                setErrorWhileRegisterEmail(true);
                throw new Error("Email already in use");
            } else if (error.response && error.response.data.error_msg === "Username already taken") {
                setErrorWhileRegisterUsername(true);
                throw new Error("Username already taken");
            } else {
                throw new Error(error.response?.data?.message || "Registration failed");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            login, 
            logout,
            register,
            isLoading, 
            userToken, 
            userData,
            errorWhileRegister,
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
            setErrorWhileLoginPassword 
        }}>
            {children}
        </AuthContext.Provider>
    );
};
