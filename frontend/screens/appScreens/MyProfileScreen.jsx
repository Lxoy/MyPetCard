import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGem, faPenToSquare, faCamera } from '@fortawesome/free-regular-svg-icons'
import { faLanguage, faEraser, faArrowRightFromBracket, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext';
import CustomAlert from "../../components/CustomAlert";
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import noImgUser from '../../img/no-profile.png';



// tailwind
import "../../css/global.css";

export default function MyProfileScreen({navigation}) {

    // Data
    const { userData, logout } = useContext(AuthContext);   

    // Username & email & password
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail ] = useState(userData.email)
    const [password, setPassword] = useState('');


    // Password boolean
    const [passwordValidation, setPasswordValidation] = useState();

    // Alert
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    // Errors
    const [errorUsername, setErrorUsername] = useState("");
    const [errorPassword, setErrorPassword] = useState("");

    // Image menu
    const [menuVisible, setMenuVisible] = useState(false);
    const [image, setImage] = useState(null);

    

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

    useEffect(() => {
        if (userData) {
          setUsername(userData.username);
          setEmail(userData.email);
        }
      }, [userData]);
      

    return (
        <View className="flex-1 flex-col bg-secondary">
            <StatusBar barStyle="light-content" backgroundColor="black" />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* Title */}
                <View className="mt-4 items-center">
                    <Text className="font-sfpro_regular text-2xl text-text">
                        My Profile
                    </Text>
                </View>

                {/* User info row */}
                <View className="flex-row mt-8 px-4">
                    {/* User image */}
                    <View className="flex-1 items-center">
                        <TouchableOpacity
                            className="bg-accent rounded-full shadow-md"
                            onPress={() => setMenuVisible(true)}
                        >
                            <Image
                                className="size-32 rounded-full"
                                source={image ? { uri: image } : noImgUser }
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 6,
                                    elevation: 5,
                                }}
                            />                            
                        </TouchableOpacity>
                    </View>

                    {/* User info */}
                    <View className="flex-1 justify-center">
                        <Text className="text-xl font-sfpro_regular text-text">
                            {username}
                        </Text>
                        <Text className="text-base font-sfpro_regular text-text mb-1">
                            {email}
                        </Text>
                    </View>
                </View>

                {/* Options Section */}
                <View className="items-center justify-center mt-8">
                   
                    {/* Buttons Group 1 */}
                    <View className="my-3">
                        <ProfileButton icon={faPenToSquare} label="Edit Data" onPress={() => navigation.navigate('AccountSettings')} />
                        <ProfileButton icon={faLanguage} label="Language"  onPress={() => navigation.navigate('LanguageSettings')} />
                        <ProfileButton icon={faGem} label="Subscription" labelClass="text-primary" iconColor="#4A90E2" onPress={() => navigation.navigate('Subscription')} />
                    </View>

                    <View className="w-[90%] border-black" style={{ borderWidth: 0.75 }} />

                    {/* Buttons Group 2 */}
                    <View className="my-3">
                        <ProfileButton icon={faArrowRightFromBracket} label="Log Out" onPress={logout}  />
                        <ProfileButton
                            icon={faEraser}
                            label="Delete Account"
                            onPress={() => navigation.navigate('AccountDeletion')}
                            labelClass="text-error"
                            iconColor="#D0021B"
                        />
                    </View>
                </View>

                {/* Custom Alert */}
                <CustomAlert
                    visible={showAlert}
                    message={alertMessage}
                    onClose={() => setShowAlert(false)}
                />

                <ChooseMenu
                    visible={menuVisible}
                    onClose={() => setMenuVisible(false)}
                    onCamera={() => handleCamera(setImage, setMenuVisible)}
                    onGallery={() => handleGallery(setImage, setMenuVisible)}
                    onRemove={() => handleRemove(setImage, setMenuVisible)} />
                    
            </ScrollView>
        </View>
    );
}

const ProfileButton = ({ icon, label, onPress, labelClass = 'text-text font-poppins_regular', iconColor = '#000000' }) => (
    <TouchableOpacity
        className="flex-row items-center justify-start w-80 h-12"
        onPress={onPress}
    >
        <View style={{ flex: 1 }} className="flex-row gap-4 items-center">
            <FontAwesomeIcon icon={icon} size={20} color={iconColor} />
            <Text className={`${labelClass} text-xl font-sfpro_regular`}>
                {label}
            </Text>
        </View>
        <View style={{ flex: 1 }} className="justify-center items-end">
            <FontAwesomeIcon icon={faAngleRight} size={20} color={iconColor} />
        </View>
    </TouchableOpacity>
);