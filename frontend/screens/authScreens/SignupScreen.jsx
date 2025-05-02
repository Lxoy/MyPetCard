import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import "../../css/global.css";
import CustomAlert from "../../components/CustomAlert"
import TextInputField from '../../components/TextInputField';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft, faLock } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import AuthInputField from '../../components/AuthInputField';
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';

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
                    <StatusBar barStyle="dark-content" backgroundColor="white" />

                    {/* Content */}
                    <View className="flex-1 justify-center items-center">
                        {/* Back button */}
                        <TouchableOpacity
                            className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/70 flex-row items-center justify-center shadow-sm"
                            onPress={() => navigation.goBack()}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} size={18} color="#4A90E2" />
                        </TouchableOpacity>

                        <Image className='size-28' source={require('../../img/logo-transparent1.png')} />
                        <Text className='text-midnightblue text-4xl mt-4 px-4 py-2 font-sfpro_regular'>Create Account</Text>

                        {/* Form */}
                        <View className="px-6 py-9 gap-4">

                            <AuthInputField
                                icon={faUser}
                                placeholder="Username"
                                error={errorUsername || errorWhileRegisterUsername}
                                action={handleUsernameChange}
                                textContentType="emailAddress"
                                value={username}
                            />

                            <AuthInputField
                                icon={faEnvelope}
                                placeholder="E-mail"
                                error={errorEmail || errorWhileRegisterEmail}
                                keyboardType="email-address"
                                action={handleEmailChange}
                                textContentType="emailAddress"
                                value={email}
                            />

                            {/* Password Field */}
                            <AuthInputField
                                icon={faLock}
                                placeholder="Password"
                                error={errorPassword || errorWhileRegisterPassword}
                                action={handlePasswordChange}
                                value={password}
                                secureTextEntry={true}
                                passwordValidation={passwordValidation}
                                passwordRules={passwordRules}
                            />
                        </View>


                        {/* Login Button */}
                        <TouchableOpacity className='bg-midnightblue items-center justify-center rounded-2xl w-80 h-14 shadow-md' style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.08,
                            shadowRadius: 6,
                        }}

                            onPress={handleRegister}>
                            <Text className='text-secondary font-sfpro_bold text-xl'>
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                        {/* Divider */}
                        <Text className="text-center text-jetblack my-2 font-sfpro_regular">────────  OR  ────────</Text>
                        {/* Google Login */}
                        <TouchableOpacity
                            className='items-center justify-center rounded-2xl w-80 h-14 bg-secondary border border-jetblack'
                            style={{
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.08,
                                shadowRadius: 6,
                            }}
                            onPress={async () => await promptAsync()}
                        >
                            <FontAwesomeIcon icon={faGoogle} color="#003366" size={20} />
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}