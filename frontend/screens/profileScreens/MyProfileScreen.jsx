import React, { useState, useContext, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGem, faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { faLanguage, faEraser, faArrowRightFromBracket, faAngleRight, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/AuthContext.jsx';
import CustomAlert from "../../components/CustomAlert.jsx";
import { handleCamera, handleGallery, handleRemove } from '../../components/img_menu/OptionsHandling.js';

import { ChooseMenu } from '../../components/img_menu/ChooseMenu.jsx';
import noImgUser from '../../img/no-profile.png';

// tailwind
import "../../css/global.css";

export default function MyProfileScreen({ navigation }) {

    // Data
    const { userData, logout } = useContext(AuthContext);

    // Username & email & password
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email)
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
                                className="size-36 rounded-full shadow-black shadow-md"
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 6,
                                    elevation: 5,
                                }}
                                source={image ? { uri: image } : noImgUser}
                            />
                            <View
                                className="absolute bottom-2 right-2 bg-accent p-2 rounded-full shadow-md"
                            >
                                <FontAwesomeIcon icon={faCamera} size={20} color="#003366" />
                            </View>

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
                        <ProfileButton icon={faLanguage} label="Language" onPress={() => navigation.navigate('LanguageSettings')} />
                        <ProfileButton icon={faGem} label="Subscription" labelClass="text-primary" iconColor="#007AFF" onPress={() => navigation.navigate('Subscription')} />
                    </View>

                    <View className="w-[90%] border-black" style={{ borderWidth: 0.5 }} />

                    {/* Buttons Group 2 */}
                    <View className="my-3">
                        <ProfileButton icon={faArrowRightFromBracket} label="Log Out" onPress={logout} />
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