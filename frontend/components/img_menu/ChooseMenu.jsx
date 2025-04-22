import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCamera, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

// tailwind
import "../../css/global.css";

export function ChooseMenu({ visible, onClose, onCamera, onGallery, onRemove }) {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/40">
                <View className="bg-white w-80 p-6 rounded-2xl shadow-lg items-center">
                    <Text className="text-lg font-sfpro_regular text-center text-text mb-6">
                        Choose an option
                    </Text>

                    {/* Options Row */}
                    <View className="flex-row justify-between w-full mb-3 gap-2 space-x-3">
                        {/* Camera */}
                        <TouchableOpacity
                            className="flex-1 flex-col justify-center items-center bg-primary px-3 py-3 rounded-xl"
                            onPress={onCamera}
                        >
                            <FontAwesomeIcon icon={faCamera} size={24} color="#fff" />
                            <Text className="text-white font-poppins_bold text-sm mt-1">Camera</Text>
                        </TouchableOpacity>

                        {/* Gallery */}
                        <TouchableOpacity
                            className="flex-1 flex-col justify-center items-center bg-midnightblue px-3 py-3 rounded-xl"
                            onPress={onGallery}
                        >
                            <FontAwesomeIcon icon={faImage} size={24} color="#fff" />
                            <Text className="text-white font-poppins_bold text-sm mt-1">Gallery</Text>
                        </TouchableOpacity>

                        {/* Remove */}
                        <TouchableOpacity
                            className="flex-1 flex-col justify-center items-center bg-error px-3 py-3 rounded-xl"
                            onPress={onRemove}
                        >
                            <FontAwesomeIcon icon={faTrash} size={24} color="#fff" />
                            <Text className="text-white font-poppins_bold text-sm mt-1">Remove</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Cancel */}
                    <TouchableOpacity
                        className="mt-2"
                        onPress={onClose}
                    >
                        <Text className="text-sm text-gray-500">Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}
