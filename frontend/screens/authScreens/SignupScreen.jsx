import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import "../../css/global.css";
import CustomAlert from "../../components/CustomAlert"
import TextInputField from '../../components/TextInputField';

export default function SignupScreen({ navigation }) {
    const {
        register,
        errorWhileRegisterUsername,
        errorWhileRegisterEmail,
        errorWhileRegisterPassword,
        setErrorWhileRegisterUsername,
        setErrorWhileRegisterEmail,
        setErrorWhileRegisterPassword,
        promptAsync
    } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [passwordValidation, setPasswordValidation] = useState(null);

    // Alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Errors
    const [errorUsername, setErrorUsername] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const handleUsernameChange = (value) => {
        setUsername(value);
        if (!value) {
            setErrorUsername('Username is required');
        } else if (value.length < 3) {
            setErrorUsername('Username must be at least 3 characters');
        } else {
            setErrorUsername('');
        }
    };

    const isEmailValid = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

    const handleEmailChange = (value) => {
        setEmail(value);
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (value.includes('@') && value.length > 8) {
            if (!regex.test(value)) {
                setErrorEmail('Invalid email format');
            } else {
                setErrorEmail('');
            }
        } else {
            setErrorEmail('');
        }
    };

    const passwordRules = {
        minLength: {
            description: 'At least 8 characters',
            validator: (password) => password.length >= 8,
        },
        hasUpperCase: {
            description: 'At least one uppercase letter',
            validator: (password) => /[A-Z]/.test(password),
        },
        hasLowerCase: {
            description: 'At least one lowercase letter',
            validator: (password) => /[a-z]/.test(password),
        },
        hasNumber: {
            description: 'At least one number',
            validator: (password) => /[0-9]/.test(password),
        },
        hasSpecialChar: {
            description: 'At least one special character',
            validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
        },
    };

    const validatePassword = (password) => {
        const results = {};
        let isValid = true;

        for (const [ruleName, rule] of Object.entries(passwordRules)) {
            const ruleValid = rule.validator(password);
            results[ruleName] = {
                valid: ruleValid,
                description: rule.description,
            };

            if (!ruleValid) {
                isValid = false;
            }
        }

        return {
            isValid,
            results,
        };
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length > 0) {
            setPasswordValidation(validatePassword(text));
        } else {
            setPasswordValidation(null);
        }
    };

    const handleRegister = async () => {
        let valid = true;

        // Username validation
        if (!username) {
            setErrorUsername('Username is required');
            valid = false;
        } else if (username.length < 3) {
            setErrorUsername('Username must be at least 3 characters');
            valid = false;
        }

        // Email validation
        if (!email) {
            setErrorEmail('Please enter your e-mail.');
            valid = false;
        } else if (!isEmailValid(email)) {
            setErrorEmail('Please enter a valid email address');
            valid = false;
        }

        // Password validation
        const validation = validatePassword(password);
        setPasswordValidation(validation);
        if (!validation.isValid) {
            setErrorPassword('Password does not meet requirements');
            valid = false;
        }

        if (valid) {
            try {
                await register(username, email, password);
                setUsername('');
                setEmail('');
                setPassword('');
                setPasswordValidation(null);
            } catch (error) {
                if (error.message === "E-mail already in use.") {
                    setErrorWhileRegisterEmail(error.message);
                } else if (error.message === "Username already taken.") {
                    setErrorWhileRegisterUsername(error.message);
                    setErrorUsername('')
                } else {
                    setAlertMessage('An error occured during registration.');

                }
            }
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View className='bg-secondary' style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" backgroundColor='black' />

                    {/* Content */}
                    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingBottom: 20 }}>
                        {/* Back button */}
                        <TouchableOpacity
                            className='absolute top-5 left-5 bg-accent w-12 h-12 items-center justify-center rounded-full'
                            onPress={() => navigation.navigate('WelcomeScreen')}
                        >
                            <Icon name="angle-left" size={30} color="#3F72AF" />
                        </TouchableOpacity>

                        {/* Logo and Welcome Text */}
                        <View className='flex-1 justify-center items-center gap-4'>
                            <Image className="size-40 rounded-full p-4" source={require('../../img/logo-transparent1.png')} />
                            <Text className="text-midnightblue text-6xl font-sfpro_bold text-center">Create{'\n'}Account</Text>
                        </View>
                        <TextInputField
                            label="Username"
                            placeholder="Username"
                            helper="Enter your username"
                            value={username}
                            error={errorUsername || errorWhileRegisterUsername}
                            action={handleUsernameChange}
                            size={30} />

                        <TextInputField
                            label="E-mail"
                            placeholder="E-mail"
                            helper="Enter your email"
                            value={email}
                            error={errorEmail || errorWhileRegisterEmail}
                            action={handleEmailChange}
                            size={30} />

                        <TextInputField
                            label="Password"
                            placeholder="Password"
                            helper="Enter your password"
                            value={password}
                            error={errorPassword || errorWhileRegisterPassword}
                            action={handlePasswordChange}
                            size={30}
                            secureTextEntry={true} 
                            passwordValidation={passwordValidation}
                            passwordRules={passwordRules}/>

                        {/* Sign Up and Google button */}
                        <View className='flex-2 items-center justify-center gap-2'>
                            <TouchableOpacity className='bg-midnightblue items-center justify-center rounded-2xl w-80 h-14 shadow-md' style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 6 },
                                shadowOpacity: 0.1,
                                shadowRadius: 10,
                                elevation: 8,
                            }} onPress={handleRegister}>
                                <Text className='text-secondary font-poppins_bold text-xl'>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-midnightblue font-poppins_bold">━━━━━━━━━━━━ OR ━━━━━━━━━━━━</Text>
                            <TouchableOpacity
                                className='items-center justify-center rounded-2xl w-80 h-14 border border-1 bg-secondary'
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.05,
                                    shadowRadius: 6,
                                    elevation: 3,
                                }}
                                onPress={async () => await promptAsync()}
                            >
                                <Icon name="google" size={24} color={"#003366"} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}