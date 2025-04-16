import { View, Text, Image, TextInput, ImageBackground, TouchableOpacity, StatusBar, TouchableWithoutFeedback, Keyboard, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../context/AuthContext';
import "../../css/global.css";
import CustomAlert from "../../components/CustomAlert"

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

    const isEmailValid = (email) => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    }

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
        setErrorUsername('');
        setErrorEmail('');
        setErrorPassword('');

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
                setAlertMessage(`Welcome "${username}"!`);
                setShowAlert(true);
                setUsername('');
                setEmail('');
                setPassword('');
                setPasswordValidation(null);
            } catch (error) {
                if (error.message.includes('Email')) {
                    setErrorWhileRegisterEmail(error.message);
                } else if (error.message.includes('Username')) {
                    setErrorWhileRegisterUsername(error.message);
                } else if (error.message.includes('Password')) {
                    setErrorWhileRegisterPassword(error.message);
                } else {
                    setAlertMessage('An error occured during registration.');
                    <CustomAlert
                        visible={showAlert}
                        message={alertMessage}
                        onClose={() => setShowAlert(false)}
                    />
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
                <View style={{ flex: 1 }}>
                    <StatusBar barStyle="light-content" backgroundColor='black' />

                    {/* Background */}
                    <ImageBackground
                        source={require('../../img/background3.png')}
                        resizeMode="cover"
                        style={{ position: 'absolute', width: '100%', height: '100%' }}
                    />

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
                        <View className='flex-1 justify-center items-center'>
                            <Image className="size-64" source={require('../../img/logo-transparent.png')} />
                            <Text className="text-primary text-6xl font-poppins_bold text-center py-1 mb-10">Create Account</Text>
                        </View>

                        {/* Form Inputs */}
                        <View className='flex-2 justify-center items-center mb-10'>
                            {/* Username Input */}
                            <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96'>
                                <Icon className='flex-4 p-2' color={'#112D4E'} name="user" size={24} />
                                <TextInput
                                    className='flex-1 color-secondary font-poppins_italic pt-1'
                                    selectionColor={'#112D4E'}
                                    placeholder="Username"
                                    placeholderTextColor={'#3F72AF'}
                                    value={username}
                                    onChangeText={setUsername}
                                />
                            </View>

                            {/* Error handling username */}
                            <View className='flex-row items-start justify-start w-96'>
                                {
                                    errorUsername !== "" ? (
                                        <Text className="text-red-600 text-sm font-poppins_italic">{errorUsername}</Text>
                                    ) : errorWhileRegisterUsername ? (
                                        <Text className="text-red-600 text-sm font-poppins_italic">This username already exists.</Text>
                                    ) : null
                                }
                            </View>

                            {/* Email Input */}
                            <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96 mt-3'>
                                <Icon className='flex-4 p-2' color={'#112D4E'} name="envelope" size={20} />
                                <TextInput
                                    keyboardType="email-address"
                                    className='flex-1 color-secondary font-poppins_italic pt-1'
                                    selectionColor={'#112D4E'}
                                    placeholder="E-mail"
                                    placeholderTextColor={'#3F72AF'}
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            {/* Error handling e-mail */}
                            <View className='flex-row items-start justify-start w-96'>
                                {
                                    errorEmail !== "" ? (
                                        <Text className="text-red-600 text-sm font-poppins_italic">{errorEmail}</Text>
                                    ) : errorWhileRegisterEmail ? (
                                        <Text className="text-red-600 text-sm font-poppins_italic">This email already exists.</Text>
                                    ) : null
                                }
                            </View>

                            {/* Password Input */}
                            <View className='flex-row justify-center items-center bg-accent p-3 rounded-2xl w-96 mt-3'>
                                <Icon className='flex-4 p-2' color={'#112D4E'} name="lock" size={24} />
                                <TextInput
                                    secureTextEntry={true}
                                    className='flex-1 color-secondary font-poppins_italic pt-1'
                                    selectionColor={'#112D4E'}
                                    placeholder="Password"
                                    placeholderTextColor={'#3F72AF'}
                                    value={password}
                                    onChangeText={handlePasswordChange}
                                />
                            </View>
                            {errorPassword ? <Text className="text-red-500 text-sm mt-1 w-80">{errorPassword}</Text> : null}
                            {errorWhileRegisterPassword ? <Text className="text-red-500 text-sm mt-1 w-80">{errorWhileRegisterPassword}</Text> : null}

                            {/* Password Requirements */}
                            {passwordValidation && (
                                <View className="w-80 mt-2">
                                    {Object.entries(passwordValidation.results).map(([ruleName, rule]) => (
                                        <Text
                                            key={ruleName}
                                            className={`text-xs ${rule.valid ? 'text-green-500' : 'text-gray-500'}`}
                                        >
                                            {rule.valid ? '✓' : '•'} {rule.description}
                                        </Text>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Sign Up and Google button */}
                        <View className='flex-2 items-center justify-center'>
                            <TouchableOpacity
                                className='m-3 bg-primary items-center justify-center rounded-3xl w-96 h-14'
                                onPress={handleRegister}
                            >
                                <Text className='text-accent font-poppins_bold text-xl'>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>

                            <Text className="text-primary font-poppins_bold">━━━━━━━━━━━━ OR ━━━━━━━━━━━━</Text>

                            <TouchableOpacity
                                className='bg-white m-3 border-2 items-center justify-center rounded-3xl w-96 h-14'
                                onPress={async () => await promptAsync()}
                            >
                                <Icon name="google" size={24} />
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}