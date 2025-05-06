import { faAngleUp, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Button } from "react-native";
import DatePicker from 'react-native-date-picker';


export const DatePickerField = ({ label, placeholder, value, helper, action, error }) => {
    const [isFocused, setIsFocused] = useState(false);
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false);

    const handleConfirm = () => {
        action(date);
        setOpen(false);
        setIsFocused(false);
    };

    const handleCancel = () => {
        setOpen(false);
        setIsFocused(false);
    };

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>
                {label}
            </Text>

            {/* Input */}
            <TouchableOpacity
                className={`w-full bg-white rounded-2xl px-4 py-3 text-base text-gray-900 border ${error
                    ? 'border-error'
                    : isFocused
                        ? 'border-primary'
                        : 'border-lightgrey'
                    }`}
                onPress={() => { setOpen(true); setIsFocused(true); }}
            >
                <Text className={`${value ? 'text-gray-900' : 'text-darkgrey'}`}>
                    {value ? value.toLocaleDateString('hr-HR') : placeholder}
                </Text>
            </TouchableOpacity>


            <Modal visible={open} animationType="slide" transparent>
                <View className="flex-1 justify-end bg-black/50">
                    <View className="bg-white rounded-t-2xl px-6 pt-4 pb-6">
                        {/* Top buttons */}
                        <View className="flex-row justify-between mb-4">
                            <TouchableOpacity onPress={handleCancel}>
                                <FontAwesomeIcon icon={faAngleUp} size={20} color="#007AFF" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleConfirm}>
                                <FontAwesomeIcon icon={faCheck} size={20} color="#007AFF" />
                            </TouchableOpacity>
                        </View>

                        {/* Date Picker */}
                        <View className="items-center">
                            <DatePicker
                                date={date}
                                onDateChange={setDate}
                                mode="date"
                                locale="en-GB"
                                fadeToColor="none"
                            />
                        </View>

                    </View>
                </View>
            </Modal>

            {/* Helper + Character Count */}
            <View className="flex-row justify-between mt-1 px-1">
                {!error ? <Text className="text-xs text-darkgrey">{helper}</Text> : <Text className="text-xs text-error">{error}</Text>}
            </View>
        </View>
    );
};