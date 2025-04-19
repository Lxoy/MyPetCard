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

    return (
        <View className="w-full px-6 mb-4">
            {/* Label */}
            <Text className={`text-base mb-1 font-medium ${isFocused ? 'text-primary' : 'text-jetblack'}`}>{label}</Text>

            {/* Input */}
            <TouchableOpacity
                className={`w-full bg-white rounded-xl px-4 py-2 text-base text-gray-900 shadow-sm border ${error
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
            <Modal visible={open} transparent animationType="slide">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-xl p-6">
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode="date"
                        />
                        <Button title="Done" onPress={handleConfirm} />
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