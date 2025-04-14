import React, { useState, useContext } from 'react';
import { Text, View, Image, ImageBackground, TextInput, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../context/AuthContext';
import CustomAlert from "../components/CustomAlert"

// tailwind
import "../css/global.css";

export default function MyProfileScreen() {
    // Data
    const { userData, logout } = useContext(AuthContext);

    // Username & password
    const [username, setUsername] = useState(userData.username);
    const [password, setPassword] = useState('');

    // Password boolean
    const [passwordValidation, setPasswordValidation] = useState();

    // Alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Errors
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    // List of password rules
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

    // Password rule validation
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

    // Function to return list of rules
    const handlePasswordChange = (text) => {
        setPassword(text);
        if (text.length > 0) {
            setErrorPassword('');
            setPasswordValidation(validatePassword(text));
        } else {
            setPasswordValidation(null);
        }
    };

    const handleSaveChanges = () => {

        let valid = true;

        // Username validation
        if (!username) {
            setErrorUsername('Username is required');
            valid = false;
        } else if (username.length < 3) {
            setErrorUsername('Username must be at least 3 characters');
            valid = false;
        }
        // else if{
        // LOGIKA ZA PROVJERU ISTOG USERNAMEA
        // }

        // Password validation
        const validation = validatePassword(password);
        setPasswordValidation(validation);
        if (!validation.isValid) {
            setErrorPassword('Password does not meet requirements');
            valid = false;
        }

        // Validation
        if (valid) {
            setErrorUsername('');
            setErrorPassword('');
            setAlertMessage('Changes saved successfully!');
            setShowAlert(true);
        }
    };

    return (
        <ImageBackground className='flex-1 flex-col' source={require('../img/background3.png')}>
            <StatusBar barStyle="light-content" backgroundColor='black' />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className='flex mt-4 items-center'>
                    {/* Screen title */}
                    <Text className='font-poppins_regular text-[48px] text-secondary'>
                        My Profile
                    </Text>
                    {/* User image */}
                    <Image className='size-48 border-2 rounded-full' source={require('../img/logo.png')} />
                </View>
                <View className='flex m-4 gap-1'>
                    {/* Username form */}
                    <Text className='font-poppins_regular text-xl'>
                        Username
                    </Text>
                    <View className='flex-row justify-center gap-2 items-center bg-accent p-3 rounded-2xl w-full'>
                        <FontAwesomeIcon className='p-2' icon={faUser} size={24} color={'#112D4E'} />
                        <TextInput
                            className='flex-1 color-secondary text-base'
                            selectionColor={'#112D4E'}
                            placeholder="Username"
                            placeholderTextColor={'#3F72AF'}
                            value={username}
                            onChangeText={username_text => setUsername(username_text)}
                        />
                    </View>
                    {/* Username error*/}
                    <View className='flex-row items-start justify-start w-96'>
                        {
                            errorUsername !== "" ? (
                                <Text className="text-red-600 text-sm font-poppins_italic">{errorUsername}</Text>
                            ) : null
                        }
                    </View>
                    {/* Email form*/}
                    <Text className='font-poppins_regular text-xl'>
                        Email
                    </Text>
                    <View className='flex-row justify-center gap-2 items-center bg-accent p-3 rounded-2xl w-full'>
                        <FontAwesomeIcon className='p-2' icon={faEnvelope} size={24} color={'#112D4E'} />
                        <TextInput
                            className='flex-1 color-secondary text-base'
                            selectionColor={'#112D4E'}
                            placeholder="Email"
                            placeholderTextColor={'#3F72AF'}
                            value={userData.email}
                            editable={false}
                        />
                    </View>
                    
                    {/* Password form*/}
                    <Text className='font-poppins_regular text-xl'>
                        New Password
                    </Text>
                    <View className='flex-row justify-center gap-2 items-center bg-accent p-3 rounded-2xl w-full'>
                        <FontAwesomeIcon className='p-2' icon={faLock} size={24} color={'#112D4E'} />
                        <TextInput
                            className='flex-1 color-secondary text-base'
                            selectionColor={'#112D4E'}
                            placeholder="New Password"
                            placeholderTextColor={'#3F72AF'}
                            value={password}
                            onChangeText={handlePasswordChange}
                        />
                    </View>
                    {/* Password error*/}
                    <View className='flex-row items-start justify-start w-96'>
                        {errorPassword ? <Text className="text-red-500 text-sm mt-1 w-80">{errorPassword}</Text> : null}
                    </View>

                    {/* Password requirements error*/}
                    <View className='flex-row items-start justify-start w-96'>
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
                </View>

                <View className='flex items-center justify-center mt-4'>
                    {/* Save button*/}
                    <TouchableOpacity
                        className='bg-primary items-center justify-center rounded-full w-80 h-12'
                        onPress={handleSaveChanges}
                    >
                        <Text className='text-accent font-poppins_bold text-lg'>
                            Save Changes
                        </Text>
                    </TouchableOpacity>

                    {/* Log out button */}
                    <TouchableOpacity className='m-5 items-center justify-center rounded-full w-80 h-12' onPress={() => { logout() }} >
                        <Text className='text-secondary font-poppins_bold text-lg opacity-50'>
                            Log Out
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Pop up message */}
                <CustomAlert
                    visible={showAlert}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />
            </ScrollView>
        </ImageBackground>
    );
}