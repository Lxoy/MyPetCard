import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

// tailwind
import "../css/global.css";

export default function CustomAlert({ visible, message, onClose }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(17, 45, 78, 0.5)' }} />
            <View className="flex-1 justify-center items-center">
                <View className="bg-white w-96 p-6 rounded-2xl shadow-lg items-center">
                    <FontAwesomeIcon className='p-8' icon={faCircleInfo} size={42} color={'#112D4E'} />
                    <Text className="text-lg font-poppins_regular text-center text-secondary my-4">{message}</Text>
                    <TouchableOpacity
                        className="bg-primary w-full items-center px-6 py-3 rounded-xl"
                        onPress={onClose}
                    >
                        <Text className="text-accent font-poppins_bold text-lg">OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
